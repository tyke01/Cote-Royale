"use client";

import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface RevealTextProps {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "start" | "center" | "end";
}

export const RevealText = ({
  field,
  id,
  className,
  staggerAmount = 0.1,
  as: Component = "div",
  duration = 0.8,
  align = "start",
}: RevealTextProps) => {
  const words = asText(field).split(" ");

  const componentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: 0,
          duration: 0.5,
          opacity: 1,
          ease: "none",
        });
      });
    },
    { scope: componentRef },
  );

  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "start" && "text-left",
        align === "center" && "text-center",
        align === "end" && "text-right",
        className,
      )}
      ref={componentRef}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}-${id}`}
          className={`mb-0 inline-block overflow-hidden pb-4`}
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
            {index < words.length - 1 ? (
              <>&nbsp;</>
            ) : null}
          </span>
        </span>
      ))}
    </Component>
  );
};
