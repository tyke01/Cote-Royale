"use client";

import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/bounded";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `ScrollText`.
 */
export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

/**
 * Component for "ScrollText" Slices.
 */
const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = asText(slice.primary.text).split(" ");

  useGSAP(
    () => {
      const component = componentRef.current;
      const textElement = textRef.current;
      const contentEmelent = contentRef.current;

      const letters = textElement?.querySelectorAll("span");

      if (!component || !textElement || !contentEmelent || !letters) return;

      // set initial blur and color
      gsap.set(contentEmelent, { filter: "blur(40px)" });
      gsap.set(letters, { color: "hsl(220,9%,20%)" });

      gsap.to(contentEmelent, {
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: component,
          start: "top 74%",
          end: "top top",
          scrub: 2,
        },
      });

      const colortl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom -100%",
          pin: true,
          scrub: 2,
        },
      });

      colortl.to(letters, {
        color: "white",
        stagger: {
          each: 0.05,
          from: "start",
          ease: "power1.inOut",
        },
      });

      colortl.to(
        ".glow-background",
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      );
    },
    { scope: componentRef },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-screen items-center justify-center bg-neutral-950 overflow-x-hidden"
      ref={componentRef}
    >
      <div className="glow-background absolute inset-0 z-0 h-full w-full opacity-0" />

      <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply" />

      <div ref={contentRef}>
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
          {slice.primary.eyebrow}
        </div>
        {/* paragraph */}
        <div ref={textRef} className="text-center">
          <p className="font-display flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase md:text-7xl">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline">
                {word.split("").map((char, charIndex) => (
                  <span key={`${char}-${charIndex}`} className="inline">
                    {char}
                  </span>
                ))}
                {index < words.length - 1 ? (
                  <span className="inline">&nbsp;</span>
                ) : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default ScrollText;
