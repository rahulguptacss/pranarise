'use client';
import React, { useRef, useEffect, useState } from 'react';
import { TestimonialsData } from '../../types';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialsProps {
  data: TestimonialsData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth / 4;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth / 4;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-slide effect for infinity loop
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const scrollAmount = clientWidth / 4;
        
        // If reached near the end, snap back to start silently to create infinite effect
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'auto' });
          // Then smoothly scroll to next item
          setTimeout(() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
          }, 50);
        } else {
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000); // auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // Duplicate reviews for infinite scrolling effect
  const displayReviews = [...data.reviews, ...data.reviews, ...data.reviews];

  return (
    <section id="testimonials" className="py-5 sm:py-7 lg:py-8 bg-[#0B2942] relative overflow-hidden border-t border-[#29465F]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
             <div className="w-16 h-[1px] bg-[#D6A23D]"></div>
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-[#D6A23D]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21c2 0 8-3 9-8c0-3-2-5-2-5c-2 2-4 5-7 13" />
                <path d="M12 21c-2 0-8-3-9-8c0-3 2-5 2-5c2 2 4 5 7 13" />
                <path d="M12 21c1-2 5-6 5-11c0-2-1-4-1-4c-2 2-3 6-4 15" />
                <path d="M12 21c-1-2-5-6-5-11c0-2 1-4 1-4c2 2 3 6 4 15" />
                <path d="M12 21v-15" />
             </svg>
             <div className="w-16 h-[1px] bg-[#D6A23D]"></div>
          </div>
          
          <h2 className="text-4xl md:text-4xl font-bold mb-3 tracking-wide uppercase">
            {data.subtitle.split(' ').map((word, i, arr) => (
              <span key={i} className={i === arr.length - 1 ? "text-[#D6A23D]" : "text-[#F5F7FA]"}>
                {word}{i !== arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p className="text-[#A9BBCB] text-[14px] lg:text-[15px]">
            {data.title}
          </p>
        </motion.div>
        
        {/* Testimonials Slider */}
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-[#123B5D] p-5 rounded-2xl border border-[#29465F] relative w-full sm:w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)] flex-shrink-0 snap-start hover:border-[#D6A23D]/60 transition-all flex flex-col shadow-md"
            >
              <div className="mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#D6A23D] fill-current">
                   <path d="M10.333 13.924C10.333 17.653 7.828 20 4.636 20C2.071 20 0 18.067 0 15.656C0 13.433 1.616 11.666 3.737 11.666C3.939 11.666 4.04.167 4.141.167C4.141 11.362 2.525 7.643 6.061 4H8.485C6.061 7.234 10.333 9.429 10.333 13.924ZM24 13.924C24 17.653 21.495 20 18.303 20C15.737 20 13.667 18.067 13.667 15.656C13.667 13.433 15.283 11.666 17.404 11.666C17.606 11.666 17.707.167 17.808.167C17.808 11.362 16.192 7.643 19.727 4H22.152C19.727 7.234 24 9.429 24 13.924Z" />
                </svg>
              </div>
              
              <p className="text-[#DCE5EF] text-[13px] leading-relaxed flex-grow">
                {review.text}
              </p>
              
              {/* Divider */}
              <div className="w-10 h-[2px] bg-[#D6A23D] mt-4 mb-3"></div>
              
              <div className="flex text-[#D6A23D] mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#D6A23D] overflow-hidden flex-shrink-0">
                   <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[#F5F7FA] font-bold text-[14px] leading-tight">{review.author}</h4>
                  <div className="text-[12px] mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[#D6A23D] font-medium">{review.role}</span>
                    <span className="text-[#29465F] font-bold">•</span>
                    <span className="text-[#A9BBCB]">{review.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-[#29465F] bg-[#071D32] flex items-center justify-center text-[#F5F7FA] hover:bg-[#D6A23D] hover:text-[#071D32] hover:border-transparent transition-all shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-[#29465F] bg-[#071D32] flex items-center justify-center text-[#F5F7FA] hover:bg-[#D6A23D] hover:text-[#071D32] hover:border-transparent transition-all shadow-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
