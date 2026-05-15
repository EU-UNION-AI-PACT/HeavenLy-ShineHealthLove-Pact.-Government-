"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style = {},
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const transforms: Record<string, string> = {
      up:    "translateY(30px)",
      down:  "translateY(-30px)",
      left:  "translateX(30px)",
      right: "translateX(-30px)",
      none:  "none",
    };

    el.style.opacity = "0";
    el.style.transform = transforms[direction];
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
