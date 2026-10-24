export const SITE = {
  url: 'https://muzaffarkhaydarov.com',
  name: 'Muzaffar Khaydarov',
  shortName: "Muzaffar's World",
  title: 'Muzaffar Khaydarov — Software Engineer & Distributed AI Researcher',
  description:
    'CS @ Ole Miss. I build systems that span device, edge, and cloud — production billing at C Spire and split-inference research with Prof. Feng Wang.',
  email: 'mkhaydar@go.olemiss.edu',
  github: 'https://github.com/mountstorm',
  linkedin: 'https://www.linkedin.com/in/muzaffar-',
  location: 'Oxford, MS',
  // Shown above the fold and on /resume. Update when the search changes.
  availability: 'Seeking SWE internship, Summer 2027 — available May–Aug, open to relocation.'
} as const;

/** Absolute URL for a site-relative path. */
export const abs = (path: string) => new URL(path, SITE.url).toString();
