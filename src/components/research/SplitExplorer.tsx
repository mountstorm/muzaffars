'use client';

import { useMemo, useState } from 'react';
import {
  links,
  layers,
  evaluate,
  optimal,
  formatBytes,
  type SplitResult
} from '@/lib/split-inference';

const SERIES = ['var(--accent)', '#eb6834', 'var(--leaf)'];
const DASH = ['', '7 4', '2 4'];

const W = 760;
const H = 360;
const PAD = { top: 20, right: 20, bottom: 48, left: 60 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const SPEEDS = [
  { value: 0.5, label: '2x faster' },
  { value: 1, label: 'As profiled' },
  { value: 2, label: '2x slower' },
  { value: 4, label: '4x slower' }
];

export default function SplitExplorer() {
  const [linkId, setLinkId] = useState(links[1].id); // LTE: the interesting one
  const [deviceScale, setDeviceScale] = useState(1);
  const [hoverK, setHoverK] = useState<number | null>(null);

  const series = useMemo(
    () => links.map((link) => ({ link, results: evaluate(link, deviceScale) })),
    [deviceScale]
  );

  const active = series.find((s) => s.link.id === linkId)!;
  const best = optimal(active.results);
  const shown = hoverK !== null ? active.results[hoverK] : best;

  const maxMs = Math.max(
    ...series.flatMap((s) => s.results.map((r) => r.totalMs))
  );
  const x = (k: number) => PAD.left + (k / layers.length) * PLOT_W;
  const y = (ms: number) => PAD.top + PLOT_H - (ms / maxMs) * PLOT_H;

  const ticks = Array.from({ length: 5 }, (_, i) => (maxMs / 4) * i);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--faint)]">
            Link
          </legend>
          <div className="flex flex-wrap gap-2">
            {links.map((link, i) => (
              <button
                key={link.id}
                onClick={() => setLinkId(link.id)}
                aria-pressed={link.id === linkId}
                className={` border px-4 py-2 text-sm transition-colors ${
                  link.id === linkId
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'border-[var(--rule-strong)] text-[var(--muted)] hover:border-[var(--accent)]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-2.5 w-2.5 rounded-sm align-middle"
                  style={{ background: SERIES[i] }}
                />
                {link.label}
                <span className="ml-2 text-xs opacity-60">
                  {link.mbps} Mbps · {link.rttMs} ms
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--faint)]">
            Device compute
          </legend>
          <div className="flex flex-wrap gap-2">
            {SPEEDS.map((s) => (
              <button
                key={s.value}
                onClick={() => setDeviceScale(s.value)}
                aria-pressed={s.value === deviceScale}
                className={` border px-4 py-2 text-sm transition-colors ${
                  s.value === deviceScale
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'border-[var(--rule-strong)] text-[var(--muted)] hover:border-[var(--accent)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <figure className="m-0">
        {/* Below ~640px the chart would scale its 10px labels down to about
            4px, so the plot keeps its width and the reader pans instead. */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[640px]"
            role="img"
            aria-label={`End-to-end latency for each of the ${layers.length} AlexNet split points, on WiFi, LTE and backhaul links. On ${active.link.label} the lowest latency is ${best.totalMs} milliseconds, splitting after ${best.afterLayer}.`}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="var(--rule)"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 10}
                  y={y(t)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-[var(--muted)]"
                  fontSize={11}
                >
                  {Math.round(t)}
                </text>
              </g>
            ))}
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={PAD.top + PLOT_H}
              y2={PAD.top + PLOT_H}
              stroke="var(--rule-strong)"
              strokeWidth={1}
            />
            <text
              x={16}
              y={PAD.top + PLOT_H / 2}
              fontSize={11}
              textAnchor="middle"
              className="fill-[var(--muted)]"
              transform={`rotate(-90 16 ${PAD.top + PLOT_H / 2})`}
            >
              End-to-end latency (ms)
            </text>

            {layers.map((l) =>
              l.index % 2 === 0 ? (
                <text
                  key={l.name}
                  x={x(l.index)}
                  y={H - PAD.bottom + 16}
                  fontSize={10}
                  textAnchor="end"
                  className="fill-[var(--muted)]"
                  transform={`rotate(-45 ${x(l.index)} ${H - PAD.bottom + 16})`}
                >
                  {l.name}
                </text>
              ) : null
            )}

            {series.map((s, i) => {
              const isActive = s.link.id === linkId;
              const d = s.results
                .map(
                  (r, j) => `${j === 0 ? 'M' : 'L'}${x(r.k)},${y(r.totalMs)}`
                )
                .join(' ');
              return (
                <path
                  key={s.link.id}
                  d={d}
                  fill="none"
                  stroke={SERIES[i]}
                  strokeDasharray={DASH[i]}
                  strokeWidth={isActive ? 2.5 : 1.25}
                  strokeOpacity={isActive ? 1 : 0.35}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              );
            })}

            <line
              x1={x(shown.k)}
              x2={x(shown.k)}
              y1={PAD.top}
              y2={PAD.top + PLOT_H}
              stroke="var(--rule-strong)"
              strokeWidth={1}
            />
            <circle
              cx={x(shown.k)}
              cy={y(shown.totalMs)}
              r={6}
              fill={SERIES[links.findIndex((l) => l.id === linkId)]}
              stroke="var(--background)"
              strokeWidth={2}
            />

            {hoverK === null && (
              <text
                x={x(best.k)}
                y={y(best.totalMs) - 18}
                fontSize={11}
                textAnchor={best.k < 3 ? 'start' : 'middle'}
                className="fill-[var(--ink)] font-medium"
              >
                optimum
              </text>
            )}

            {active.results.map((r) => (
              <rect
                key={r.k}
                x={x(r.k) - PLOT_W / layers.length / 2}
                y={PAD.top}
                width={PLOT_W / layers.length}
                height={PLOT_H}
                fill="transparent"
                onMouseEnter={() => setHoverK(r.k)}
                onMouseLeave={() => setHoverK(null)}
              />
            ))}
          </svg>
        </div>
        <figcaption className="mt-2 text-center text-xs text-[var(--faint)]">
          Split point — layers to the left run on the device, the rest on the
          edge
        </figcaption>
      </figure>

      <Breakdown split={shown} linkLabel={active.link.label} best={best} />
    </div>
  );
}

function Breakdown({
  split,
  linkLabel,
  best
}: {
  split: SplitResult;
  linkLabel: string;
  best: SplitResult;
}) {
  const parts = [
    { label: 'Device', ms: split.deviceMs, color: SERIES[0] },
    { label: 'Transfer', ms: split.transferMs, color: SERIES[1] },
    { label: 'Edge', ms: split.edgeMs, color: SERIES[2] }
  ];
  const total = split.totalMs || 1;

  return (
    <div className="border border-border bg-card p-6 text-card-foreground">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">
          {split.k === 0
            ? 'Whole network on the edge'
            : split.k === layers.length
            ? 'Whole network on the device'
            : `Split after ${split.afterLayer}`}
        </h3>
        <p className="text-sm text-[var(--muted)]">
          {linkLabel} · {formatBytes(split.transferBytes)} over the wire
          {split.k === best.k ? ' · optimal' : ''}
        </p>
      </div>

      <p className="mt-1 text-3xl font-semibold tabular-nums">
        {split.totalMs.toFixed(0)}
        <span className="ml-1 text-base font-normal text-[var(--muted)]">
          ms
        </span>
      </p>

      <div className="mt-4 flex h-3 w-full overflow-hidden ">
        {parts.map((p) => (
          <div
            key={p.label}
            style={{
              width: `${(p.ms / total) * 100}%`,
              background: p.color,
              marginRight: '2px'
            }}
          />
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
        {parts.map((p) => (
          <div key={p.label}>
            <dt className="flex items-center gap-2 text-[var(--muted)]">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: p.color }}
              />
              {p.label}
            </dt>
            <dd className="mt-0.5 tabular-nums">{p.ms.toFixed(0)} ms</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
