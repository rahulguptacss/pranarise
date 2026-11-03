'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TeamData } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface TeamProps {
  data: TeamData;
  showButton?: boolean;
  limit?: number;
}

const icons: Record<string, IconType> = { 
  Facebook: FaFacebookF, 
  Instagram: FaInstagram,
  Twitter: FaXTwitter,
  Linkedin: FaLinkedinIn, 
  Youtube: FaYoutube 
};

export default function Team({ data, showButton = false, limit }: TeamProps) {
  if (!data) return null;

  const membersToDisplay = limit && limit > 0 ? data.members?.slice(0, limit) : data.members;

  return (
    <section id="team" className="py-8 sm:py-12 lg:py-16 bg-[#071D32] relative overflow-hidden border-t border-[#29465F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          {/* Subtle Lotus with Gold Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
             <div className="w-12 sm:w-16 h-[1.5px] bg-[#D6A23D]"></div>
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6A23D]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21c2 0 8-3 9-8c0-3-2-5-2-5c-2 2-4 5-7 13" />
                <path d="M12 21c-2 0-8-3-9-8c0-3 2-5 2-5c2 2 4 5 7 13" />
                <path d="M12 21c1-2 5-6 5-11c0-2-1-4-1-4c-2 2-3 6-4 15" />
                <path d="M12 21c-1-2-5-6-5-11c0-2 1-4 1-4c2 2 3 6 4 15" />
                <path d="M12 21v-15" />
             </svg>
             <div className="w-12 sm:w-16 h-[1.5px] bg-[#D6A23D]"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold mb-3 tracking-wide uppercase font-serif">
            <span className="text-[#F5F7FA]">OUR </span>
            <span className="text-[#D6A23D]">THERAPISTS</span>
          </h2>
          <p className="text-[#A9BBCB] text-xs sm:text-sm md:text-[14.5px] max-w-2xl mx-auto leading-relaxed">
            {data.title}
          </p>
        </motion.div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {membersToDisplay?.map((member, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              key={idx} 
              className="bg-[#123B5D] rounded-[22px] sm:rounded-[24px] overflow-hidden border border-[#29465F] hover:border-[#D6A23D]/60 transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(214,162,61,0.2)] flex flex-col justify-between"
            >
              
              {/* Image with padding inside card */}
              <div className="p-3 sm:p-3.5 pb-0">
                <div className="h-[250px] xs:h-[270px] sm:h-[215px] w-full rounded-2xl overflow-hidden relative bg-[#071D32]">
                   <Image 
                     src={member.image} 
                     alt={member.name} 
                     fill
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                     className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                   />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-5 pt-3.5 sm:pt-4 text-center flex flex-col items-center flex-1 justify-between">
                <div>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#F5F7FA] mb-0.5 tracking-tight font-serif">
                    {member.name}
                  </h3>
                  <p className="text-[#D6A23D] text-xs sm:text-[12.5px] font-medium tracking-wide mb-2.5">
                    {member.role}
                  </p>
                  
                  {/* Small Divider */}
                  <div className="w-8 h-[1px] bg-[#D6A23D]/50 mb-2.5 mx-auto"></div>
                  
                  <p className="text-[#A9BBCB] text-xs sm:text-[12px] leading-relaxed mb-4 text-center max-w-[240px] mx-auto">
                    {member.description}
                  </p>
                </div>
                
                {/* Social Icons */}
                <div className="flex items-center gap-2.5 justify-center mt-auto pb-1">
                  {member.socials?.map((social, sidx) => {
                    const SocialIcon = icons[social.icon] || FaFacebookF;
                    return (
                      <Link 
                        key={sidx} 
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#29465F] bg-[#0B2942] hover:border-[#D6A23D] flex items-center justify-center text-[#DCE5EF] hover:text-[#071D32] hover:bg-[#D6A23D] transition-colors"
                      >
                        <SocialIcon className="w-3.5 h-3.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Button */}
        {showButton && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 sm:mt-10 lg:mt-12 flex justify-center text-center"
          >
             <Link 
               href={data.button?.href && data.button.href !== '#' ? data.button.href : '#appointment'} 
               className="inline-flex items-center justify-center bg-[#D6A23D] hover:bg-[#c49232] text-[#071D32] pl-7 sm:pl-8 pr-2 sm:pr-2.5 py-1.5 sm:py-2 rounded-full font-bold text-[15px] sm:text-[16px] transition-all duration-300 shadow-lg hover:shadow-[#D6A23D]/30 hover:scale-105 active:scale-95 group"
             >
               <span>{data.button?.text || "View More"}</span>
               <div className="bg-[#071D32] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 ml-3.5 sm:ml-4 shadow-sm group-hover:rotate-45 transition-transform duration-300 text-[#D6A23D]">
                 <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
               </div>
             </Link>
          </motion.div>
        )}
        
      </div>
    </section>
  );
}
