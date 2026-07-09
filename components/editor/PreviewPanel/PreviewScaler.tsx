"use client";

import { useRef, useEffect, useState } from "react";

export function PreviewScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const A4_W = 794; // px equivalent of 210mm at 96dpi
      const A4_H = 1123; // px equivalent of 297mm at 96dpi
      const padding = 32;
      const scaleX = (width - padding) / A4_W;
      const scaleY = (height - padding) / A4_H;
      setScale(Math.min(scaleX, scaleY, 1)); // don't scale up past original size
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden p-4">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: "794px",
          height: "1123px",
        }}
        className="flex-shrink-0 shadow-lg transition-transform duration-200"
      >
        {children}
      </div>
    </div>
  );
}
