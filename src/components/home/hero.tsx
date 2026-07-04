import React from 'react';

const roles = ['Software Engineer', 'CS Researcher', 'Rising Junior @ Ole Miss'];

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-foreground px-6 text-center align-middle">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 40%)'
        }}
      />
      <p className="relative z-10 text-sm uppercase tracking-[0.4em] text-background/60 sm:text-base">
        Hi, I&apos;m
      </p>
      <h1 className="relative z-10 text-[15vw] font-semibold leading-[0.9] text-background sm:text-[10vw]">
        Muzaffar
      </h1>
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 text-background/70">
        {roles.map((role, index) => (
          <React.Fragment key={role}>
            <span className="text-lg sm:text-2xl">{role}</span>
            {index < roles.length - 1 && (
              <span className="text-lg text-background/30 sm:text-2xl">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-background/40 sm:text-sm">
        $ touch grass &lt; today
        <span className="ml-1 inline-block h-[1em] w-[0.5em] animate-pulse bg-background/40 align-middle" />
      </p>
    </div>
  );
}
