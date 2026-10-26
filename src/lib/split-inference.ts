/**
 * Data for the split-inference explorer at /research/split-inference.
 *
 * THE LAYER TABLE IS REAL. The shapes below are AlexNet's actual output
 * tensors for a 3x227x227 input, so `outputBytes` is exact.
 *
 * THE TIMINGS ARE PLACEHOLDER. `deviceMs` and `edgeMs` are modelled from each
 * layer's MAC count, not measured. Replace them with your profiler's numbers —
 * see MEASUREMENT.md. Nothing else needs to change: the chart, the optimal
 * split search and the copy all read from this file.
 */

export type Layer = {
  /** 1-based position in the network. */
  index: number;
  name: string;
  kind: 'conv' | 'relu' | 'pool' | 'norm' | 'fc' | 'dropout';
  /** Output tensor shape, excluding batch. */
  shape: number[];
  /** Multiply-accumulate operations, in millions. 0 for elementwise layers. */
  mmacs: number;
  /** Measured execution time on the device tier, in milliseconds. */
  deviceMs: number;
  /** Measured execution time on the edge tier, in milliseconds. */
  edgeMs: number;
};

const BYTES_PER_ELEMENT = 4; // float32

/** Elements in a tensor of this shape. */
const elements = (shape: number[]) => shape.reduce((a, b) => a * b, 1);

/** Bytes that cross the wire if the network is cut after this layer. */
export const outputBytes = (layer: Layer) =>
  elements(layer.shape) * BYTES_PER_ELEMENT;

// AlexNet, 3x227x227 input. Shapes are exact; mmacs are the standard counts.
const spec: Omit<Layer, 'index' | 'deviceMs' | 'edgeMs'>[] = [
  { name: 'conv1', kind: 'conv', shape: [96, 55, 55], mmacs: 105.4 },
  { name: 'relu1', kind: 'relu', shape: [96, 55, 55], mmacs: 0 },
  { name: 'pool1', kind: 'pool', shape: [96, 27, 27], mmacs: 0 },
  { name: 'norm1', kind: 'norm', shape: [96, 27, 27], mmacs: 0 },
  { name: 'conv2', kind: 'conv', shape: [256, 27, 27], mmacs: 223.9 },
  { name: 'relu2', kind: 'relu', shape: [256, 27, 27], mmacs: 0 },
  { name: 'pool2', kind: 'pool', shape: [256, 13, 13], mmacs: 0 },
  { name: 'norm2', kind: 'norm', shape: [256, 13, 13], mmacs: 0 },
  { name: 'conv3', kind: 'conv', shape: [384, 13, 13], mmacs: 149.5 },
  { name: 'relu3', kind: 'relu', shape: [384, 13, 13], mmacs: 0 },
  { name: 'conv4', kind: 'conv', shape: [384, 13, 13], mmacs: 112.1 },
  { name: 'relu4', kind: 'relu', shape: [384, 13, 13], mmacs: 0 },
  { name: 'conv5', kind: 'conv', shape: [256, 13, 13], mmacs: 74.8 },
  { name: 'relu5', kind: 'relu', shape: [256, 13, 13], mmacs: 0 },
  { name: 'pool5', kind: 'pool', shape: [256, 6, 6], mmacs: 0 },
  { name: 'fc6', kind: 'fc', shape: [4096], mmacs: 37.7 },
  { name: 'relu6', kind: 'relu', shape: [4096], mmacs: 0 },
  { name: 'drop6', kind: 'dropout', shape: [4096], mmacs: 0 },
  { name: 'fc7', kind: 'fc', shape: [4096], mmacs: 16.8 },
  { name: 'relu7', kind: 'relu', shape: [4096], mmacs: 0 },
  { name: 'drop7', kind: 'dropout', shape: [4096], mmacs: 0 },
  { name: 'fc8', kind: 'fc', shape: [1000], mmacs: 4.1 }
];

