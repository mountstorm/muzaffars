import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import { Shell, TextLink, Tags, Status } from '@/components/site/ui';
import { pageMetadata } from '@/lib/metadata';
import { worldCup, monteCarloSE, TROPHY_IS_TIED } from '@/lib/worldcup';
import {
  Bar,
  OutcomeRail,
  ScoreHeatmap,
  EloHistory,
  TEAM_COLOR
} from '@/components/worldcup/charts';

const A = worldCup.match.home;
const B = worldCup.match.away;
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

export const metadata = pageMetadata({
  title: 'World Cup Final Predictor',
  description: `An Elo and Poisson model over ${worldCup.dataset.matches.toLocaleString()} international matches, resolved across ${worldCup.dataset.runs.toLocaleString()} Monte Carlo finals. ${A} vs ${B} comes out a dead heat.`,
  path: '/projects/worldcup',
  og: 'projects'
});

function Block({
  label,
  children,
  note
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <section className="glass glass-panel my-5 grid gap-5 p-6 lg:grid-cols-[14rem_1fr] lg:gap-12 lg:p-9">
      <div>
        <h2 className="label">{label}</h2>
        {note && (
          <p className="mt-3 max-w-[22rem] text-[0.9rem] leading-relaxed text-[var(--faint)]">
            {note}
          </p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function WorldCupDashboard() {
  const se = monteCarloSE(0.5, worldCup.dataset.runs);
  const margin = 1.96 * se;

  return (
    <Shell>
      <article className="pb-8">
        <div className="pt-10 lg:pt-16">
          <TextLink href="/projects">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft size={14} aria-hidden="true" />
              All work
            </span>
          </TextLink>
        </div>

        <header className="pb-12 pt-6">
          <div className="flex flex-wrap items-center gap-5">
            <p className="label">Dashboard</p>
            <Status status="Live" />
          </div>
          <h1 className="display wipe mt-5 text-[clamp(2.4rem,7vw,4.5rem)]">
            {A} vs {B}
          </h1>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-[var(--muted)] sm:text-[1.2rem]">
            A projected 2026 World Cup final, modelled from{' '}
            {worldCup.dataset.matches.toLocaleString()} international matches
            since {worldCup.dataset.min_year} and resolved over{' '}
            {worldCup.dataset.runs.toLocaleString()} simulated finals.
          </p>
          <div className="mt-7">
            <Tags
              tags={['Python', 'pandas', 'NumPy', 'SciPy', 'Monte Carlo', 'Elo']}
            />
          </div>
        </header>

        {/* The headline, stated honestly. */}
        <Reveal>
          <section className="glass glass-panel my-5 p-6 lg:p-9">
            <p className="label">The result</p>
            <p className="display mt-4 text-[clamp(1.9rem,5vw,3.25rem)]">
              {TROPHY_IS_TIED
                ? 'Too close to call.'
                : `${worldCup.simulation.home_lift > worldCup.simulation.away_lift ? A : B} are favoured.`}
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [`${A} lift it`, pct(worldCup.simulation.home_lift), TEAM_COLOR[A]],
                [`${B} lift it`, pct(worldCup.simulation.away_lift), TEAM_COLOR[B]],
                ['Goes to extra time', pct(worldCup.simulation.extra_time), 'var(--faint)'],
                ['Goes to penalties', pct(worldCup.simulation.went_to_pens), 'var(--faint)']
              ].map(([k, v, c]) => (
                <div key={k} className="rounded-[var(--r-media)] border-t-2 bg-[var(--glass-bg)] p-4" style={{ borderColor: c }}>
                  <p className="label">{k}</p>
                  <p className="display mt-2 text-[2.25rem]">{v}</p>
                </div>
              ))}
            </div>
            <p className="measure mt-8 rounded-[var(--r-media)] border-l-2 border-[var(--accent)] bg-[var(--glass-bg)] py-4 pl-5 pr-5 text-[0.95rem] leading-relaxed text-[var(--muted)]">
              At {worldCup.dataset.runs.toLocaleString()} runs the Monte Carlo
              standard error near 50% is {(se * 100).toFixed(2)} percentage
              points, so the 95% interval spans roughly ±
              {(margin * 100).toFixed(1)}pp. The{' '}
              {pct(worldCup.simulation.home_lift)} /{' '}
              {pct(worldCup.simulation.away_lift)} split is well inside that
              band — the model is saying this is a coin flip, not that{' '}
              {A} are ahead.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <Block
            label="Rating"
            note="Elo built from every match since 1990, K-weighted by tournament, with World Cup games counted 1.5x."
          >
            <div className="mb-8 grid grid-cols-2 gap-8">
              {[A, B].map((t) => (
                <div key={t}>
                  <p className="label">{t}</p>
                  <p className="display mt-2 text-[2.25rem]">
                    {worldCup.elo[t as keyof typeof worldCup.elo]}
                  </p>
                  <p className="mono mt-1 text-[0.85rem] text-[var(--faint)]">
                    xG {worldCup.expected_goals[t as keyof typeof worldCup.expected_goals]}
                  </p>
                </div>
              ))}
            </div>
            <EloHistory />
            <p className="measure mt-5 text-[0.92rem] leading-relaxed text-[var(--faint)]">
              The two ratings finish{' '}
              {Math.abs(worldCup.elo[A as keyof typeof worldCup.elo] - worldCup.elo[B as keyof typeof worldCup.elo]).toFixed(1)}{' '}
              points apart, which is why the expected goals come out level and
              the final resolves on variance rather than quality.
            </p>
          </Block>
        </Reveal>

        <Reveal>
          <Block
            label="At 90 minutes"
            note="Before extra time. Draws here are what feed the extra-time and penalty paths."
          >
            <OutcomeRail />
          </Block>
        </Reveal>

        <Reveal>
          <Block
            label="Scorelines"
            note="Joint probability of each exact scoreline in normal time, from the Poisson goal model."
          >
            <ScoreHeatmap />
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label">Most likely at 90</p>
                <ul className="mt-4 space-y-3">
                  {worldCup.scores.at_90.map(([s, p]) => (
                    <Bar
                      key={s}
                      label={s}
                      value={p as number}
                      max={worldCup.scores.at_90[0][1] as number}
                    />
                  ))}
                </ul>
              </div>
              <div>
                <p className="label">After extra time, if level at 90</p>
                <ul className="mt-4 space-y-3">
                  {worldCup.scores.after_et.map(([s, p]) => (
                    <Bar
                      key={s}
                      label={s}
                      value={p as number}
                      max={worldCup.scores.after_et[0][1] as number}
                      color="var(--faint)"
                    />
                  ))}
                </ul>
              </div>
            </div>
          </Block>
        </Reveal>

        <Reveal>
          <Block label="Match markets" note="Derived from the same scoreline matrix.">
            <ul className="space-y-4">
              {Object.entries(worldCup.markets).map(([k, v]) => (
                <Bar
                  key={k}
                  label={k}
                  value={v as number}
                  color={
                    k.startsWith(A)
                      ? TEAM_COLOR[A]
                      : k.startsWith(B)
                        ? TEAM_COLOR[B]
                        : 'var(--accent)'
                  }
                />
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal>
          <Block
            label="Cards and penalties"
            note="Base rates from World Cup matches 2014–2022, not from the Elo model."
          >
            <ul className="space-y-4">
              {Object.entries(worldCup.match_events).map(([k, v]) => (
                <Bar key={k} label={k} value={v as number} color="var(--leaf)" />
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal>
          <Block
            label="Players"
            note="Per-match international career averages through 2025, chained with the chance each player starts."
          >
            <ul className="space-y-4">
              {Object.entries(worldCup.player_events).map(([k, v]) => (
                <Bar
                  key={k}
                  label={k}
                  value={v as number}
                  color={k.includes(`(${A})`) ? TEAM_COLOR[A] : TEAM_COLOR[B]}
                />
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal>
          <Block label="Method">
            <div className="measure space-y-4 leading-relaxed text-[var(--muted)]">
              <p>
                Elo ratings are computed over every international match since{' '}
                {worldCup.dataset.min_year} with K={worldCup.config.k_factor},
                a {worldCup.config.home_advantage}-point home advantage, and
                World Cup fixtures weighted 1.5×. A Poisson goal model is fitted
                on the rating gap, with older matches down-weighted on a{' '}
                {worldCup.config.decay_half_life_years}-year half-life.
              </p>
              <p>
                The fitted rates give a joint scoreline matrix, which produces
                the 90-minute outcome and market probabilities directly. For the
                trophy, {worldCup.dataset.runs.toLocaleString()} finals are
                sampled: level matches go to extra time at{' '}
                {worldCup.config.extra_time_fraction} of a full match&apos;s goal
                rate, and still-level matches go to penalties on a deliberately
                flattened Elo scale of {worldCup.config.shootout_scale} — pens
                are mostly luck.
              </p>
              <p>
                Seeded at {worldCup.dataset.seed}, so the numbers on this page
                reproduce exactly from the repository.
              </p>
            </div>

            <h3 className="label mt-10">Limitations</h3>
            <ul className="measure mt-4 space-y-3">
              {[
                'The final is a projection — Argentina and Spain reaching it is an assumption, not a result of this model.',
                'Elo knows results, not squads: injuries, form and selection are not modelled.',
                'Player and card probabilities come from published base rates, not from the simulation.',
                `Monte Carlo noise at ${worldCup.dataset.runs.toLocaleString()} runs is about ±${(margin * 100).toFixed(1)}pp near 50%, which exceeds the gap between the two teams.`
              ].map((l) => (
                <li
                  key={l}
                  className="flex gap-3 leading-relaxed text-[var(--faint)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                  />
                  <span>{l}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <TextLink href="https://github.com/mountstorm/worldcup-predictor" external>
                Model source on GitHub
              </TextLink>
            </div>
          </Block>
        </Reveal>
      </article>
    </Shell>
  );
}
