"use client";

import { useState, useEffect } from "react";
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

export default function PhotoCarousel({ height = "h-[140px]" }: { height?: string }) {
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % groups.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mb-4 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" as const }}
          className="grid grid-cols-3 gap-2"
        >
          {groups[currentGroup].map((photo, i) => (
            <div key={`${currentGroup}-${i}`} className={`relative ${height} rounded-lg overflow-hidden`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={85}
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {groups.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentGroup(i)}
            className={`w-1.5 h-1.5 rounded-full border-0 cursor-pointer transition-all ${
              i === currentGroup
                ? "bg-white/70 w-4"
                : "bg-white/25"
            }`}
            aria-label={`Groupe de photos ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
