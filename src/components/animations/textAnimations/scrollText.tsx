import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const hello = '$ touch';
const friend = 'grass  ';
const thatSLame = '>      today ';
const sentence3 = " sleep, code, repeat";

// Deterministic per-letter pseudo-randomness so server and client markup
// match exactly (Math.random() during render causes a hydration mismatch).
function getSpeedForIndex(index: number) {
  const pseudoRandom = Math.abs(Math.sin(index * 12.9898)) % 1;
  return 0.8 + pseudoRandom * (1.5 - 0.8);
}
function getRandomRotation() {
  return Math.random() * 60 - 30; // Random rotation between -30 and 30 degrees
}

const animateLettersOnScroll = (containerRef: MutableRefObject<any>) => {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll('.letter');

  letterElements.forEach((letter: Element, index: number) => {
    gsap.to(letter, {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute('data-speed'))) *
        ScrollTrigger.maxScroll(window),
      ease: 'power2.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        invalidateOnRefresh: true,
        scrub: 0.5
      },
      rotation: getRandomRotation()
    });
  });
};

function LetterDisplay({ word }: { word: string }) {
  return word.split('').map((letter, index) => (
    <div
      key={index}
      className="letter text-6xl font-semibold xs:text-[90px] xs:leading-none md:text-[120px] lg:text-[150px] xl:text-[210px] "
      data-speed={getSpeedForIndex(index)}
    >
      {letter}
    </div>
  ));
}

export function LetterCollision() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animateLettersOnScroll(containerRef);
  }, []);

  return (
    <div ref={containerRef} className="ml-8 scroll-smooth">
      <div className="-mt-28 mb-36 flex h-screen flex-col justify-end lg:mb-24">

        <div className="flex flex-wrap p-0 items-center">
          <LetterDisplay word={hello} />
          {/* Visual gap between touch and grass */}
          <div className="w-3 xs:w-4 sm:w-6"></div>
          <LetterDisplay word={friend} />
        </div>

        <div className="flex flex-wrap items-center mt-2">
          <LetterDisplay word={thatSLame} />
        </div>

      </div>
      
      <div className="flex flex-wrap items-center">
        <LetterDisplay word={sentence3} />
      </div>
    </div>

  );
}
