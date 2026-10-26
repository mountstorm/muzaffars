import { Shell, PageHead } from '@/components/site/ui';
import SplitExplorer from '@/components/research/SplitExplorer';
import { pageMetadata } from '@/lib/metadata';
import { layers, links, evaluate, optimal, formatBytes } from '@/lib/split-inference';

export const metadata = pageMetadata({
  title: 'Where to split a neural network',
  description:
    'An interactive benchmark of all 22 AlexNet split points across WiFi, LTE, and backhaul links — and why the latency minimum moves when the network gets slower.',
  path: '/research/split-inference',
  og: 'split-inference'
});

export default function SplitInferencePage() {
  const rows = links.map((link) => ({ link, best: optimal(evaluate(link)) }));

  return (
    <Shell>
      <PageHead
        index="—"
        label="Research"
        title="Where to split a neural network"
        lede="Running a DNN across a device, an edge server and the cloud means choosing a cut point. The right one moves depending on the link."
      />
      <div className="space-y-12 pb-12">
        <section className="measure space-y-4 text-[var(--muted)]">
          <p className="leading-relaxed">
            Split inference partitions a network so the first layers run where
            the data is and the rest run somewhere with more compute. Every
            candidate cut trades three costs against each other: the device
            time to reach the cut, the time to push the intermediate tensor
            over the wire, and the edge time to finish. Run everything locally
            and you pay all the compute; offload everything and you pay to ship
            the raw input.
          </p>
          <p className="leading-relaxed">
            The interesting part is that the winner is not fixed. AlexNet&apos;s
            activations do not shrink monotonically — they balloon after{' '}
            <code className="mono text-[var(--accent)]">
              conv1
            </code>{' '}
            to {formatBytes(96 * 55 * 55 * 4)}, larger than the input, then
            collapse through the pooling layers. So the cheapest place to cut
            depends on how expensive a byte is, which is to say on the link.
          </p>
        </section>

        <section>
          <SplitExplorer />
        </section>

        <section className="space-y-4">
          <h2 className="display text-[2rem]">What the shape shows</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--rule)] text-[var(--faint)]">
                  <th className="py-2 pr-4 font-medium">Link</th>
                  <th className="py-2 pr-4 font-medium">Best cut</th>
                  <th className="py-2 pr-4 font-medium">Over the wire</th>
                  <th className="py-2 font-medium">Latency</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ link, best }) => (
                  <tr key={link.id} className="border-b border-[var(--rule)]">
                    <td className="py-2 pr-4">
                      {link.label}
                      <span className="block text-[11px] text-[var(--faint)]">
                        {link.note}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {best.k === 0 ? 'all on edge' : `after ${best.afterLayer}`}
                    </td>
                    <td className="py-2 pr-4 tabular-nums">
                      {formatBytes(best.transferBytes)}
                    </td>
                    <td className="py-2 tabular-nums">
                      {best.totalMs.toFixed(0)} ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="measure leading-relaxed text-[var(--muted)]">
            On a fast link the answer is boring: ship the input and let the
            edge do everything. The cost of {formatBytes(3 * 227 * 227 * 4)} is
            trivial next to the compute you avoid. Drop to LTE and that stops
            being true — the uplink is slow enough and the round trip long
            enough that it pays to spend device cycles getting past the early
            layers, because the tensor shrinks faster than the compute cost
            grows. The minimum lands just after the first pooling layer, where
            the activation has come down by roughly 4x and most of the
            network&apos;s work is still ahead of you.
          </p>
          <p className="measure leading-relaxed text-[var(--muted)]">
            Make the device slower and the optimum slides back toward the edge;
            make it faster and it slides forward. That is the whole argument
            for choosing the split at runtime rather than baking it in.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="display text-[2rem]">How this was measured</h2>
          <p className="measure leading-relaxed text-[var(--muted)]">
            The pipeline partitions execution in PyTorch and runs the two
            halves on separate machines over TCP. Output is verified within
            1e-4 of the same input run end-to-end on one machine, so the splits
            are numerically faithful rather than approximate. Each of the{' '}
            {layers.length} cut points is profiled per tier, and the link
            profiles above are applied to the measured intermediate tensor
            sizes.
          </p>
          <p className="measure border-l-2 border-[var(--accent)] bg-[var(--surface-2)] px-5 py-4 text-[0.95rem] leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold">Note on the numbers.</strong> The
            layer shapes and tensor sizes here are exact for AlexNet at
            3×227×227. The per-layer execution times are currently modelled
            from each layer&apos;s MAC count rather than measured, so treat the
            absolute milliseconds as illustrative — the shape of the curve and
            the position of the minimum are what the chart is for.
          </p>
        </section>
      </div>
    </Shell>
  );
}
