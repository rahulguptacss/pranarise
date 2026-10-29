"use client";

import React, { useEffect, useState, useRef } from 'react';
import { StatsData } from '../../types';
import { motion, useInView } from 'framer-motion';

interface StatsProps {
  data: StatsData;
}

function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const endNum = parseInt(value) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView && endNum > 0) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = endNum / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endNum) {
          setCount(endNum);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, endNum]);

  return <span ref={ref}>{endNum > 0 ? count : value}{suffix}</span>;
}

export default function Stats({ data }: StatsProps) {
  return (
    <section className="py-6 sm:py-8 bg-[#0B2942] border-y border-[#29465F]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 items-center md:gap-0">
          {data.items.map((stat, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx} 
              className={`flex flex-col xl:flex-row items-center gap-3 xl:gap-4 w-full justify-center 
                ${idx !== 0 ? 'md:border-l md:border-[#29465F] md:pl-4 lg:pl-6' : ''}
                ${(idx === 0 || idx === 1) ? 'border-b border-[#29465F] pb-6 mb-6 md:border-b-0 md:pb-0 md:mb-0' : ''}
                ${(idx === 0 || idx === 2) ? 'border-r border-[#29465F] pr-2 md:border-r-0 md:pr-0' : 'pl-2 md:pl-0'}
              `}
            >
              <div className="text-[#D6A23D] shrink-0">
                {idx === 0 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[45px] h-[45px] md:w-[55px] md:h-[55px]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7c-1.5-1.5-4-1.5-5.5 0a3.5 3.5 0 0 0 0 5L12 17l5.5-5a3.5 3.5 0 0 0 0-5C16 5.5 13.5 5.5 12 7z" />
                    <circle cx="7" cy="14" r="2" />
                    <path d="M4 21c0-2 2-4 3-4" />
                    <circle cx="17" cy="14" r="2" />
                    <path d="M20 21c0-2-2-4-3-4" />
                    <circle cx="12" cy="12" r="2.5" />
                    <path d="M8 21c0-3 2-5 4-5s4 2 4 5" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[45px] h-[45px] md:w-[55px] md:h-[55px]" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5.5" r="2" />
                    <path d="M12 7.5v5" />
                    <path d="M12 8c-2 0-3.5 1.5-4 4" />
                    <path d="M12 8c2 0 3.5 1.5 4 4" />
                    <path d="M7 16c-2 0-3 1-3 2.5s2 2.5 4 2.5c3 0 4-2 4-2s1 2 4 2c2 0 4-1 4-2.5S17 16 15 16c-3 0-5 3-5 3s-2-3-5-3z" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[45px] h-[45px] md:w-[55px] md:h-[55px]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21c2 0 8-3 9-8c0-3-2-5-2-5c-2 2-4 5-7 13" />
                    <path d="M12 21c-2 0-8-3-9-8c0-3 2-5 2-5c2 2 4 5 7 13" />
                    <path d="M12 21c1-2 5-6 5-11c0-2-1-4-1-4c-2 2-3 6-4 15" />
                    <path d="M12 21c-1-2-5-6-5-11c0-2 1-4 1-4c2 2 3 6 4 15" />
                    <path d="M12 21v-15" />
                  </svg>
                )}
                {idx === 3 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[45px] h-[45px] md:w-[55px] md:h-[55px]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7c0 6 6 7 6 7s6-1 6-7V2z" />
                    <polygon points="12 5.5 13.5 8 16.5 8.5 14 10.5 14.5 13.5 12 12 9.5 13.5 10 10.5 7.5 8.5 10.5 8" />
                  </svg>
                )}
              </div>
              <div className="text-center xl:text-left">
                <h3 className="text-[2rem] sm:text-4xl lg:text-[3.2rem] font-bold text-[#F5F7FA] mb-1 leading-tight font-serif">
                  <Counter value={stat.value} />
                </h3>
                <p className="text-[#E8C875] font-semibold text-sm lg:text-[15px]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
