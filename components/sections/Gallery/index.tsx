"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GallerySectionData } from '../../types';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GalleryProps {
  data: GallerySectionData;
}

const getGalleryImagePath = (imgSrc?: string, fallbackIdx: number = 0): string => {
  if (!imgSrc) return `/gallery/${(fallbackIdx % 12) + 1}.webp`;
  if (imgSrc.startsWith('/gallery/')) return imgSrc;
  if (imgSrc.startsWith('gallery/')) return `/${imgSrc}`;
  if (imgSrc.startsWith('/')) return imgSrc;
  return `/gallery/${imgSrc}`;
};

export default function Gallery({ data }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const displayedItems = data?.items || [];

  const handlePrevImage = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === 0 ? displayedItems.length - 1 : prev! - 1));
  }, [selectedIndex, displayedItems.length]);

  const handleNextImage = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === displayedItems.length - 1 ? 0 : prev! + 1));
  }, [selectedIndex, displayedItems.length]);

  const handleCloseModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation for popup
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrevImage, handleNextImage, handleCloseModal]);

  if (!data) return null;

  const currentPhoto = selectedIndex !== null ? displayedItems[selectedIndex] : null;

  // Stagger motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="gallery" className="py-8 sm:py-12 lg:py-16 bg-[#0B2942] relative overflow-hidden border-t border-[#29465F]">
      <div className="container mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header with reduced top/bottom spacing */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2.5 sm:gap-4 mb-2 sm:mb-2.5"
          >
            <span className="h-[1.5px] w-8 sm:w-12 bg-[#D6A23D]"></span>
            <span className="text-[#D6A23D] text-[11px] sm:text-[13px] tracking-[0.25em] font-semibold uppercase font-sans">
              {data.subtitle}
            </span>
            <span className="h-[1.5px] w-8 sm:w-12 bg-[#D6A23D]"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-center leading-tight mb-2"
          >
            <span className="text-[#F5F7FA]">{data.title_line1}</span>
            <span className="text-[#D6A23D] ml-2 sm:ml-2.5">
              {data.title_highlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-[#DCE5EF] text-[11.5px] sm:text-sm max-w-xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>
        </div>

        {/* Gallery Grid: 2 columns on Mobile, 4 columns on Tablet/Desktop, with reduced gap */}
        <motion.div
          key="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4"
        >
          {displayedItems.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#123B5D] border border-[#29465F] hover:border-[#D6A23D] transition-colors duration-300 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(214,162,61,0.25)]"
            >
              <Image
                src={getGalleryImagePath(item.image, idx)}
                alt={item.title || `PranaRise moment ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              />

              {/* Overlay with subtle gold sheen and title */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071D32]/95 via-[#071D32]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-2.5 sm:p-3.5">
                <div className="self-end">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0B2942]/90 text-[#D6A23D] flex items-center justify-center backdrop-blur-sm shadow border border-[#29465F]">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
                <div>
                  <span className="text-[#D6A23D] text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-wider block mb-0.5">
                    View
                  </span>
                  <span className="text-[#F5F7FA] text-xs sm:text-[13px] font-semibold truncate block drop-shadow-md">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox Modal with Next & Prev Navigation */}
      <AnimatePresence>
        {selectedIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-[#071D32]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              aria-label="Close Preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 text-[#F5F7FA] hover:text-white bg-[#0B2942] hover:bg-red-500/80 p-2 sm:p-2.5 rounded-full transition-all border border-[#29465F] cursor-pointer active:scale-95 shadow-lg"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev Image Button in Popup */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Previous Image"
              className="absolute left-2.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0B2942]/90 hover:bg-[#D6A23D] text-[#F5F7FA] hover:text-[#071D32] border border-[#29465F] hover:border-[#D6A23D] flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Next Image Button in Popup */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Next Image"
              className="absolute right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0B2942]/90 hover:bg-[#D6A23D] text-[#F5F7FA] hover:text-[#071D32] border border-[#29465F] hover:border-[#D6A23D] flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Image Container with AnimatePresence */}
            <motion.div
              key={currentPhoto.id || selectedIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[80vh] aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#29465F] shadow-2xl bg-[#0B2942]"
            >
              <Image
                src={getGalleryImagePath(currentPhoto.image, selectedIndex ?? 0)}
                alt={currentPhoto.title || 'PranaRise photo preview'}
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Title & Counter Badge at Bottom */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0B2942]/95 border border-[#29465F] text-[#F5F7FA] text-[11px] sm:text-sm font-medium flex items-center gap-2.5 sm:gap-3 backdrop-blur-md shadow-lg"
            >
              <span className="truncate max-w-[150px] sm:max-w-xs">{currentPhoto.title}</span>
              <span className="text-[#D6A23D] font-semibold border-l border-[#29465F] pl-2.5 sm:pl-3">
                {selectedIndex + 1} / {displayedItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
