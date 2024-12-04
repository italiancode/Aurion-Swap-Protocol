"use client";

import { useEffect, useState } from "react";

export const BackgroundEffects = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79,195,247,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79,195,247,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
        }}
      />

      {/* Finer Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79,195,247,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79,195,247,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
        }}
      />

      {/* Corner Grid Patterns */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79,195,247,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79,195,247,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
      </div>

      <div className="absolute top-0 right-0 w-[300px] h-[300px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79,195,247,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79,195,247,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-[300px] h-[300px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79,195,247,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79,195,247,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            clipPath: "polygon(0 0, 0 100%, 100% 100%)",
          }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79,195,247,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79,195,247,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
          }}
        />
      </div>

      {/* Background orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(30,136,229,0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full animate-float-delayed"
        style={{
          background:
            "radial-gradient(circle, rgba(79,195,247,0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, #0f1922 70%)",
          opacity: 0.9,
        }}
      />
    </div>
  );
};
