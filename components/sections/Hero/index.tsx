"use client";

import Link from 'next/link';
import { HeroData } from '../../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  // Format subtitle to match screenshot spacing (replace + with bullet)
  const formattedSubtitle = data.subtitle.replace(/\+/g, '•');

  return (
    <section id="home" className="relative pt-8 pb-8 lg:pt-12 lg:pb-12 bg-[#071D32] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-4 lg:pr-8 z-10 w-full flex flex-col items-start text-left">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#D6A23D] tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase"
            >
              {formattedSubtitle}
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-[#F5F7FA] leading-[1.1] tracking-tight font-serif"
            >
              {data.title_line1} <br />
              {data.title_line2} <span className="text-[#D6A23D]">{data.title_highlight}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#DCE5EF] text-sm sm:text-lg lg:text-[1.15rem] max-w-[500px] leading-relaxed font-normal"
            >
              {data.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-row items-center gap-3 sm:gap-6 pt-2 w-full"
            >
              <Link href={data.primary_button.href} className="flex items-center gap-2 sm:gap-5 bg-[#D6A23D] hover:bg-[#c49232] text-[#071D32] pl-4 sm:pl-8 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 group w-fit whitespace-nowrap shadow-[0_4px_18px_rgba(214,162,61,0.35)]">
                <span className="text-xs sm:text-[1.05rem]">{data.primary_button.text}</span>
                <div className="bg-[#071D32] group-hover:bg-[#0B2942] transition-colors text-[#D6A23D] rounded-full p-2 sm:p-2.5 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
              </Link>
            </motion.div>
            
          </div>
          
          {/* Right Content - Video */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mt-2 md:mt-6 lg:mt-0 relative">
            <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[480px]">
              {/* Golden Decorative Shapes */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="absolute -top-4 -left-4 md:-top-8 md:-left-8 w-48 h-48 md:w-64 md:h-64 bg-[#D6A23D]/80 rounded-[2rem] md:rounded-[3rem] z-0 shadow-lg" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-48 h-48 md:w-64 md:h-64 bg-[#D6A23D]/80 rounded-[2rem] md:rounded-[3rem] z-0 shadow-lg" 
              />
              
              {/* Video Container */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="relative w-full h-full rounded-[2rem] overflow-hidden border-[6px] md:border-[8px] border-[#29465F] shadow-2xl bg-[#0B2942] z-10"
              >
                <video 
                  src={data.video || "/video/bannervideo.mp4"} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
