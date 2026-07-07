"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".reveal-word");
    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.02,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 65%",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className="inline">
      {text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block mr-1 transition-opacity duration-350">
          {word}
        </span>
      ))}
    </span>
  );
}
