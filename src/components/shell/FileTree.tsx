'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { workspace, contactTree, type TreeNode } from './tree';

const isCurrent = (pathname: string, href?: string) => {
  if (!href || href.startsWith('http') || href.startsWith('mailto:')) return false;
  // An in-page anchor is never "the current file" — '/#experience' would
  // otherwise match the home route and highlight two rows at once.
  if (href.includes('#')) return false;
  return href === pathname;
};

function Row({
  node,
  depth,
  pathname
}: {
  node: TreeNode;
  depth: number;
  pathname: string;
}) {
  const current = isCurrent(pathname, node.href);
  const indent = { paddingLeft: `${depth * 2 + 1}ch` };

  if (node.children) {
    const open = node.children.some((c) => isCurrent(pathname, c.href));
    return (
      <li>
        <span
          className="block py-[1px] text-[var(--ed-dim)]"
          style={indent}
          aria-hidden="true"
        >
          {open ? '▾' : '▸'} {node.label}/
        </span>
        <ul>
          {node.children.map((c) => (
            <Row key={c.label} node={c} depth={depth + 1} pathname={pathname} />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={node.href!}
        {...(node.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        aria-current={current ? 'page' : undefined}
        style={indent}
        className={`block py-[1px] pr-[1ch] transition-colors duration-150 ${
          current
            ? 'bg-[var(--ed-sel)] text-[var(--ed-accent)]'
            : 'text-[var(--ed-dim)] hover:bg-[var(--ed-sel)] hover:text-[var(--ed-ink)]'
        }`}
      >
        {node.label}
        {node.external ? (
          <span aria-hidden="true" className="text-[var(--ed-faint)]">
            {' '}
            ↗
          </span>
        ) : null}
      </Link>
    </li>
  );
}

export default function FileTree() {
  const pathname = usePathname() || '/';

  return (
    <nav aria-label="Site" className="ed-mono text-[13px] leading-[1.45]">
      <p className="mb-[0.5ch] truncate px-[1ch] text-[var(--ed-faint)]">
        ~/muzaffarkhaydarov.com
      </p>
      <ul>
        {workspace.map((n) => (
          <Row key={n.label} node={n} depth={0} pathname={pathname} />
        ))}
      </ul>

      <p className="mb-[0.5ch] mt-[2ch] px-[1ch] text-[var(--ed-faint)]">
        reach me
      </p>
      <ul>
        {contactTree.map((n) => (
          <Row key={n.label} node={n} depth={0} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
}
