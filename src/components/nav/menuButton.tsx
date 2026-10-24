import { motion } from 'framer-motion';

type ButtonProps = {
  isActive: boolean;
  toggleMenu: () => void;
  controls: string;
};

export default function MenuButton({
  isActive,
  toggleMenu,
  controls
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      aria-expanded={isActive}
      aria-controls={controls}
      aria-label={isActive ? 'Close menu' : 'Open menu'}
      className="absolute right-0 top-0 z-20 h-[44px] w-[100px] cursor-pointer overflow-hidden rounded-[25px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
    >
      <motion.span
        className="relative block h-full w-full"
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="menu-face block h-full w-full bg-secondary text-background [perspective:600px]">
          <PerspectiveText label="Menu" />
        </span>
        <span className="menu-face block h-full w-full bg-[#FFF7E5] text-secondary [perspective:600px]">
          <PerspectiveText label="Close" />
        </span>
      </motion.span>
    </button>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="perspective-text flex h-full w-full flex-col items-center justify-center"
    >
      <span className="pointer-events-none m-0 block uppercase">{label}</span>
      <span className="pointer-events-none absolute m-0 block uppercase">
        {label}
      </span>
    </span>
  );
}
