"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PackagesSectionData } from '../../types';

interface PackagesProps {
  data: PackagesSectionData;
}

export default function Packages({ data }: PackagesProps) {
  if (!data) return null;

  return (
    <section id="packages" className="py-8 sm:py-12 lg:py-16 bg-[#0B2942] relative overflow-hidden border-t border-[#29465F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-7 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4"
          >
            <span className="h-[1.5px] w-10 sm:w-14 bg-[#D6A23D]"></span>
            <span className="text-[#D6A23D] text-xs sm:text-[13px] tracking-[0.25em] font-semibold uppercase">
              {data.subtitle}
            </span>
            <span className="h-[1.5px] w-10 sm:w-14 bg-[#D6A23D]"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight text-center leading-tight mb-3"
          >
            <span className="text-[#F5F7FA]">{data.title_line1}</span>
            <span className="text-[#D6A23D] ml-2 sm:ml-3">
              {data.title_highlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#DCE5EF] text-xs sm:text-sm md:text-[15px] max-w-xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4">
          {data.items?.map((item, idx) => {
            const isPopular = item.is_popular;
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
                  isPopular
                    ? 'border-2 border-[#D6A23D] bg-[#123B5D] shadow-[0_0_25px_rgba(214,162,61,0.25)]'
                    : 'border border-[#29465F] bg-[#123B5D] hover:border-[#D6A23D]/60 shadow-lg'
                }`}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 bg-[#D6A23D] text-[#071D32] text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                    {item.badge || 'Most Popular'}
                  </div>
                )}

                {/* Image Container - Flush with Top, Left, and Right */}
                <div className="relative w-full h-32 xs:h-36 sm:h-44 lg:h-48 overflow-hidden bg-[#071D32] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Content with Padding */}
                <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title & Subtitle */}
                    <h3 className="text-[#F5F7FA] font-bold text-xs sm:text-sm lg:text-base mb-0.5 leading-snug line-clamp-1 font-serif">
                      {item.title}
                    </h3>
                    <p className="text-[#A9BBCB] text-[10px] sm:text-xs mb-2.5 sm:mb-3 line-clamp-1 sm:line-clamp-2 min-h-0 sm:min-h-[28px] leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Checklist Features */}
                    <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                      {item.features?.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-1.5 sm:gap-2 text-[#DCE5EF] text-[10.5px] sm:text-xs"
                        >
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0B2942] border border-[#29465F] text-[#D6A23D] flex items-center justify-center shrink-0">
                            <svg
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-current stroke-[2.5]"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="leading-tight truncate sm:whitespace-normal">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer: Price & CTA Button */}
                  <div className="pt-2.5 sm:pt-3 border-t border-[#29465F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 mt-auto">
                    <div className="flex items-baseline shrink-0">
                      <span className="text-[#F5F7FA] font-bold text-sm sm:text-base lg:text-xl tracking-tight">
                        {item.price}
                      </span>
                      <span className="text-[#A9BBCB] text-[10px] sm:text-xs ml-1 font-normal whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>

                    <Link
                      href={item.button_link && item.button_link !== '#' ? item.button_link : '#contact'}
                      className="w-full sm:w-auto justify-center bg-[#D6A23D] hover:bg-[#E8C875] text-[#071D32] font-bold text-[10.5px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 transition-all shadow-md hover:shadow-[#D6A23D]/30 active:scale-95 shrink-0"
                    >
                      <span>{item.button_text || 'Book Now'}</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#071D32]/20 flex items-center justify-center text-[9px]">
                        ➔
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
