/**
 * Single source of truth for experience, education and skills.
 * Mirrors Khaydarov_Disney_SWE_Resume.pdf — keep the two in step.
 */

export type Role = {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  description: string;
  bullets: string[];
};

export const education = {
  school: 'University of Mississippi',
  degree: 'B.S. Computer Science, Minor in Mathematics',
  dates: 'Aug. 2024 – May 2028',
  location: 'Oxford, MS',
  highlights: [
    'GPA 3.87/4.0',
    "Chancellor's Roll, all semesters",
    'Sally McDonnell Barksdale Honors College (top 5%)'
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Databases',
    'Operating Systems'
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
    title: 'Undergraduate Research Assistant — Robotics',
    company: 'University of Mississippi, Thad Cochran Research Center',
    location: 'Oxford, MS',
    description:
      'Reduced contamination risk by 85% in pharmaceutical research by programming robotic arm workflows in Python and C++, and building pandas/NumPy pipelines to collect and analyze experimental data.',
    bullets: [
      'Reduced contamination risk by 85% in pharmaceutical research by programming robotic arm workflows in Python and C++.',
      'Built pandas and NumPy pipelines to collect and analyze experimental data.'
    ]
  },
  {
    year: 'Jul. 2025 – Present',
    title: 'Computer Science Teaching Assistant',
    company: 'University of Mississippi',
    location: 'Oxford, MS',
    description:
      'Guide 49+ students through OOP (Java), data structures, and algorithms; review 300+ programs weekly.',
    bullets: [
      'Guide 49+ students through object-oriented programming (Java), data structures, and algorithms.',
      'Review 300+ student programs weekly, leaving line-level feedback on correctness and structure.'
    ]
  },
  {
    year: 'Jan. 2026 – Present',
    title: 'Undergraduate Research Assistant — Distributed AI Systems',
    company:
      'University of Mississippi (Prof. Feng Wang) and University of Memphis collaboration',
    location: 'Oxford, MS',
    description:
      'Verified all 300 outputs of a distributed YOLO object detection pipeline across an Apple M3 Mac and two Linux VMs within a max error of 0.000137, by debugging dependency, authentication, and ordering errors.',
    bullets: [
      'Verified all 300 outputs of a distributed YOLO object detection pipeline across an Apple M3 Mac and two Linux VMs within a max error of 0.000137.',
      'Debugged the dependency, authentication, and ordering errors that stood between the distributed run and the single-machine baseline.'
    ]
  },
  {
    year: 'Jun. 2026 – Aug. 2026',
    title: 'Software Engineering Intern',
    company: 'C Spire — Billing Team',
    location: 'Ridgeland, MS',
    description:
      'Shipped to production Python, KornShell, and Django systems on the billing team. Received a return offer.',
    bullets: [
      'DAR Ticket Automation: saved 30 min/day and replaced 10–20 daily manual reviews by gathering needs from operations staff and shipping a Python/KornShell monitoring pipeline that files ServiceNow tickets.',
      'On-Call Dashboard: let 12 teammates and 2 managers reassign on-call shifts on any date by building a Django calendar dashboard end to end, replacing verbal swaps in daily scrum. Still in use.',
      'Bank Lockbox Zero-Payment Auto-Ignore: auto-cleared 100+ harmless $0 payment rejections weekly by fixing payment logic to still halt on real errors, eliminating a manual operator step.',
      'International Day Pass Audit: caught mismatched billing plans before customers saw them by building a Python/KornShell audit against Oracle SQL, run as one CI/CD-ready command.'
    ]
  }
];

/** Most recent first, for the HTML resume. */
export const experience = roles
  .filter((r) => r.title !== education.degree)
  .reverse();

export type LeadershipEntry = {
  year: string;
  title: string;
  organization: string;
  location?: string;
  bullets: string[];
};

export const leadership: LeadershipEntry[] = [
  {
    year: '2026 – Present',
    title: 'Tech Lead, AWS Student Builder Club',
    organization: 'University of Mississippi Chapter',
    location: 'Oxford, MS',
    bullets: [
      'Set the project roadmap for a 15+ member chapter.',
      'Led all 4 hands-on AWS build sessions, explaining cloud concepts in plain language for members at varied skill levels.'
    ]
  }
];

export type SkillGroup = {
  label: string;
  skills: { name: string; evidence: string }[];
};

// Grouped as on the resume. Every entry is backed by shipped work.
export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', evidence: 'C Spire automation, WhoSponsors ETL, research pipelines' },
      { name: 'TypeScript', evidence: 'resumeGit, WhoSponsors, this site' },
      { name: 'JavaScript', evidence: 'ValueStop, browser tooling' },
      { name: 'SQL', evidence: 'Oracle billing audits at C Spire' },
      { name: 'Java', evidence: 'Teaching OOP and data structures to 49+ students' },
      { name: 'C++', evidence: 'Robotic arm workflows at Thad Cochran' },
      { name: 'KornShell', evidence: 'C Spire monitoring and audit pipelines' },
      { name: 'Bash', evidence: 'NeuraBash CLI' }
    ]
  },
  {
    label: 'Web & Data',
    skills: [
      { name: 'React / Next.js', evidence: 'ValueStop, WhoSponsors, this site' },
      { name: 'Django', evidence: 'On-call dashboard still in use at C Spire' },
      { name: 'REST APIs / JSON', evidence: 'Gemini and Google Maps integration in ValueStop' },
      { name: 'Oracle SQL', evidence: 'International Day Pass billing audit' },
      { name: 'SQLite', evidence: '831k-filing WhoSponsors database' },
      { name: 'MongoDB / Firestore', evidence: 'ValueStop persistence' }
    ]
  },
  {
    label: 'AI / ML',
    skills: [
      { name: 'LLM APIs (GPT-4, Gemini)', evidence: 'NeuraBash, ValueStop, resumeGit' },
      { name: 'Ollama', evidence: 'Local models in NeuraBash' },
      { name: 'YOLO', evidence: 'Distributed object detection pipeline' },
      { name: 'ONNX Runtime', evidence: 'Distributed inference research' },
      { name: 'Prompt Engineering', evidence: 'No-fabrication constraints in resumeGit' }
    ]
  },
  {
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', evidence: 'Tech Lead, AWS Student Builder Club' },
      { name: 'Docker', evidence: 'Local service orchestration' },
      { name: 'Kubernetes', evidence: 'Container orchestration coursework and labs' },
      { name: 'CI/CD', evidence: 'Day Pass audit runs as one CI/CD-ready command' },
      { name: 'Git / GitLab', evidence: 'resumeGit is built on git plumbing' },
      { name: 'Linux', evidence: 'C Spire production servers over SSH' },
      { name: 'pytest', evidence: 'Unit testing across Python projects' },
      { name: 'Jira / ServiceNow', evidence: 'Automated ticket filing at C Spire' }
    ]
  }
];

export const certifications = [
  'AWS Generative AI Applications',
  'IBM Data Analysis Professional'
];
