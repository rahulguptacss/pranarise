"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Heart, Wind, Zap, Flame, Brain, Dumbbell } from 'lucide-react';
import { WhyChooseUsData } from '../../types';

function MeditationIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="6.2" r="2.2" />
      <path d="M12 9.2v4.6" />
      <path d="M9.8 10.5C8 11.2 7 13 7 15.5c0 1.8 1.2 2.5 2.5 2.5" />
      <path d="M14.2 10.5c1.8 0.7 2.8 2.5 2.8 5 0 1.8-1.2 2.5-2.5 2.5" />
      <path d="M12 18.2c-3.2 0-6.2-.4-6.2-1.9 0-1.5 3-1.9 6.2-1.2" />
      <path d="M12 18.2c3.2 0 6.2-.4 6.2-1.9 0-1.5-3-1.9-6.2-1.2" />
    </svg>
  );
}

function renderFeatureIcon(iconName: string) {
  switch (iconName?.toLowerCase()) {
    case 'flower2':
    case 'lotus':
      return <Flower2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'heart':
      return <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'wind':
      return <Wind className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'zap':
      return <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'flame':
      return <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'brain':
      return <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'dumbbell':
      return <Dumbbell className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeWidth={1.8} />;
    case 'meditation':
    default:
      return <MeditationIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#D6A23D]" />;
  }
}

export interface WhyChooseUsProps {
  data?: WhyChooseUsData;
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const subtitle = data?.subtitle || "WHY CHOOSE PRANARISE";
  const title1 = data?.title_line1 || "Excellence in ";
  const title2 = data?.title_line2 || "Yoga & Mindful Movement";
  const desc = data?.description || "At PranaRise - Yoga & Fitness, we combine authentic yogic lineages with innovative fitness training to create an empowering lifestyle.";
  const centerImage = data?.center_image || "/img/why-us.webp";

  const leftItems = data?.left_features || [];
  const rightItems = data?.right_features || [];

  return (
    <section id="why-us" className="py-8 sm:py-12 lg:py-16 bg-[#071D32] relative overflow-hidden border-t border-[#29465F]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-[1.5px] bg-[#D6A23D]"></div>
            <span className="text-[#D6A23D] tracking-[0.2em] text-[13px] font-semibold uppercase">
              {subtitle}
            </span>
            <div className="w-12 h-[1.5px] bg-[#D6A23D]"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3 leading-tight">
            <span className="text-[#F5F7FA]">{title1}</span>
            <span className="text-[#D6A23D]">{title2}</span>
          </h2>
          <p className="text-[#DCE5EF] text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
            {desc}
          </p>
        </motion.div>

        {/* Features Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative">
          
          {/* Central Glow / Highlight Behind Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#D6A23D]/15 blur-[100px] rounded-full pointer-events-none z-0"></div>

          {/* Left Column */}
          <div className="w-full lg:w-[31%] flex flex-col gap-4 z-10">
            {leftItems.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl border border-[#29465F] bg-[#123B5D] hover:border-[#D6A23D]/60 hover:bg-[#123B5D]/90 transition-all duration-300 shadow-md group"
              >
                {/* Circular Icon with golden border & inner radial glow */}
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#D6A23D] flex items-center justify-center shrink-0 relative shadow-[0_0_15px_rgba(214,162,61,0.2)] group-hover:border-[#E8C875] group-hover:shadow-[0_0_20px_rgba(214,162,61,0.35)] transition-all"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(214, 162, 61, 0.3) 0%, rgba(18, 59, 93, 0.9) 65%, #0B2942 100%)'
                  }}
                >
                  {renderFeatureIcon(feature.icon)}
                </div>

                {/* Golden Vertical Divider Line */}
                <div className="w-[1.5px] h-10 sm:h-11 bg-[#D6A23D] shrink-0"></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-[#F5F7FA] text-[16px] sm:text-[17px] leading-tight mb-1 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-[#A9BBCB] text-[13px] sm:text-[14px] leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[34%] flex justify-center z-10 relative my-6 lg:my-0"
          >
            <div className="relative w-full max-w-[400px] aspect-[3/4]">
              {/* Stylized rings behind the image */}
              <div className="absolute inset-0 border-[1px] border-[#D6A23D]/30 rounded-full scale-90 opacity-50"></div>
              <div className="absolute inset-0 border-[1px] border-[#D6A23D]/20 rounded-full scale-105 opacity-50"></div>
              
              <img 
                src={centerImage} 
                alt={title1} 
                className="w-full h-full object-cover object-center rounded-[3rem] shadow-2xl relative z-10 border-2 border-[#29465F]"
              />
              
              {/* Gradient overlay at bottom to blend into background */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#071D32] to-transparent z-20"></div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="w-full lg:w-[31%] flex flex-col gap-4 z-10">
            {rightItems.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl border border-[#29465F] bg-[#123B5D] hover:border-[#D6A23D]/60 hover:bg-[#123B5D]/90 transition-all duration-300 shadow-md group"
              >
                {/* Circular Icon with golden border & inner radial glow */}
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#D6A23D] flex items-center justify-center shrink-0 relative shadow-[0_0_15px_rgba(214,162,61,0.2)] group-hover:border-[#E8C875] group-hover:shadow-[0_0_20px_rgba(214,162,61,0.35)] transition-all"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(214, 162, 61, 0.3) 0%, rgba(18, 59, 93, 0.9) 65%, #0B2942 100%)'
                  }}
                >
                  {renderFeatureIcon(feature.icon)}
                </div>

                {/* Golden Vertical Divider Line */}
                <div className="w-[1.5px] h-10 sm:h-11 bg-[#D6A23D] shrink-0"></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-[#F5F7FA] text-[16px] sm:text-[17px] leading-tight mb-1 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-[#A9BBCB] text-[13px] sm:text-[14px] leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
