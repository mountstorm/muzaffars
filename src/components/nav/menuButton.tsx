import { motion } from 'framer-motion';

type ButtonProps = {
  isActive: boolean;
  toggleMenu: () => void;
};

export default function MenuButton({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div className="absolute right-0 top-0 z-20 h-[40px] w-[100px] cursor-pointer overflow-hidden rounded-[25px]">
      <motion.div
        className="relative h-full w-full"
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="menu-face h-full w-full bg-secondary text-background [perspective:600px]"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className="menu-face h-full w-full bg-[#FFF7E5] text-secondary [perspective:600px]"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className="perspective-text flex h-full w-full flex-col items-center justify-center">
      <p className="pointer-events-none m-0 uppercase">{label}</p>
      <p className="pointer-events-none absolute m-0 uppercase">{label}</p>
    </div>
  );
}
