/**
 * Case-study content for /projects/<slug>.
 *
 * Every claim here is sourced from the project's own README, the resume data
 * in `resume.ts`, or copy already on the site. Sections that would require
 * knowledge only Muzaffar has — specific tradeoffs considered and rejected,
 * measured outcomes beyond what is published — are marked `missing` and are
 * NOT rendered, rather than filled with invented prose. See CASE-STUDIES.md.
 */

export type Section = { heading: string; body: string[] };

export type CaseStudy = {
  slug: string;
  /** Matches a Project.id in projects.ts. */
  projectId: string;
  title: string;
  /** Used for <title> and the social card. */
  metaTitle: string;
  metaDescription: string;
  /** One line under the H1. */
  standfirst: string;
  overview: Section;
  problem: Section;
  contribution: Section;
  architecture: { heading: string; steps: { label: string; detail: string }[] };
  decisions: { heading: string; items: { choice: string; why: string }[] };
  results: { heading: string; outcomes: string[]; limitations: string[] };
  /** Section headings still awaiting Muzaffar's input. Not rendered. */
  missing: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'whosponsors',
    projectId: 'whosponsors',
    title: 'WhoSponsors',
    metaTitle: 'WhoSponsors — Data Engineering Case Study',
    metaDescription:
      'Building an honest H-1B sponsorship database from 831k USCIS filings, including entity resolution across 324k employer name variants and a reverse-engineered Tableau extraction for recent years.',
    standfirst:
      'An honest H-1B sponsorship database, built from raw USCIS filings rather than job-posting claims.',
    overview: {
      heading: 'Overview',
      body: [
        'WhoSponsors answers one question: does this employer actually sponsor H-1B visas? Job postings routinely say "visa sponsorship available" when the filing record says otherwise. The site turns USCIS\'s own approval and denial data into a searchable, per-company trend view covering FY2009 through FY2025.',
        'It is aimed at international students and workers deciding where to spend their limited application effort — a group that includes me.'
      ]
    },
    problem: {
      heading: 'Problem',
      body: [
        'USCIS publishes the H-1B Employer Data Hub, but it is distributed as a pile of per-year CSVs with no stable employer identity. The same company appears as GOOGLE LLC, GOOGLE INC, and a dozen other spellings across years, so naive aggregation badly undercounts large sponsors and scatters their history.',
        'The recent years are worse: from FY2024 onward USCIS stopped publishing the static CSVs and moved the numbers into a Tableau dashboard, which exposes only top employers and only approvals.'
      ]
    },
    contribution: {
      heading: 'My contribution',
      body: [
        'I built the project end to end: the ETL, the entity resolution, the extraction for the Tableau-only years, the SQLite schema, and the Next.js front end with its charts.',
        'The charts are hand-rolled SVG rather than a charting library, and the data layer has no external API dependency — the whole thing builds from the raw government files with two make targets.'
      ]
    },
    architecture: {
      heading: 'Architecture',
      steps: [
        {
          label: 'Ingest',
          detail:
            'make data downloads the USCIS H-1B Employer Data Hub CSVs for FY2009–2023.'
        },
        {
          label: 'Resolve',
          detail:
            'etl/build.py normalizes employer strings and applies a curated alias table, collapsing name variants onto one canonical employer.'
        },
        {
          label: 'Extend',
          detail:
            'etl/tableau_years.sh and etl/merge_tableau.py pull FY2024+ from the USCIS Tableau hub and merge them in, flagged as partial.'
        },
        {
          label: 'Store',
          detail:
            'The result is written to SQLite — a single file, no database server to run or pay for.'
        },
        {
          label: 'Serve',
          detail:
            'A Next.js app queries it and renders per-company approval and denial trends as hand-written SVG.'
        }
      ]
    },
    decisions: {
      heading: 'Engineering decisions',
      items: [
        {
          choice:
            'Normalization plus a curated alias table, rather than pure fuzzy matching',
          why:
            'Fuzzy matching over 324k employer strings produces false merges that are invisible in aggregate and quietly corrupt the answer for exactly the large employers people search for. A deterministic normalizer plus a hand-maintained alias list is more work to extend, but every merge is auditable and wrong ones are fixable by editing one table.'
        },
        {
          choice: 'SQLite rather than a hosted database',
          why:
            'The dataset is read-only, rebuilt from source on demand, and small enough to ship as a file. That removes the running cost and the operational surface entirely — the build output is the deployment artifact.'
        },
        {
          choice: 'Hand-rolled SVG charts rather than a charting library',
          why:
            'The site renders one chart shape. A library would have added a dependency and bundle weight to do less than the markup it replaced.'
        },
        {
          choice: 'Labelling FY2024+ as partial rather than silently blending it',
          why:
            'The Tableau source covers only top employers and only approvals. Merging it in unmarked would make denial rates look artificially low for recent years. Showing it as partial keeps the comparison honest even though it makes the UI more complicated.'
        }
      ]
    },
    results: {
      heading: 'Results',
      outcomes: [
        'ETL over 831k filings covering FY2009–FY2025.',
        'Entity resolution across 324k raw employer strings.',
        'FY2024+ coverage recovered from the Tableau dashboard after USCIS stopped publishing CSVs.',
        'Full rebuild from raw government files in roughly two minutes, with no external API or chart dependency.'
      ],
      limitations: [
        'FY2024+ data covers top employers only and reports approvals without denials, so denial rates are unavailable for those years.',
        'Alias resolution is curated, so an employer whose variants are not yet in the table will still appear split.',
        'The data is USCIS\'s; merging errors are mine. It is not legal advice.'
      ]
    },
    missing: []
  },
  {
    slug: 'split-inference',
    projectId: 'distributed-ai-research',
    title: 'Distributed AI Systems Research',
    metaTitle: 'Distributed Inference Research — Verifying a Split YOLO Pipeline',
    metaDescription:
      'Profiling all 22 AlexNet split points across WiFi, LTE and backhaul, then verifying a distributed YOLO pipeline across an Apple M3 Mac and two Linux VMs to within 0.000137 across all 300 outputs.',
    standfirst:
      'Splitting neural network execution across machines — finding where to cut it, and proving the answer is still the same.',
    overview: {
      heading: 'Overview',
      body: [
        'Ongoing undergraduate research with Prof. Feng Wang at the University of Mississippi, in collaboration with the University of Memphis, running since January 2026.',
        'The work has run in two phases. The first partitioned AlexNet across a two-machine pipeline over TCP and profiled all 22 candidate split points against WiFi, LTE and backhaul link characteristics, to establish where the end-to-end latency minimum actually falls. The second moved to YOLO object detection across heterogeneous hardware — an Apple M3 Mac and two Linux VMs — and focused on proving the distributed result is numerically faithful.'
      ]
    },
    problem: {
      heading: 'Problem',
      body: [
        'Splitting a model across machines raises two separate questions. Where should the cut go, and is the distributed result still the same result?',
        'The first is not obvious, because activation sizes do not shrink monotonically — AlexNet\'s balloon after the first convolution before collapsing through pooling, so the cheapest cut depends on how expensive a byte is on that link. The second is easy to get wrong silently: a partitioned pipeline can diverge from the single-machine baseline while still producing output that looks like a plausible detection.',
        'Across a heterogeneous cluster the sources of divergence multiply. The Mac and the Linux VMs resolve different dependency versions, the machines have to authenticate to each other before anything runs, and partial results can arrive out of order.'
      ]
    },
    contribution: {
      heading: 'My contribution',
      body: [
        'I built the two-machine distributed inference pipeline that carries activations over TCP, and profiled all 22 AlexNet split points against WiFi, LTE and backhaul link characteristics.',
        'On the YOLO pipeline I verified all 300 outputs against the single-machine baseline and tracked down the failures that stood in the way. Those fell into three classes: dependency mismatches between the Mac and the Linux VMs, authentication between the machines, and ordering errors where partial results were assembled in the wrong sequence.'
      ]
    },
    architecture: {
      heading: 'Architecture',
      steps: [
        {
          label: 'Partition',
          detail:
            'The model is cut at a chosen layer, producing a head that runs on the near tier and a tail that runs on the far one.'
        },
        {
          label: 'Tiers',
          detail:
            'A two-machine TCP pipeline for the AlexNet profiling; an Apple M3 Mac and two Linux VMs for the YOLO work.'
        },
        {
          label: 'Transfer',
          detail:
            'The intermediate activation is serialized and sent across the link, whose cost depends on the tensor size at that cut.'
        },
        {
          label: 'Authenticate',
          detail:
            'The machines establish trust with each other before any stage will run.'
        },
        {
          label: 'Order',
          detail:
            'Partial results are reassembled in the correct sequence, which is where several early mismatches originated.'
        },
        {
          label: 'Verify',
          detail:
            'Every output is compared against the same input run end to end on a single machine.'
        }
      ]
    },
    decisions: {
      heading: 'Engineering decisions',
      items: [
        {
          choice: 'Verifying correctness before measuring anything',
          why:
            'A distributed pipeline that is fast but subtly wrong is worthless, and the error is easy to miss — a shifted bounding box still looks like a detection. Establishing numerical equivalence first means every later result describes a pipeline that is actually computing the right thing.'
        },
        {
          choice: 'Profiling every split point rather than a promising few',
          why:
            'Activation sizes do not shrink monotonically through the network, so the latency minimum is not where intuition puts it — and it moves with the link. Sampling a few plausible cuts would miss it. Profiling all 22 across WiFi, LTE and backhaul is what makes the choice defensible rather than guessed.'
        },
        {
          choice: 'Checking all 300 outputs rather than sampling',
          why:
            'The failures were not uniform. Ordering errors in particular affect specific outputs rather than degrading everything slightly, so a sample can pass while the pipeline is still wrong.'
        },
        {
          choice: 'Running across genuinely heterogeneous machines',
          why:
            'A Mac and two Linux VMs surface the dependency and authentication problems that a homogeneous cluster hides — and those are the problems a real device-to-edge deployment would hit.'
        }
      ]
    },
    results: {
      heading: 'Results',
      outcomes: [
        'A two-machine distributed inference pipeline running over TCP.',
        'All 22 AlexNet split points profiled against WiFi, LTE and backhaul link characteristics.',
        'All 300 outputs of the distributed YOLO pipeline verified against the single-machine baseline.',
        'Maximum error of 0.000137 — that is, the largest absolute difference between any distributed output value and its single-machine counterpart, which rules out a partition that silently changes the computation.',
        'Dependency, authentication, and ordering errors identified and resolved across the Mac and the two Linux VMs.'
      ],
      limitations: [
        'The work is ongoing and there is no public repository yet.',
        'Results so far cover AlexNet and YOLO; generalization to other architectures is not yet established.',
        'Verification establishes correctness, not a latency benefit — the performance question is separate.'
      ]
    },
    missing: [
      'The measured latency per AlexNet split point — the numbers behind the profiling, and where the minimum landed on each link',
      'The verification tolerance for the AlexNet pipeline (the old site said "within 1e-4"; the resume gives 0.000137 for YOLO)',
      'How the link characteristics were obtained — measured on real networks or applied as published profiles',
      'How execution is partitioned across the three machines in the YOLO phase, and whether the split point is fixed or chosen'
    ]
  },
  {
    slug: 'resumegit',
    projectId: 'resumegit',
    title: 'resumeGit',
    metaTitle: 'resumeGit — Full-Stack Product Case Study',
    metaDescription:
      'Version control for resumes: a branch per application and a GPT-5.6 semantic merge engine, built on real git repositories with a hard no-fabrication rule.',
    standfirst:
      'Version control for your resume — one branch per application, with a semantic merge that keeps every branch current.',
    overview: {
      heading: 'Overview',
      body: [
        'resumeGit treats a resume the way git treats code. Each job application gets a branch, tailored to that posting. When a new experience is committed to main, a semantic merge engine propagates it into every live branch, rewritten in that branch\'s own voice and landing as a reviewable commit.',
        'Built for OpenAI Build Week on the "Apps for your life" track.'
      ]
    },
    problem: {
      heading: 'Problem',
      body: [
        'Students tailor a copy of their resume for every application. The result is resume_final_v3_GOOGLE.pdf, forgotten variants, and bullets that exist in one file and nowhere else.',
        'Version control solved this for source code two decades ago. A resume is the one document most people own that genuinely needs branches, history, and blame — and has none of them.'
      ]
    },
    contribution: {
      heading: 'My contribution',
      body: [
        'I designed and built the system: the schema and identity model, the git layer, the semantic merge and diff engines, and the front end.',
        'The core design choice is that git is the database — there is no second store. Resume content lives as structured YAML in a real repository, rendered to a printable page.'
      ]
    },
    architecture: {
      heading: 'Architecture',
      steps: [
        {
          label: 'Schema',
          detail:
            'lib/schema.ts models the resume and branch metadata with zod. Stable item and bullet ids are the identity system everything else depends on.'
        },
        {
          label: 'Git layer',
          detail:
            'lib/repo.ts wraps simple-git for init, branch, commit, log and diff, with bullet-level blame implemented via git log -S. All operations are serialized behind a lock.'
        },
        {
          label: 'Tailor',
          detail:
            'A job description creates a branch: the model reorders emphasis, rewrites bullets, and records what it omitted and why.'
        },
        {
          label: 'Merge',
          detail:
            'A new experience on main is rewritten per branch and lands as a reviewable commit rather than an automatic overwrite.'
        },
        {
          label: 'Render',
          detail:
            'Any ref renders as a resume, with semantic diff against main and blame tracing each bullet to the commit that introduced it.'
        }
      ]
    },
    decisions: {
      heading: 'Engineering decisions',
      items: [
        {
          choice: 'Git as the only storage layer',
          why:
            'History, diffs, branching and blame are the whole product. Reimplementing them over a conventional database would mean rebuilding, badly, what git already does correctly — so every resume is an actual repository instead.'
        },
        {
          choice: 'Stable item and bullet ids as the identity system',
          why:
            'Semantic merge and bullet-level blame both need to know that a rewritten bullet is still the same bullet. Ids make that tractable, and they are also what makes the no-fabrication rule checkable.'
        },
        {
          choice: 'A hard no-fabrication constraint on every prompt',
          why:
            'The model is only permitted to rephrase, reorder, or omit — never to invent. A resume tool that embellishes is worse than useless, because the cost of a fabricated claim lands on the user in an interview. Stable ids mean the constraint can be verified rather than trusted.'
        },
        {
          choice: 'A deterministic mock provider so the app runs with no API key',
          why:
            'The full flow — branching, merging, diffing, blame — is demonstrable without a key or a model call. That keeps the product reviewable by anyone who clones it and makes the git logic testable independently of the model.'
        },
        {
          choice: 'Serializing all git operations behind a lock',
          why:
            'Concurrent writes to one repository corrupt its state. A lock trades throughput for correctness, which is the right trade when the repository is a single user\'s resume.'
        }
      ]
    },
    results: {
      heading: 'Results',
      outcomes: [
        'Every resume is a real git repository: history, diffs, and blame come for free rather than being reimplemented.',
        'A branch per application doubles as an application tracker.',
        'Semantic diff describes changes in recruiter terms, with the raw git diff one click away.',
        'Blame traces every bullet to the commit that introduced it, with an evidence link — no silent resume inflation.',
        'Runs end to end with no API key via a deterministic provider.'
      ],
      limitations: [
        'In development; built under hackathon time constraints.',
        'Semantic operations require a GPT-5.6 key; without one the deterministic provider does not rewrite prose.'
      ]
    },
    missing: [
      'Whether it was submitted or placed at OpenAI Build Week',
      'Any usage or evaluation numbers'
    ]
  }
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
