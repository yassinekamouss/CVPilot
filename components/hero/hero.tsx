import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const HeroContent = dynamic(() => import("./hero-content"), {
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-40 pb-24 md:pb-36 px-6 sm:px-8 bg-brand-bg/30">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square rounded-full bg-brand-green/5 blur-[150px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="h-20 bg-brand-navy/5 rounded-lg animate-pulse" />
            <div className="h-6 bg-text-secondary/10 rounded-lg animate-pulse w-3/4" />
            <div className="flex gap-4 pt-2">
              <div className="h-14 bg-brand-navy/10 rounded-full w-48 animate-pulse" />
              <div className="h-14 bg-brand-navy/5 rounded-full w-44 animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-[340px] md:w-[410px] h-[480px] bg-brand-navy/5 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <HeroContent />
    </Suspense>
  );
}
