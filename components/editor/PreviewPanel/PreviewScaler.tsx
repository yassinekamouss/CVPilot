"use client";

import { useRef, useEffect, useState } from "react";

export function PreviewScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      const A4_WIDTH_PX = 794; // px equivalent of 210mm at 96dpi
      const padding = 32; // padding around the scaled page
      
      // Calculate scale ratio based strictly on parent width
      const scaleFactor = (width - padding) / A4_WIDTH_PX;
      
      // Prevent scaling past original scale 1 to maintain crispness
      setScale(Math.min(scaleFactor, 1));
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden p-6 flex justify-center bg-[#F1F5F9] scrollbar-thin"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: "794px",
          minHeight: "1123px",
        }}
        className="flex-shrink-0 shadow-xl transition-all duration-300 bg-white"
      >
        {children}
      </div>
    </div>
  );
}
