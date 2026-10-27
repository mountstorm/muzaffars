export type ProjectStatus =
  | 'Live'
  | 'Research'
  | 'In development'
  | 'Internal project';

export type Project = {
  id: string;
  title: string;
  description: string;
  /** One sentence: what it does. Used on the homepage cards. */
  headline?: string;
  /** One concrete result or engineering achievement. */
  result?: string;
  status: ProjectStatus;
  /** Collaboration credit, shown wherever the project is listed. */
  credit?: string;
  /** Slug of the deeper page at /projects/<slug>, when one exists. */
  caseStudy?: string;
  /** Link text for that page. Defaults to case-study wording. */
  caseStudyLabel?: string;
  imagePath: string;
  /** 'contain' for logos and diagrams; defaults to 'cover' for photographs. */
  imageFit?: 'cover' | 'contain';
  link?: string;
  secondaryLink?: string;
  secondaryButtonText?: string;
  noLinkLabel?: string;
  external?: boolean;
  buttonText?: string;
  tags: string[];
};

// Every `link` below was opened and verified to return 200.
export const projects: Project[] = [
  {
    id: 'xarita',
    headline:
      'An interactive atlas of history: drag through 5,000 years of borders, then lay scanned library maps over today\u2019s streets.',
    result:
      'Georeferenced scans from 15+ libraries, fetched by the area in view and faded over a live vector map, in English, Uzbek and Russian.',
    status: 'Live',
    credit: 'Built with my brother, Muhammad Sodiq Khaydarov.',
    title: 'Xarita',
    description:
      'Built an interactive historical atlas \u2014 \u201cxarita\u201d is Uzbek for map. Borders render for any year from 3000 BC to today on a vector globe, scanned maps from 15+ libraries are pulled in by the area you are viewing and can be overlaid and faded against the modern map, and guided tours and a region quiz sit on top. English, Uzbek and Russian.',
    imagePath: '/images/projects/xarita.jpg',
    link: 'https://github.com/mountstorm/Xarita',
    secondaryLink: 'https://xarita-atlas.vercel.app',
    secondaryButtonText: 'Open the atlas',
    tags: ['JavaScript', 'MapLibre GL', 'OpenSeadragon', 'Georeferencing', 'i18n']
  },
  {
    id: 'resumegit',
    headline:
      'Version control for your resume: one branch per application, with a semantic merge that propagates a single life update into every tailored branch.',
    result:
      'Every resume is a real git repository, so history, diffs, and blame come for free rather than being reimplemented.',
    status: 'In development',
    caseStudy: 'resumegit',
    title: 'resumeGit',
    description:
      'Git version control for your resume: a branch per application, and a GPT-5.6 semantic merge engine that propagates one life update into every tailored branch, each rewritten in its own voice. Every resume is a real git repository — history, diffs, and blame for free.',
    imagePath: '/images/projects/resumegit.png',
    imageFit: 'contain',
    link: 'https://github.com/mountstorm/resumegit',
    tags: ['Next.js', 'TypeScript', 'GPT-5.6', 'simple-git', 'zod']
  },
  {
    id: 'chessy',
    status: 'In development',
    title: 'Chessy',
    description:
      'A browser extension whose cursor becomes a knight that reviews your finished chess games: hover the board or move list and it coaches you on each move. Post-game only, powered by Stockfish 16 running locally in the browser.',
    imagePath: '/images/projects/chessy.svg',
    noLinkLabel: 'Private — in development',
    tags: ['Browser Extension', 'Stockfish (WASM)', 'chess.js', 'JavaScript']
  },
  {
    id: 'worldcup-predictor',
    status: 'Live',
    title: 'World Cup Final Predictor',
    description:
      'Modelled a projected 2026 World Cup final (Argentina vs Spain) from 32,401 international matches since 1990: Elo ratings feed a recency-weighted Poisson goal model, resolved over 10,000 Monte Carlo finals into scoreline, market, card and player probabilities. The model puts the two teams within Monte Carlo noise of each other \u2014 a coin flip rather than a favourite.',
    imagePath: '/images/projects/worldcup-predictor.png',
    link: 'https://github.com/mountstorm/worldcup-predictor',
    caseStudy: 'worldcup',
    caseStudyLabel: 'Open the dashboard',
    tags: ['Python', 'pandas', 'scikit-learn', 'Monte Carlo', 'matplotlib']
  },
  {
    id: 'whosponsors',
    headline:
      'A searchable database of which US employers actually sponsor H-1B visas, built from raw USCIS filings.',
    result:
      'ETL over 831k filings with entity resolution collapsing 324k raw employer strings into canonical companies.',
    status: 'Live',
    caseStudy: 'whosponsors',
    title: 'WhoSponsors',
    description:
      'Built the honest H-1B sponsorship database: ETL over 831k USCIS filings with entity resolution across 324k employers, plus a reverse-engineered Tableau extraction for FY2024+ data, served as searchable per-company trend charts.',
    imagePath: '/images/projects/whosponsors.svg',
    link: 'https://github.com/mountstorm/whosponsors',
    tags: ['Python', 'SQLite', 'Next.js', 'Data Engineering', 'SVG Charts']
  },
  {
    id: 'distributed-ai-research',
    headline:
      'Deciding where to split a neural network when inference runs across several machines, and proving the split result still matches the whole model.',
    result:
      'Evaluated all 367 possible cut points for YOLO26n; found only 16 pass a single tensor, and that offloading a 34 ms inference only pays off above roughly 390 Mbps.',
    status: 'Research',
    caseStudy: 'split-inference',
    title: 'Distributed AI Systems Research',
    description:
      'Framed latency-optimal partitioning of neural network inference across heterogeneous machines as a constrained optimization over compute, transfer and memory. Reproduced an NDN-based split-inference framework for YOLO26n and Qwen3-0.6B at 175 ms end to end with output identical to the unsplit model, and built ONNX Runtime tooling that evaluates every one of the 367 possible cut points for correctness, latency and transfer size.',
    imagePath: '/images/projects/split-inference.svg',
    imageFit: 'contain',
    noLinkLabel: 'Ongoing research, no public repo yet',
    tags: ['Python', 'ONNX Runtime', 'YOLO26n', 'Qwen3', 'NDN', 'Linux']
  },
  {
    id: 'dar-ticket-automation',
    status: 'Internal project',
    title: 'DAR Ticket Automation',
    description:
      'Gathered needs from operations staff and shipped a Python/KornShell monitoring pipeline that files ServiceNow tickets, replacing 10 to 20 daily manual reviews and saving 30 minutes a day.',
    imagePath: '/images/logos/cspire.png',
    imageFit: 'contain',
    noLinkLabel: 'Internal to C Spire — architecture on request',
    tags: ['Python', 'KornShell', 'ServiceNow', 'Oracle SQL']
  },
  {
    id: 'oncall-dashboard',
    status: 'Internal project',
    title: 'On-Call Dashboard',
    description:
      'Built a Django calendar dashboard end to end that lets 12 teammates and 2 managers reassign on-call shifts on any date, replacing the verbal swaps that used to happen in daily scrum. Still in use.',
    imagePath: '/images/logos/cspire.png',
    imageFit: 'contain',
    noLinkLabel: 'Internal to C Spire — architecture on request',
    tags: ['Django', 'Python', 'Oracle SQL', 'Internal tooling']
  },
  {
    id: 'intl-day-pass-audit',
    status: 'Internal project',
    title: 'International Day Pass Audit',
    description:
      'Caught mismatched billing plans before customers saw them by building a Python/KornShell audit against Oracle SQL, run as one CI/CD-ready command.',
    imagePath: '/images/logos/cspire.png',
    imageFit: 'contain',
    noLinkLabel: 'Internal to C Spire — architecture on request',
    tags: ['Python', 'KornShell', 'Oracle SQL', 'CI/CD']
  },
  {
    id: 'bank-lockbox-auto-ignore',
    status: 'Internal project',
    title: 'Bank Lockbox Zero-Payment Auto-Ignore',
    description:
      'Auto-cleared 100+ harmless $0 payment rejections weekly by fixing payment logic to still halt on real errors, eliminating a manual step operators ran by hand.',
    imagePath: '/images/logos/cspire.png',
    imageFit: 'contain',
    noLinkLabel: 'Internal to C Spire — architecture on request',
    tags: ['KornShell', 'Oracle SQL', 'Linux', 'SSH']
  },
  {
    id: 'neurabash',
    status: 'Live',
    title: 'NeuraBash',
    description:
      'Built a terminal AI coding assistant using GPT-4 and local LLMs (Ollama), cutting RAM footprint 30% with a modular CLI architecture.',
    imagePath: '/images/projects/neurabash.png',
    link: 'https://github.com/mountstorm/neurabash',
    tags: ['Python', 'Bash', 'OpenAI GPT-4', 'Ollama', 'Prompt Engineering']
  },
  {
    id: 'valuestop',
    status: 'Live',
    title: 'ValueStop',
    description:
      'Co-founded an LLM-powered shopping app and grew it to 100 active users and 20 paying customers, evolving a 36-hour EmoryHacks 2025 prototype built with a 3-person team into a live product. Built the route recommendation feature by integrating the Gemini and Google Maps APIs with A* pathfinding.',
    imagePath: '/images/projects/valuestop.png',
    link: 'https://github.com/mountstorm/cheapstop',
    tags: ['React', 'Gemini 2.0 API', 'Google Maps API', 'Firestore', 'A* pathfinding']
  }
];

/** The three projects featured on the homepage, in display order. */
export const FEATURED_IDS = [
  'xarita',
  'distributed-ai-research',
  'resumegit'
] as const;

export const featuredProjects = FEATURED_IDS.map(
  (id) => projects.find((p) => p.id === id)!
);

export const byCaseStudy = (slug: string) =>
  projects.find((p) => p.caseStudy === slug);
