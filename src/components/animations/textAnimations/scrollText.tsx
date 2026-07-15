import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const prompt = '$ whoami';
const answer = '> muzaffar';
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

// Types the prompt letter-by-letter, then pops the answer letters in with a
// springy stagger — all on elements already in the DOM so hydration is safe.
const animateIntro = (containerRef: MutableRefObject<any>) => {
  const container = containerRef.current;
  const promptLetters = container?.querySelectorAll('.prompt-letter');
  const answerLetters = container?.querySelectorAll('.answer-letter');
  const cursor = container?.querySelector('.hero-cursor');

  const tl = gsap.timeline();
  tl.to(promptLetters, {
    opacity: 1,
    duration: 0.01,
    stagger: 0.09
  });
  tl.to(
    answerLetters,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2.5)',
      stagger: 0.06
    },
    '+=0.35'
  );
  if (cursor) {
    tl.to(cursor, { opacity: 0, repeat: -1, yoyo: true, duration: 0.5, ease: 'steps(1)' }, 0);
  }
  return tl;
};

const letterSizeClasses =
  'letter text-6xl font-semibold xs:text-[90px] xs:leading-none md:text-[120px] lg:text-[150px] xl:text-[210px]';

// Blue gradient across the answer word — light sky blue fading to deep blue.
function answerColor(index: number, total: number) {
  const t = index / Math.max(total - 1, 1);
  const lightness = Math.round(65 - t * 30); // 65% -> 35%
  return `hsl(217, 90%, ${lightness}%)`;
}

function LetterDisplay({ word }: { word: string }) {
  return word.split('').map((letter, index) => (
    <div
      key={index}
      className={letterSizeClasses + ' '}
      data-speed={getSpeedForIndex(index)}
    >
      {letter}
    </div>
  ));
}

function PromptDisplay({ word }: { word: string }) {
  return word.split('').map((letter, index) => (
    <div
      key={index}
      className={letterSizeClasses + ' prompt-letter opacity-0'}
      data-speed={getSpeedForIndex(index)}
    >
      {letter === ' ' ? ' ' : letter}
    </div>
  ));
}

function AnswerDisplay({ word }: { word: string }) {
  return word.split('').map((letter, index) => (
    <div
      key={index}
      className={letterSizeClasses + ' answer-letter opacity-0'}
      style={{
        color: letter === '>' || letter === ' ' ? undefined : answerColor(index, word.length),
        transform: 'translateY(0.3em) scale(0.5)'
      }}
      data-speed={getSpeedForIndex(index)}
    >
      {letter === ' ' ? ' ' : letter}
    </div>
  ));
}

export function LetterCollision() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animateLettersOnScroll(containerRef);
    const tl = animateIntro(containerRef);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="ml-8 scroll-smooth">
      <div className="-mt-28 mb-36 flex h-screen flex-col justify-end lg:mb-24">

        <div className="flex flex-wrap items-center p-0">
          <PromptDisplay word={prompt} />
          <div
            className={
              letterSizeClasses +
              ' hero-cursor ml-2 select-none bg-current w-[0.5em] h-[1em]'
            }
            aria-hidden="true"
          ></div>
        </div>

        <div className="mt-2 flex flex-wrap items-center">
          <AnswerDisplay word={answer} />
        </div>

      </div>

      <div className="flex flex-wrap items-center">
        <LetterDisplay word={sentence3} />
      </div>
    </div>

  );
}
