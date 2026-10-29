"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AboutData } from '../../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutProps {
  data: AboutData;
  showButton?: boolean;
}

export default function About({ data, showButton }: AboutProps) {
  const pathname = usePathname();
  const shouldShowButton = showButton !== undefined ? showButton : pathname === '/';
  return (
    <section id="about" className="py-8 sm:py-12 lg:py-16 bg-[#0B2942] relative overflow-hidden border-t border-[#29465F]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Content - Image Area */}
          <div className="lg:w-1/2 w-full relative flex justify-center">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="relative w-full max-w-[450px] h-[450px] lg:h-[550px] z-10"
             >
                {/* Golden Decorative Shapes */}
                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D6A23D]/80 rounded-[2rem] md:rounded-[3rem] z-0 shadow-lg" />
                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-48 h-48 md:w-72 md:h-72 bg-[#D6A23D]/80 rounded-[2rem] md:rounded-[3rem] z-0 shadow-lg" />
                
                {/* Image Container with golden border */}
                <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] border-2 border-[#D6A23D] overflow-hidden z-10 shadow-2xl bg-[#071D32]">
                  <img src={data.image || "/img/about.webp"} className="w-full h-full object-cover" alt={data.title_line1 || "About PranaRise"} />
                </div>

                {/* Dots decoration Top Right (3 rows x 4 cols = 12 dots) */}
                <div className="absolute -top-8 right-8 md:-top-12 md:right-16 text-[#D6A23D] grid grid-cols-4 gap-3 z-0 hidden md:grid">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-current opacity-80"></div>
                  ))}
                </div>
                
                {/* Dots decoration Bottom Left (4 rows x 4 cols = 16 dots) */}
                <div className="absolute -bottom-8 left-8 md:-bottom-12 md:left-12 text-[#D6A23D] grid grid-cols-4 gap-3 z-0 hidden md:grid">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-current opacity-80"></div>
                  ))}
                </div>
             </motion.div>
          </div>
          
          {/* Right Content - Text Area */}
          <div className="lg:w-1/2 space-y-5 lg:space-y-7 z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <svg className="w-5 h-5 text-[#D6A23D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21a9 9 0 0 0 9-9c0-3-2-5-5-6-1.5 1-3 3-4 6-1-3-2.5-5-4-6-3 1-5 3-5 6 0 5 4 9 9 9z"></path>
                <path d="M12 12c-2 3-5 5-8 5"></path>
                <path d="M12 12c2 3 5 5 8 5"></path>
              </svg>
              <span className="text-[#D6A23D] tracking-[0.2em] text-[13px] font-semibold uppercase">{data.subtitle}</span>
              <div className="w-16 h-[1.5px] bg-[#D6A23D]"></div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[28px] leading-[1.2] sm:text-4xl lg:text-[3.2rem] font-serif font-medium text-[#F5F7FA] lg:leading-[1.15]"
            >
              {data.title_line1} <br className="hidden lg:block" />
              {data.title_line2} <span className="text-[#D6A23D]">{data.title_highlight}</span> <br className="hidden lg:block" />
              {data.title_line3}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#DCE5EF] text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed font-normal"
            >
              {data.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 pt-2"
            >
              {data.cards.map((card, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-5 items-start group bg-[#123B5D] p-3 sm:p-4 rounded-2xl border border-[#29465F] hover:border-[#D6A23D]/50 transition-all duration-300 shadow-md">
                  <div className="flex-shrink-0 w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-full border-[1.5px] border-[#D6A23D] bg-[#0B2942] flex items-center justify-center text-[#D6A23D] group-hover:bg-[#D6A23D] group-hover:text-[#071D32] transition-all">
                    {idx === 0 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-[26px] h-[26px] sm:w-[34px] sm:h-[34px]" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5.5" r="1.5" />
                        <path d="M11 3.5h2" />
                        <path d="M12 8.5v4" />
                        <path d="M10.5 9.5l1.5 2.5l1.5-2.5" />
                        <path d="M12 7.5c-2 0-3.5 1.5-4 4l1 2" />
                        <path d="M12 7.5c2 0 3.5 1.5 4 4l-1 2" />
                        <path d="M7 15.5c-2 0-3 1-3 2.5s2 2.5 4 2.5c3 0 4-2 4-2s1 2 4 2c2 0 4-1 4-2.5S19 15.5 17 15.5c-3 0-5 3-5 3s-2-3-5-3z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-[26px] h-[26px] sm:w-[34px] sm:h-[34px]" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="13" cy="6" r="1.5" />
                        <path d="M11.5 4.5a1 1 0 0 1 0-1.5" />
                        <path d="M13 8.5c-1.5 2.5-2.5 5.5-1 8.5" />
                        <path d="M11 9.5c-1 2.5-1 4.5 0 6.5" />
                        <path d="M13.5 9.5l3.5 5l1 3.5" />
                        <path d="M12 10.5l-4 3.5l-2.5 1" />
                        <path d="M5.5 15c0 0 4 3 7 4c2.5 1 4 0 5-1" />
                        <path d="M12 17c-2.5-1-4-3-6.5-2c-1.5 0.5-2 1.5-1 2.5c1.5 1.5 5 2.5 7.5 2.5" />
                      </svg>
                    )}
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#F5F7FA] mb-1 sm:mb-1.5">{card.title}</h3>
                    <p className="text-[#A9BBCB] leading-relaxed text-[13px] sm:text-[15px]">{card.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {shouldShowButton && data.button && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-2 sm:pt-1"
              >
                 <Link href={data.button.href || "#services"} className="inline-flex items-center gap-2.5 bg-[#D6A23D] hover:bg-[#c49232] text-[#071D32] px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-[14px] sm:text-[15px] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_18px_rgba(214,162,61,0.3)]">
                    {data.button.text}
                    <ArrowRight className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                 </Link>
              </motion.div>
            )}
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