// PLACEHOLDER MODEL — delete once real measurements land.
// A mobile CPU sustains roughly 0.35 GMAC/s on these kernels; the edge box is
// about 11x faster. Elementwise layers get a small fixed cost.
const DEVICE_MS_PER_MMAC = 1 / 0.35;
const EDGE_SPEEDUP = 11;
const ELEMENTWISE_DEVICE_MS = 0.6;

export const layers: Layer[] = spec.map((l, i) => {
  const deviceMs =
    l.mmacs > 0
      ? +(l.mmacs * DEVICE_MS_PER_MMAC).toFixed(2)
      : ELEMENTWISE_DEVICE_MS;
  return {
    ...l,
    index: i + 1,
    deviceMs,
    edgeMs: +(deviceMs / EDGE_SPEEDUP).toFixed(2)
  };
});

/** Bytes of the raw input, i.e. the cost of splitting before layer 1. */
export const INPUT_BYTES = 3 * 227 * 227 * BYTES_PER_ELEMENT;

export type LinkProfile = {
  id: string;
  label: string;
  /** Uplink throughput in megabits per second. */
  mbps: number;
  /** Round-trip time in milliseconds. */
  rttMs: number;
  note: string;
};

export const links: LinkProfile[] = [
  {
    id: 'wifi',
    label: 'WiFi',
    mbps: 18.9,
    rttMs: 15,
    note: 'Campus access point, uncontended'
  },
  {
    id: 'lte',
    label: 'LTE',
    mbps: 5.9,
    rttMs: 76,
    note: 'Commercial carrier, median signal'
  },
  {
    id: 'backhaul',
    label: 'Backhaul',
    mbps: 100,
    rttMs: 5,
    note: 'Wired edge-to-cloud segment'
  }
];

export type SplitResult = {
  /** Layers 1..k run on the device. 0 means the whole network runs on the edge. */
  k: number;
  /** Label for the cut: the layer it follows. */
  afterLayer: string;
  deviceMs: number;
  transferMs: number;
  edgeMs: number;
  totalMs: number;
  transferBytes: number;
};

/**
 * Latency of every candidate split for one link, given a device that is
 * `deviceScale` times slower than the profiled one (1 = as profiled).
 */
export function evaluate(link: LinkProfile, deviceScale = 1): SplitResult[] {
  const bytesPerMs = (link.mbps * 1_000_000) / 8 / 1000;

  return layers.reduce<SplitResult[]>(
    (acc, layer) => {
      const prev = acc[acc.length - 1];
      const deviceMs = prev.deviceMs + layer.deviceMs * deviceScale;
      const edgeMs = prev.edgeMs - layer.edgeMs;
      const transferBytes = outputBytes(layer);
      acc.push({
        k: layer.index,
        afterLayer: layer.name,
        deviceMs: +deviceMs.toFixed(2),
        edgeMs: +Math.max(0, edgeMs).toFixed(2),
        transferBytes,
        transferMs: +(link.rttMs + transferBytes / bytesPerMs).toFixed(2),
        totalMs: 0
      });
      return acc;
    },
    [
      {
        k: 0,
        afterLayer: 'input',
        deviceMs: 0,
        edgeMs: +layers.reduce((s, l) => s + l.edgeMs, 0).toFixed(2),
        transferBytes: INPUT_BYTES,
        transferMs: +(link.rttMs + INPUT_BYTES / bytesPerMs).toFixed(2),
        totalMs: 0
      }
    ]
  ).map((r) => ({
    ...r,
    // The last split runs everything on device, so nothing crosses the wire.
    transferMs: r.k === layers.length ? 0 : r.transferMs,
    transferBytes: r.k === layers.length ? 0 : r.transferBytes,
    totalMs: +(
      r.deviceMs +
      (r.k === layers.length ? 0 : r.transferMs) +
      r.edgeMs
    ).toFixed(2)
  }));
}

/** The split with the lowest end-to-end latency. */
export function optimal(results: SplitResult[]): SplitResult {
  return results.reduce((best, r) => (r.totalMs < best.totalMs ? r : best));
}

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};
