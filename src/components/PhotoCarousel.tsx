"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const allPhotos = [
  { src: "/images/intervention-chantier.jpg", alt: "Technicien CITA en intervention sur chantier à La Réunion" },
  { src: "/images/intervention-autocollant.jpg", alt: "Pose d'un autocollant Protégé par CITA" },
  { src: "/images/vehicule-cita.jpg", alt: "Véhicule CITA — Notre proximité, votre sécurité" },
  { src: "/images/intervention-technicien.jpg", alt: "Technicien CITA posant un autocollant de protection" },
  { src: "/images/intervention-showroom.jpg", alt: "Showroom CITA — portiques antivol et équipements" },
  { src: "/images/intervention-portail.jpg", alt: "Véhicule CITA devant un portail client" },
  { src: "/images/intervention-vehicule-agricole.jpg", alt: "Véhicule CITA sur site agricole à La Réunion" },
  { src: "/images/intervention-salle.jpg", alt: "Véhicule CITA devant une salle équipée de caméras" },
];

// Group photos in sets of 3
const groups: typeof allPhotos[] = [];
for (let i = 0; i < allPhotos.length; i += 3) {
  groups.push(allPhotos.slice(i, i + 3));
}
// Pad last group if needed
while (groups[groups.length - 1].length < 3) {
  groups[groups.length - 1].push(allPhotos[groups[groups.length - 1].length]);
}

const containerVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.08,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const photoVariants = {
  enter: {
    opacity: 0,
    y: 20,
    scale: 0.92,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.96,
    transition: {
      duration: 0.3,
    },
  },
};

export default function PhotoCarousel({ height = "h-[140px]" }: { height?: string }) {
  const [[currentGroup, direction], setPage] = useState([0, 1]);

  const paginate = useCallback((newDirection: number) => {
    setPage(([prev]) => {
      const next = (prev + newDirection + groups.length) % groups.length;
      return [next, newDirection];
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <div className="relative mb-4 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentGroup}
          custom={direction}
          variants={containerVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="grid grid-cols-3 gap-2"
        >
          {groups[currentGroup].map((photo, i) => (
            <motion.div
              key={`${currentGroup}-${i}`}
              variants={photoVariants}
              className={`relative ${height} rounded-lg overflow-hidden group cursor-pointer`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={85}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar + dots */}
      <div className="flex justify-center items-center gap-2 mt-3">
        {groups.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > currentGroup ? 1 : -1])}
            className="relative h-1.5 rounded-full border-0 cursor-pointer overflow-hidden transition-all"
            style={{ width: i === currentGroup ? 28 : 6, backgroundColor: i === currentGroup ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.25)" }}
            aria-label={`Groupe de photos ${i + 1}`}
          >
            {i === currentGroup && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-white/70 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={`progress-${currentGroup}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
