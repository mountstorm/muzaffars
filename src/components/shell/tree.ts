export type TreeNode = {
  label: string;
  href?: string;
  /** Rendered as a folder rather than a file. */
  children?: TreeNode[];
  external?: boolean;
};

/** Mirrors the real routes. Folders expand when the current path is inside. */
export const workspace: TreeNode[] = [
  { label: 'README.md', href: '/' },
  { label: 'about.md', href: '/about' },
  {
    label: 'projects',
    children: [
      { label: 'index.md', href: '/projects' },
      { label: 'whosponsors.md', href: '/projects/whosponsors' },
      { label: 'split-inference.md', href: '/projects/split-inference' },
      { label: 'resumegit.md', href: '/projects/resumegit' }
    ]
  },
  { label: 'experience.md', href: '/#experience' },
  { label: 'resume.pdf', href: '/resume' },
  { label: 'gallery', href: '/gallery' }
];

export const contactTree: TreeNode[] = [
  { label: 'contact', href: '/contact' },
  { label: 'email', href: 'mailto:mkhaydar@go.olemiss.edu', external: true },
  { label: 'github', href: 'https://github.com/mountstorm', external: true },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/muzaffar-',
    external: true
  }
];
