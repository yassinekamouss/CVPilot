import React from "react";
import Image from "next/image";

export default function BackgroundCVs() {
  return (
    <>
      <div
        className="bg-cv-left absolute -left-12 top-14 pointer-events-none z-10"
        style={{ transform: "rotate(-10deg)", willChange: "transform, opacity, filter" }}
      >
        <div className="w-52 h-[310px] bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-1.5 overflow-hidden">
          <div className="relative w-full h-full rounded-xl overflow-hidden grayscale opacity-70">
            <Image
              src="/cvs/cv3.jpeg"
              alt="CV template example"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 208px, 208px"
            />
          </div>
        </div>
      </div>
      <div
        className="bg-cv-right absolute -right-12 bottom-14 pointer-events-none z-10"
        style={{ transform: "rotate(12deg)", willChange: "transform, opacity, filter" }}
      >
        <div className="w-52 h-[310px] bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-1.5 overflow-hidden">
          <div className="relative w-full h-full rounded-xl overflow-hidden grayscale opacity-70">
            <Image
              src="/cvs/cv9.jpeg"
              alt="CV template example"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 208px, 208px"
            />
          </div>
        </div>
      </div>
    </>
  );
}
