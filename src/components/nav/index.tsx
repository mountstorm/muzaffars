import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import MenuButton from '@/components/nav/menuButton';
import React, { useEffect, useState } from 'react';
import NavLinks from '@/components/nav/NavLinks';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const links = [
  { title: 'projects', href: '/projects' },
  { title: 'experience', href: '/#experience' },
  { title: 'about', href: '/about' },
  { title: 'resume', href: '/resume' },
  { title: 'contact', href: '/contact' }
];

const PANEL_ID = 'site-menu-panel';

const menu = {
  open: {
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: 'tween',
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

export default function Menu() {
  const [isActive, setIsActive] = useState(false);

  // Escape closes the panel, as a dialog-like overlay should.
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsActive(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isActive]);

  return (
    <div className="fixed right-[20px] top-[20px] z-20 lg:right-[30px] lg:top-[30px]">
      <motion.div
        className={cn('relative rounded-3xl bg-secondary', {
          'lg:top-[-25px right-[-15px] top-[-15px] h-[640px] w-[350px] sm:h-[650px] sm:w-[480px] lg:right-[-25px] ':
            isActive,
          'right-0 top-0 h-[40px] w-[100px] opacity-0': !isActive
        })}
        variants={menu}
        animate={isActive ? 'open' : 'closed'}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && (
            <div
              id={PANEL_ID}
              className="box-border flex h-full flex-col justify-between p-[100px_40px_50px]"
            >
              <NavLinks links={links} setIsActive={setIsActive} />
              <div className="flex items-center gap-4 text-background">
                <a
                  href="https://www.linkedin.com/in/muzaffar-"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a href="mailto:mkhaydar@go.olemiss.edu" aria-label="Email">
                  <Mail size={20} />
                </a>
                <ThemeToggle className="text-background" />
                <Link
                  href="/gallery"
                  onClick={() => setIsActive(false)}
                  className="ml-auto text-sm text-background/75 underline-offset-4 hover:text-background hover:underline"
                >
                  Gallery
                </Link>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      <MenuButton
        controls={PANEL_ID}
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
}
