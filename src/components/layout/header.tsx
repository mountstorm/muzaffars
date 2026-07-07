'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Menu from '../nav';
import Link from 'next/link';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { useIsMobile } from '@/components/util';
import Magnetic from '@/components/animations/magnetic';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const mobile = useIsMobile();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        ref={header}
        className="absolute top-0 z-20 box-border flex w-full items-center p-4 font-light text-white mix-blend-difference lg:p-8"
      >
        <div className="flex lg:pr-56">
          <Link href={'/'} className="group z-10 flex items-center space-x-2">
            <Image
              height={32}
              width={32}
              src="/images/img.png"
              alt="Muzaffar Khaydarov logo"
              className="object-contain"
              priority
            />
            {!mobile && (
              <>
                <div className="hover:rotate-[360deg]">©</div>
                <div className="relative flex overflow-hidden">
                  <div className="ease-custom-cubic transition-transform duration-500 group-hover:translate-x-[-100%]">
                    coded by
                  </div>
                  <div className="ease-custom-cubic px-1 transition-transform duration-500 group-hover:translate-x-[-65px]">
                    Muzaffar
                  </div>

                  <div
                    className="ease-custom-cubic
              translate-x-full transition-transform duration-500 group-hover:translate-x-[-65px]"
                  >
                    Khaydarov
                  </div>
                </div>
              </>
            )}
          </Link>
        </div>
        {!mobile && (
          <div className="flex flex-1 items-center justify-between font-semibold">
            <div className="group relative z-10 flex cursor-pointer p-3">
              <Magnetic>
                <Link href={'/about'}>About</Link>
              </Magnetic>
            </div>
            <div className="group relative z-10 flex cursor-pointer p-3">
              <Magnetic>
                <Link href={'/projects'}>Projects</Link>
              </Magnetic>
            </div>
            <div className="group relative z-10 flex cursor-pointer p-3">
              <Magnetic>
                <Link href={'/resume'}>Resume</Link>
              </Magnetic>
            </div>
            <div className="group relative z-10 flex cursor-pointer p-3">
              <Magnetic>
                <Link href={'/gallery'}>Gallery</Link>
              </Magnetic>
            </div>
            <div className="group relative z-10 flex cursor-pointer p-3">
              <Magnetic>
                <div className="flex">
                  <Link href={'/contact'}>Contact</Link>
                  <ArrowUpRight size={18} />
                </div>
              </Magnetic>
            </div>
            <div className="relative z-10 flex items-center gap-3 p-3">
              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/muzaffar-"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex"
                >
                  <Linkedin size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="mailto:mkhaydar@go.olemiss.edu"
                  aria-label="Email"
                  className="flex"
                >
                  <Mail size={18} />
                </a>
              </Magnetic>
              <ThemeToggle className="text-white" />
            </div>
          </div>
        )}
      </div>
      {!mobile && (
        <div
          className={`fixed right-0 top-0 z-20 transform transition-transform duration-300 ease-out ${
            isScrolled ? 'scale-100' : 'scale-0'
          }`}
        >
          <Menu />
        </div>
      )}
      {mobile && (
        <div className="fixed right-2 z-20 transform">
          <Menu />
        </div>
      )}
    </>
  );
}
