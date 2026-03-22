"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { num: 35, suffix: "+", label: "Années d'expérience", isCounter: true },
  { num: 0, display: "24/7", suffix: "", label: "Télésurveillance permanente", isCounter: false },
  { num: 5, suffix: "", label: "Agences outre-mer", isCounter: true },
  { num: 2, suffix: "", label: "Agences de proximité", isCounter: true },
];

function StatItem({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const shouldReduceMotion = useReducedMotion();
  const count = useCountUp(stat.num, 1800, isInView);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.85, filter: "blur(8px)" }}
      animate={
        shouldReduceMotion
          ? undefined
          : isInView
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, y: 40, scale: 0.85, filter: "blur(8px)" }
      }
      transition={{
        delay: index * 0.18,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      <div className="px-7 py-9 border-r border-white/[.07] last:border-0 transition-colors hover:bg-white/[.04] max-md:border-b max-md:border-white/[.07]">
        <div className="font-heading text-[44px] font-extrabold text-white leading-none tracking-[-1.5px]">
          {stat.isCounter ? (
            <>
              <span className="text-red">{isInView ? count : stat.num}</span>
              {stat.suffix}
            </>
          ) : (
            <motion.span
              initial={shouldReduceMotion ? undefined : { opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : isInView
                    ? { opacity: 1 }
                    : { opacity: 0 }
              }
              transition={{ delay: index * 0.18 + 0.3, duration: 0.5 }}
            >
              {stat.display}
            </motion.span>
          )}
        </div>
        <motion.div
          className="text-xs text-white/35 mt-2"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={
            shouldReduceMotion
              ? undefined
              : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
          }
          transition={{
            delay: index * 0.18 + 0.25,
            duration: 0.5,
            ease: "easeOut" as const,
          }}
        >
          {stat.label}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <div className="bg-navy overflow-hidden">
      <div className="max-w-[1180px] mx-auto grid grid-cols-4 border-l border-r border-white/[.07] max-md:grid-cols-2">
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} />
        ))}
      </div>
    </div>
  );
}
