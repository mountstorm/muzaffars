'use client';

import React, { type PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export default function RootTemplate({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
