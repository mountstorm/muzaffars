'use client';

import TextDisperse from '@/app/contact/textDisperse/textDisperse';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function Contact() {
  const background = useRef(null);

  const setBackground = (isActive: any) => {
    gsap.to(background.current, { opacity: isActive ? 0.7 : 0 });
  };

  return (
    <div className="-mt-20 min-h-screen bg-foreground text-background ">
      <div className="flex min-h-screen w-full items-center justify-center pt-44 align-middle text-[8.6vw] xs:text-[5.6vw]">
        <div className="p-12 xs:w-1/2 xs:p-0">
          <div className="flex justify-between uppercase">
            <p className="m-0">Muzaffar</p>
          </div>
          <div className="flex justify-between uppercase">
            <p className="m-0">Khaydarov</p>
          </div>
          <div className="flex uppercase">
            <p className="m-0">software-engineer</p>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 text-[7vw] uppercase xs:text-[5.6vw]">
            <a href="mailto:mkhaydar@go.olemiss.edu">
              <TextDisperse setBackground={setBackground}>
                <p className="m-0">→Email</p>
              </TextDisperse>
            </a>

            <Link href={'https://www.linkedin.com/in/muzaffar-'}>
              <TextDisperse setBackground={setBackground}>
                <p>→Linkedin</p>
              </TextDisperse>
            </Link>

            <Link href={'https://github.com/mountstorm'}>
              <TextDisperse setBackground={setBackground}>
                <p>→Github</p>
              </TextDisperse>
            </Link>
          </div>
          <div
            ref={background}
            className={clsx(
              'pointer-events-none absolute inset-0 h-full w-full bg-foreground text-[5.6vw] opacity-0'
            )}
          ></div>
        </div>
      </div>
    </div>
  );
}
