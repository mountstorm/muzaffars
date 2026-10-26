import { worldCup } from '@/lib/worldcup';

const A = worldCup.match.home;
const B = worldCup.match.away;
export const TEAM_COLOR: Record<string, string> = {
  [A]: 'var(--accent)',
  [B]: '#e34948'
};

export function Bar({
  label,
  value,
  color = 'var(--accent)',
  max = 1
}: {
  label: string;
  value: number;
  color?: string;
  max?: number;
}) {
  const pct = (value / max) * 100;
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1">
      <span className="text-[0.95rem] text-[var(--muted)]">{label}</span>
      <span className="mono text-[0.88rem] tabular-nums text-[var(--ink)]">
        {(value * 100).toFixed(1)}%
      </span>
      <span
        aria-hidden="true"
        className="col-span-2 h-[3px] w-full bg-[var(--rule)]"
      >
        <span
          className="block h-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </span>
    </li>
  );
}

/** Win / draw / win as a single stacked rail. */
export function OutcomeRail() {
  const n = worldCup.ninety;
  const parts = [
    { k: `${A} win`, v: n.home_win, c: TEAM_COLOR[A] },
    { k: 'Draw', v: n.draw, c: 'var(--faint)' },
    { k: `${B} win`, v: n.away_win, c: TEAM_COLOR[B] }
  ];
  return (
    <div>
      <div
        role="img"
        aria-label={`At 90 minutes: ${A} win ${(n.home_win * 100).toFixed(1)}%, draw ${(n.draw * 100).toFixed(1)}%, ${B} win ${(n.away_win * 100).toFixed(1)}%`}
        className="flex h-8 w-full overflow-hidden"
      >
        {parts.map((p) => (
          <div
            key={p.k}
            style={{ width: `${p.v * 100}%`, background: p.c }}
            className="h-full"
          />
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-4">
        {parts.map((p) => (
          <div key={p.k}>
            <dt className="label flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2"
                style={{ background: p.c }}
              />
              {p.k}
            </dt>
            <dd className="mono mt-1 text-[1.05rem] tabular-nums">
              {(p.v * 100).toFixed(1)}%
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Joint scoreline probabilities as a matrix. */
export function ScoreHeatmap() {
  const { matrix, max_goals } = worldCup.heatmap;
  const peak = Math.max(...matrix.flat());
  const cell = 46;
  const pad = 34;
  const size = pad + (max_goals + 1) * cell;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${size + 6} ${size + 6}`}
        className="w-full min-w-[380px] max-w-[460px]"
        role="img"
        aria-label={`Joint scoreline probabilities. The most likely scoreline is ${worldCup.scores.at_90[0][0]} at ${((worldCup.scores.at_90[0][1] as number) * 100).toFixed(1)} percent.`}
      >
        <text x={0} y={12} className="fill-[var(--faint)]" fontSize={11}>
          {A} ↓ / {B} →
        </text>
        {matrix.map((row, i) =>
          row.map((p, j) => {
            const t = p / peak;
            return (
              <g key={`${i}-${j}`}>
                <rect
                  x={pad + j * cell}
                  y={pad + i * cell}
                  width={cell - 2}
                  height={cell - 2}
                  fill="var(--accent)"
                  fillOpacity={0.08 + t * 0.82}
                />
                <text
                  x={pad + j * cell + (cell - 2) / 2}
                  y={pad + i * cell + (cell - 2) / 2 + 4}
                  textAnchor="middle"
                  fontSize={10.5}
                  className="mono"
                  fill={t > 0.55 ? 'var(--bg)' : 'var(--muted)'}
                >
                  {(p * 100).toFixed(1)}
                </text>
              </g>
            );
          })
        )}
        {Array.from({ length: max_goals + 1 }, (_, i) => (
          <g key={i}>
            <text
              x={pad - 10}
              y={pad + i * cell + (cell - 2) / 2 + 4}
              textAnchor="end"
              fontSize={11}
              className="mono fill-[var(--faint)]"
            >
              {i}
            </text>
            <text
              x={pad + i * cell + (cell - 2) / 2}
              y={pad - 8}
              textAnchor="middle"
              fontSize={11}
              className="mono fill-[var(--faint)]"
            >
              {i}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Elo for both finalists, year by year. */
export function EloHistory() {
  const series = worldCup.elo_history as Record<string, readonly (readonly [number, number])[]>;
  const teams = Object.keys(series);
  const pts = teams.flatMap((t) => series[t]);
  const years = pts.map((p) => p[0]);
  const vals = pts.map((p) => p[1]);
  const minY = Math.min(...years);
  const maxY = Math.max(...years);
  const minV = Math.floor(Math.min(...vals) / 50) * 50;
  const maxV = Math.ceil(Math.max(...vals) / 50) * 50;

  const W = 720;
  const H = 300;
  const P = { t: 16, r: 16, b: 34, l: 46 };
  const x = (y: number) => P.l + ((y - minY) / (maxY - minY)) * (W - P.l - P.r);
  const y = (v: number) =>
    P.t + (1 - (v - minV) / (maxV - minV)) * (H - P.t - P.b);

  const ticks = [minV, (minV + maxV) / 2, maxV];
  const yearTicks = [minY, Math.round((minY + maxY) / 2), maxY];

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[560px]"
        role="img"
        aria-label={`Elo ratings from ${minY} to ${maxY}. ${teams.map((t) => `${t} ends at ${worldCup.elo[t as keyof typeof worldCup.elo]}`).join('; ')}.`}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={P.l}
              x2={W - P.r}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--rule)"
            />
            <text
              x={P.l - 8}
              y={y(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              className="mono fill-[var(--faint)]"
            >
              {Math.round(t)}
            </text>
          </g>
        ))}
        {yearTicks.map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - 12}
            textAnchor="middle"
            fontSize={11}
            className="mono fill-[var(--faint)]"
          >
            {t}
          </text>
        ))}
        {teams.map((t, i) => (
          <path
            key={t}
            d={series[t]
              .map((p, k) => `${k === 0 ? 'M' : 'L'}${x(p[0])},${y(p[1])}`)
              .join(' ')}
            fill="none"
            stroke={TEAM_COLOR[t]}
            strokeWidth={2}
            strokeDasharray={i === 1 ? '6 4' : undefined}
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <ul className="mt-3 flex flex-wrap gap-6">
        {teams.map((t, i) => (
          <li key={t} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-[2px] w-5"
              style={{
                background: TEAM_COLOR[t],
                opacity: i === 1 ? 0.9 : 1
              }}
            />
            <span className="mono text-[0.85rem] text-[var(--muted)]">
              {t} · {worldCup.elo[t as keyof typeof worldCup.elo]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
