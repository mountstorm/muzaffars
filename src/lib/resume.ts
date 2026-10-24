export type Role = {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  description: string;
  /** Short, falsifiable bullets used on the HTML resume. */
  bullets: string[];
};

export const education = {
  school: 'University of Mississippi',
  degree: 'B.S. Computer Science, Minor in Mathematics',
  dates: 'Aug. 2024 – May 2028',
  location: 'Oxford, MS',
  highlights: [
    'GPA 3.87/4.0',
    "Chancellor's Roll every semester",
    'Sally McDonnell Barksdale Honors College (top 5%)'
  ]
};

export const roles: Role[] = [
  {
    year: 'Aug. 2024 – May 2028',
    title: education.degree,
    company: education.school,
    location: education.location,
    description:
      "GPA 3.87/4.0, Chancellor's Roll every semester, Sally McDonnell Barksdale Honors College (top 5%).",
    bullets: education.highlights
  },
  {
    year: 'Oct. 2024 – Apr. 2025',
    title: 'Undergraduate Research Assistant',
    company: 'UM Thad Cochran Research Center',
    location: 'Oxford, MS',
    description:
      'Programmed industrial robots (Wlkata, Epson) in Python and C++ for autonomous pharmaceutical sample preparation, removing manual handling from the protocol. Built data pipelines with pandas, NumPy, and Matplotlib.',
    bullets: [
      'Programmed Wlkata and Epson industrial robots in Python and C++ for autonomous pharmaceutical sample preparation, removing manual handling from the protocol.',
      'Built the analysis pipeline for run data with pandas, NumPy, and Matplotlib.'
    ]
  },
  {
    year: 'Jul. 2025 – Present',
    title: 'Computer Science Teaching Assistant',
    company: 'University of Mississippi',
    location: 'Oxford, MS',
    description:
      'Guide 49+ students through OOP (Java), data structures, and algorithms; review and optimize 300+ programs weekly.',
    bullets: [
      'Guide 49+ students through object-oriented programming (Java), data structures, and algorithms.',
      'Review 300+ student programs weekly, leaving line-level feedback on correctness and structure.'
    ]
  },
  {
    year: 'Jan. 2026 – Present',
    title: 'Undergraduate Research Assistant, Distributed AI Systems',
    company: 'University of Mississippi (Prof. Feng Wang) x University of Memphis',
    location: 'Oxford, MS',
    description:
      'Implement split-inference systems in PyTorch that partition DNN execution across device, edge, and cloud. Built a two-machine distributed inference pipeline over TCP, verified within 1e-4 of single-machine output, and profiled all 22 AlexNet split points across WiFi, LTE, and backhaul links.',
    bullets: [
      'Implement split-inference systems in PyTorch that partition DNN execution across device, edge, and cloud.',
      'Built a two-machine distributed inference pipeline over TCP, verified within 1e-4 of single-machine output.',
      'Profiled all 22 AlexNet split points across WiFi, LTE, and backhaul links to locate the end-to-end latency minimum.'
    ]
  },
  {
    year: 'Jun. 2026 – Present',
    title: 'Software Engineering Intern',
    company: 'C Spire',
    location: 'Ridgeland, MS',
    description:
      'Own two to three repositories handling billing audit logic and application flows, shipping code changes (not just reviews) across production Perl and Python systems.',
    bullets: [
      'Own two to three repositories handling billing audit logic and application flows, shipping code changes across production Perl and Python systems.',
      'Fixed a production Perl billing flow handling 100+ weekly zero-payment errors, preventing batch-wide failures.',
      'Built a Python automation that auto-issues ServiceNow tickets for flagged accounts, saving on-call operators 30 minutes a day.'
    ]
  }
];

/** Most recent first, for the HTML resume. */
export const experience = roles.filter((r) => r.company !== education.school || r.title !== education.degree).reverse();

export type SkillGroup = {
  label: string;
  skills: { name: string; evidence: string }[];
};

// Deliberately short. Every entry is backed by shipped work — if it is not on
// this list it is because nothing public demonstrates it yet.
export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', evidence: 'Split-inference research, WhoSponsors ETL, C Spire automation' },
      { name: 'Perl', evidence: 'Production billing flows at C Spire' },
      { name: 'Java', evidence: 'Teaching OOP and data structures to 49+ students' },
      { name: 'TypeScript', evidence: 'resumeGit, WhoSponsors, this site' },
      { name: 'C++', evidence: 'Industrial robot control at Thad Cochran' },
      { name: 'SQL', evidence: 'Oracle billing audits at C Spire' },
      { name: 'Bash', evidence: 'NeuraBash CLI' }
    ]
  },
  {
    label: 'Systems & Infrastructure',
    skills: [
      { name: 'Linux / RHEL', evidence: 'C Spire production servers over SSH' },
      { name: 'Git', evidence: 'resumeGit — built on plumbing commands via simple-git' },
      { name: 'Docker', evidence: 'Local service orchestration' },
      { name: 'ServiceNow', evidence: 'Automated ticket filing for flagged accounts' }
    ]
  },
  {
    label: 'ML & Data',
    skills: [
      { name: 'PyTorch', evidence: 'DNN partitioning across device, edge, and cloud' },
      { name: 'pandas / NumPy', evidence: '831k-row USCIS ETL and research pipelines' }
    ]
  },
  {
    label: 'Web',
    skills: [
      { name: 'Next.js / React', evidence: 'resumeGit, WhoSponsors, this site' },
      { name: 'Node.js', evidence: 'resumeGit merge engine' }
    ]
  }
];

export const certifications = [
  'AWS Generative AI Applications',
  'IBM Data Analysis Professional'
];
