"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderData, LinkType } from '../../types';
import { Calendar, ArrowRight, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  data: HeaderData;
}

/** Desktop Navigation Item with multi-level dropdown flyout support */
function DesktopNavItem({
  link,
  active,
  isActive,
}: {
  link: LinkType;
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const hasChildren = Boolean(link.children && link.children.length > 0);

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className={`text-sm font-medium transition-colors relative py-2 ${
          active ? 'text-[#D6A23D]' : 'text-[#DCE5EF] hover:text-[#D6A23D]'
        }`}
      >
        {link.name}
        {active && (
          <motion.span
            layoutId="activeTab"
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D6A23D]"
          />
        )}
      </Link>
    );
  }

  // Multi-level Dropdown
  return (
    <div className="group/nav relative py-2">
      <Link
        href={link.href}
        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors relative ${
          active ? 'text-[#D6A23D]' : 'text-[#DCE5EF] group-hover/nav:text-[#D6A23D]'
        }`}
      >
        <span>{link.name}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover/nav:rotate-180 group-hover/nav:text-[#D6A23D]" />
        {active && (
          <motion.span
            layoutId="activeTab"
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D6A23D]"
          />
        )}
      </Link>

      {/* Level 1 Floating Dropdown Card */}
      <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 translate-y-2 transition-all duration-200 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:translate-y-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 z-50">
        <div className="min-w-[220px] rounded-2xl border border-[#29465F] bg-[#0B2942]/98 backdrop-blur-xl p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]">
          <ul className="space-y-0.5">
            {link.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className={`block rounded-xl px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                        isSubActive
                          ? 'bg-[#123B5D] text-[#D6A23D]'
                          : 'text-[#DCE5EF] hover:bg-[#123B5D]/60 hover:text-[#E8C875]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2: Nested flyout dropdown (Dropdown inside dropdown)
              return (
                <li key={sub.name} className="group/sub relative">
                  <Link
                    href={sub.href}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                      isSubActive
                        ? 'bg-[#123B5D] text-[#D6A23D]'
                        : 'text-[#DCE5EF] hover:bg-[#123B5D]/60 hover:text-[#E8C875]'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:text-[#D6A23D]" />
                  </Link>

                  {/* Level 2 Sub-Dropdown Card */}
                  <div className="pointer-events-none absolute left-full top-0 pl-2 opacity-0 translate-x-2 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100 group-hover/sub:translate-x-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 z-50">
                    <div className="min-w-[200px] rounded-2xl border border-[#29465F] bg-[#0B2942]/98 backdrop-blur-xl p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]">
                      <ul className="space-y-0.5">
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              className={`block rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors ${
                                isActive(nested.href)
                                  ? 'bg-[#123B5D] text-[#D6A23D]'
                                  : 'text-[#A9BBCB] hover:bg-[#123B5D]/60 hover:text-[#E8C875]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Mobile Navigation Item with multi-level accordion support */
function MobileNavItem({
  link,
  active,
  isActive,
  onClose,
}: {
  link: LinkType;
  active: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const hasChildren = Boolean(link.children && link.children.length > 0);

  const toggleSub = (name: string) => {
    setSubExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
        className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium transition-colors ${
          active
            ? 'bg-[#123B5D] text-[#D6A23D] font-semibold'
            : 'text-[#DCE5EF] hover:bg-[#123B5D]/60 hover:text-[#F5F7FA]'
        }`}
      >
        <span>{link.name}</span>
        {active && <span className="h-2 w-2 rounded-full bg-[#D6A23D]" />}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between rounded-xl px-4 py-1 text-base font-medium transition ${
          active || expanded ? 'bg-[#123B5D]/70' : 'hover:bg-[#123B5D]/40'
        }`}
      >
        <Link
          href={link.href}
          onClick={(e) => {
            if (link.href === '#' || !link.href) {
              e.preventDefault();
              setExpanded((prev) => !prev);
            } else {
              onClose();
            }
          }}
          className={`flex-1 py-2 transition ${
            active || expanded ? 'text-[#D6A23D] font-semibold' : 'text-[#DCE5EF]'
          }`}
        >
          {link.name}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={`Toggle ${link.name} sub-menu`}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
            expanded
              ? 'border-[#D6A23D] text-[#D6A23D] bg-[#D6A23D]/15'
              : 'border-[#29465F] text-[#A9BBCB] hover:border-[#D6A23D] hover:text-[#D6A23D]'
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expanded ? 'rotate-180 text-[#D6A23D]' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden pl-3 pr-1 my-1 space-y-1 border-l-2 border-[#D6A23D]/40 ml-4"
          >
            {link.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubOpen = Boolean(subExpanded[sub.name]);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isSubActive
                          ? 'bg-[#123B5D] text-[#D6A23D]'
                          : 'text-[#DCE5EF] hover:bg-[#123B5D]/60 hover:text-[#E8C875]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2 inside mobile drawer
              return (
                <li key={sub.name} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between rounded-lg px-3 py-1 text-sm font-medium ${
                      isSubActive || isSubOpen ? 'bg-[#123B5D]/70' : 'hover:bg-[#123B5D]/40'
                    }`}
                  >
                    <Link
                      href={sub.href}
                      onClick={(e) => {
                        if (sub.href === '#' || !sub.href) {
                          e.preventDefault();
                          toggleSub(sub.name);
                        } else {
                          onClose();
                        }
                      }}
                      className={`flex-1 py-1 transition ${
                        isSubActive || isSubOpen ? 'text-[#D6A23D]' : 'text-[#DCE5EF]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSub(sub.name)}
                      aria-expanded={isSubOpen}
                      aria-label={`Toggle ${sub.name} nested menu`}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all cursor-pointer ${
                        isSubOpen
                          ? 'border-[#D6A23D] text-[#D6A23D] bg-[#D6A23D]/15'
                          : 'border-[#29465F] text-[#A9BBCB] hover:border-[#D6A23D] hover:text-[#D6A23D]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180 text-[#D6A23D]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSubOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 pr-1 my-1 space-y-1 border-l border-[#29465F] ml-3"
                      >
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              onClick={onClose}
                              className={`block rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                                isActive(nested.href)
                                  ? 'bg-[#123B5D] text-[#D6A23D]'
                                  : 'text-[#A9BBCB] hover:bg-[#123B5D]/60 hover:text-[#E8C875]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ data }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!href || href === '#') return false;
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 left-0 right-0 z-50 py-2 px-4 md:px-8 bg-[#071D32]/95 backdrop-blur-md border-b border-[#29465F] shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src={data.logo_image || "/logo/logo.webp"} alt={data.logo_text || "PranaRise - Yoga & Fitness Logo"} className="h-12 sm:h-14 md:h-20 w-auto object-contain" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {data.links.map((link, index) => (
            <DesktopNavItem
              key={link.name + (link.href || index)}
              link={link}
              active={isActive(link.href)}
              isActive={isActive}
            />
          ))}
        </nav>
        
        {/* Desktop Button */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="w-px h-8 bg-[#29465F]" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={data.button_link} className="flex items-center gap-2 bg-[#D6A23D] hover:bg-[#c49232] text-[#071D32] px-6 py-2.5 rounded-full transition-colors text-sm font-semibold shadow-[0_4px_14px_rgba(214,162,61,0.3)]">
              <Calendar className="w-4 h-4" />
              <span>{data.button_text}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Header Buttons */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
          <Link 
            href={data.button_link} 
            className="flex items-center gap-1 sm:gap-1.5 bg-[#D6A23D] hover:bg-[#c49232] text-[#071D32] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full transition-all text-[11px] sm:text-xs font-semibold whitespace-nowrap shadow-sm active:scale-95"
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>{data.button_text}</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          </Link>
          <button 
            aria-label="Toggle Navigation Menu"
            className="bg-[#D6A23D] text-[#071D32] p-1.5 sm:p-2 rounded-lg hover:bg-[#c49232] transition-all hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#071D32] border-t border-[#29465F] absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
              {data.links.map((link) => (
                <MobileNavItem
                  key={link.name + link.href}
                  link={link}
                  active={isActive(link.href)}
                  isActive={isActive}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
