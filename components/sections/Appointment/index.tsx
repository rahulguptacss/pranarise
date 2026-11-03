"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AppointmentSectionData } from '../../types';
import {
  User,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Clock,
  Flower2,
  Heart,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Check,
  AlertCircle,
} from 'lucide-react';

interface AppointmentProps {
  data: AppointmentSectionData;
}

export default function Appointment({ data }: AppointmentProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });

  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [isTimeFocused, setIsTimeFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [minDate, setMinDate] = useState('');

  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Close custom dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServiceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!data) return null;

  const handleDateContainerClick = () => {
    setIsDateFocused(true);
    setTimeout(() => {
      if (dateInputRef.current) {
        dateInputRef.current.focus();
        try {
          dateInputRef.current.showPicker?.();
        } catch {
          // ignore fallback
        }
      }
    }, 10);
  };

  const handleTimeContainerClick = () => {
    setIsTimeFocused(true);
    setTimeout(() => {
      if (timeInputRef.current) {
        timeInputRef.current.focus();
        try {
          timeInputRef.current.showPicker?.();
        } catch {
          // ignore fallback
        }
      }
    }, 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service) {
      setServiceError(true);
      setIsServiceOpen(true);
      return;
    }

    setServiceError(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        message: '',
      });
      setIsDateFocused(false);
      setIsTimeFocused(false);
    }, 4000);
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'flower2':
      case 'lotus':
        return <Flower2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'user':
        return <User className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'clock':
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'heart':
      default:
        return <Heart className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <section id="appointment" className="py-5 sm:py-7 lg:py-8 bg-[#071D32] relative overflow-hidden border-t border-[#29465F]">
      <span id="contact" className="absolute top-0 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-7 sm:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 sm:gap-4 mb-2.5 sm:mb-3"
          >
            <span className="h-[1px] w-6 sm:w-14 bg-[#D6A23D] shrink-0"></span>
            <span className="text-[#D6A23D] text-[11px] sm:text-[13px] tracking-[0.2em] sm:tracking-[0.25em] font-medium uppercase font-sans">
              {data.subtitle}
            </span>
            <span className="h-[1px] w-6 sm:w-14 bg-[#D6A23D] shrink-0"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-tight text-center leading-[1.2] mb-3"
          >
            <span className="text-[#F5F7FA] block sm:inline">{data.title_line1?.trim()}</span>{' '}
            <span className="text-[#D6A23D] block sm:inline sm:ml-1 whitespace-nowrap">
              {data.title_highlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#DCE5EF] text-[13px] sm:text-sm md:text-[15px] max-w-xl mx-auto leading-relaxed px-4 text-center"
          >
            {data.description}
          </motion.p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#123B5D] border border-[#29465F] rounded-[22px] sm:rounded-[28px] p-5 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_10px_40px_rgba(7,29,50,0.6)] relative"
          >
            <div>
              {/* Form Title & Subtitle */}
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-bold mb-1.5 sm:mb-2 leading-tight tracking-tight">
                <span className="text-[#F5F7FA]">{data.form_title_line1?.trim()} </span>
                <span className="text-[#D6A23D] whitespace-nowrap">
                  {data.form_title_highlight}
                </span>
              </h3>
              <p className="text-[#A9BBCB] text-xs sm:text-sm lg:text-[14.5px] mb-5 sm:mb-7 font-normal leading-relaxed">
                {data.form_description}
              </p>

              {/* Form Elements */}
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Your Name */}
                    <div className="relative flex items-center bg-[#0B2942] border border-[#29465F] hover:border-[#D6A23D]/50 focus-within:border-[#D6A23D] rounded-xl sm:rounded-2xl px-3.5 sm:px-5 h-[52px] sm:h-[58px] transition-all">
                      <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#A9BBCB] shrink-0 mr-3 stroke-[1.6]" />
                      <input
                        type="text"
                        required
                        placeholder={data.name_placeholder || "Your Name *"}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-transparent text-[#F5F7FA] text-xs sm:text-[14px] placeholder:text-[#A9BBCB] focus:outline-none w-full"
                      />
                    </div>

                    {/* Your Email */}
                    <div className="relative flex items-center bg-[#0B2942] border border-[#29465F] hover:border-[#D6A23D]/50 focus-within:border-[#D6A23D] rounded-xl sm:rounded-2xl px-3.5 sm:px-5 h-[52px] sm:h-[58px] transition-all">
                      <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#A9BBCB] shrink-0 mr-3 stroke-[1.6]" />
                      <input
                        type="email"
                        required
                        placeholder={data.email_placeholder || "Your Email *"}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-transparent text-[#F5F7FA] text-xs sm:text-[14px] placeholder:text-[#A9BBCB] focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Phone Number */}
                    <div className="relative flex items-center bg-[#0B2942] border border-[#29465F] hover:border-[#D6A23D]/50 focus-within:border-[#D6A23D] rounded-xl sm:rounded-2xl px-3.5 sm:px-5 h-[52px] sm:h-[58px] transition-all">
                      <Phone className={`w-4.5 h-4.5 sm:w-5 sm:h-5 mr-3 shrink-0 stroke-[1.6] transition-colors ${formData.phone ? 'text-[#D6A23D]' : 'text-[#A9BBCB]'}`} />
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        required
                        placeholder={data.phone_placeholder || "Phone Number *"}
                        value={formData.phone}
                        onKeyDown={(e) => {
                          if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                            return;
                          }
                          if (!/^[0-9]$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: numbersOnly });
                        }}
                        className="bg-transparent text-[#F5F7FA] text-xs sm:text-[14px] placeholder:text-[#A9BBCB] focus:outline-none w-full"
                      />
                    </div>

                  {/* Preferred Date (With Placeholder) */}
                  <div
                    onClick={handleDateContainerClick}
                    className="relative flex items-center bg-[#0B2942] border border-[#29465F] hover:border-[#D6A23D]/50 focus-within:border-[#D6A23D] rounded-xl sm:rounded-2xl px-3.5 sm:px-5 h-[52px] sm:h-[58px] transition-all cursor-pointer"
                  >
                    <CalendarIcon
                      className={`w-4.5 h-4.5 sm:w-5 sm:h-5 mr-3 shrink-0 stroke-[1.6] transition-colors ${
                        formData.date ? 'text-[#D6A23D]' : 'text-[#A9BBCB]'
                      }`}
                    />
                    <input
                      ref={dateInputRef}
                      type={isDateFocused || formData.date ? 'date' : 'text'}
                      onFocus={() => {
                        setIsDateFocused(true);
                        try {
                          dateInputRef.current?.showPicker?.();
                        } catch {
                          // ignore fallback
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsDateFocused(false);
                        }
                      }}
                      required
                      placeholder={data.date_placeholder || "Preferred Date *"}
                      value={formData.date}
                      min={minDate || undefined}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="bg-transparent text-[#F5F7FA] text-xs sm:text-[14px] placeholder:text-[#A9BBCB] focus:outline-none w-full [color-scheme:dark] cursor-pointer"
                    />
                    <CalendarIcon className="w-4 h-4 text-[#A9BBCB] shrink-0 ml-1.5 pointer-events-none stroke-[1.6]" />
                  </div>
                </div>

                {/* Row 3: Preferred Time & Select Yoga Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Preferred Time (Time Select Picker - NOT a dropdown) */}
                  <div
                    onClick={handleTimeContainerClick}
                    className="relative flex items-center bg-[#0B2942] border border-[#29465F] hover:border-[#D6A23D]/50 focus-within:border-[#D6A23D] rounded-xl sm:rounded-2xl px-3.5 sm:px-5 h-[52px] sm:h-[58px] transition-all cursor-pointer"
                  >
                    <Clock
                      className={`w-4.5 h-4.5 sm:w-5 sm:h-5 mr-3 shrink-0 stroke-[1.6] transition-colors ${
                        formData.time ? 'text-[#D6A23D]' : 'text-[#A9BBCB]'
                      }`}
                    />
                    <input
                      ref={timeInputRef}
                      type={isTimeFocused || formData.time ? 'time' : 'text'}
                      onFocus={() => {
                        setIsTimeFocused(true);
                        try {
                          timeInputRef.current?.showPicker?.();
                        } catch {
                          // ignore fallback
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsTimeFocused(false);
                        }
                      }}
                      required
                      placeholder={data.time_placeholder || "Preferred Time *"}
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="bg-transparent text-[#F5F7FA] text-xs sm:text-[14px] placeholder:text-[#A9BBCB] focus:outline-none w-full [color-scheme:dark] cursor-pointer"
                    />
                    <Clock className="w-4 h-4 text-[#A9BBCB] shrink-0 ml-1.5 pointer-events-none stroke-[1.6]" />
                  </div>

                  {/* Select Yoga Service (Custom Luxury Dropdown) */}
                  <div ref={serviceDropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsServiceOpen((prev) => !prev);
                        setServiceError(false);
                      }}
                      className={`w-full flex items-center justify-between bg-[#0B2942] border ${
                        serviceError
                          ? 'border-red-500/80 ring-1 ring-red-500/40'
                          : isServiceOpen
                          ? 'border-[#D6A23D] ring-1 ring-[#D6A23D]/40'
                          : 'border-[#29465F] hover:border-[#D6A23D]/50'
                      } rounded-xl sm:rounded-2xl px-3.5 sm:px-5 h-[52px] sm:h-[58px] transition-all cursor-pointer text-left outline-none`}
                    >
                      <div className="flex items-center min-w-0 flex-1 mr-2">
                        <Flower2
                          className={`w-4.5 h-4.5 sm:w-5 sm:h-5 mr-3 shrink-0 stroke-[1.6] transition-colors ${
                            formData.service ? 'text-[#D6A23D]' : 'text-[#A9BBCB]'
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-[14px] truncate ${
                            formData.service
                              ? 'text-[#F5F7FA] font-medium'
                              : 'text-[#A9BBCB]'
                          }`}
                        >
                          {formData.service || data.service_placeholder || 'Select Yoga Service *'}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#A9BBCB] shrink-0 transition-transform duration-200 stroke-[2] ${
                          isServiceOpen ? 'rotate-180 text-[#D6A23D]' : 'rotate-0'
                        }`}
                      />
                    </button>

                    {/* Custom Dropdown Menu */}
                    <AnimatePresence>
                      {isServiceOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#0B2942]/98 backdrop-blur-xl border border-[#29465F] rounded-xl sm:rounded-2xl shadow-[0_16px_40px_rgba(7,29,50,0.9)] p-1.5 max-h-60 overflow-y-auto"
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#D6A23D #0B2942',
                          }}
                        >
                          {data.services?.map((svc, i) => {
                            const isSelected = formData.service === svc;
                            return (
                              <button
                                type="button"
                                key={i}
                                onClick={() => {
                                  setFormData({ ...formData, service: svc });
                                  setIsServiceOpen(false);
                                  setServiceError(false);
                                }}
                                className={`w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-[13.5px] flex items-center justify-between transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#123B5D] text-[#D6A23D] font-semibold'
                                    : 'text-[#DCE5EF] hover:bg-[#123B5D]/60 hover:text-[#E8C875]'
                                }`}
                              >
                                <span className="flex items-center gap-2.5 truncate">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                      isSelected ? 'bg-[#D6A23D]' : 'bg-[#A9BBCB]'
                                    }`}
                                  />
                                  <span className="truncate">{svc}</span>
                                </span>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-[#D6A23D] shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {serviceError && (
                      <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 pl-1">
                        <AlertCircle className="w-3 h-3" />
                        Please select a yoga service
                      </p>
                    )}
                  </div>
                </div>

                {/* Your Message (Optional) */}
                <div className="relative flex items-start bg-[#0B2942] border border-[#29465F] hover:border-[#D6A23D]/50 focus-within:border-[#D6A23D] rounded-xl sm:rounded-2xl px-3.5 sm:px-5 py-3 sm:py-3.5 transition-all min-h-[105px] sm:min-h-[115px]">
                  <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#A9BBCB] shrink-0 mr-3 mt-1 stroke-[1.6]" />
                  <textarea
                    rows={3}
                    placeholder={data.message_placeholder || "Your Message (Optional)"}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-transparent text-[#F5F7FA] text-xs sm:text-[14px] placeholder:text-[#A9BBCB] focus:outline-none w-full resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#D6A23D] hover:bg-[#E8C875] text-[#071D32] font-bold text-xs sm:text-sm md:text-base py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(214,162,61,0.35)] hover:shadow-[0_6px_25px_rgba(232,200,117,0.45)] active:scale-[0.99] cursor-pointer mt-2 sm:mt-4"
                >
                  <span>{data.button_text}</span>
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#071D32] text-[#D6A23D] flex items-center justify-center text-xs font-black ml-1.5 shadow-sm">
                    ➔
                  </span>
                </button>

                {/* Success feedback */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#0B2942] border border-[#D6A23D] rounded-xl text-center text-[#E8C875] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D6A23D]" />
                    <span>{data.success_message || "Your appointment request has been submitted successfully!"}</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column: Studio Photo + Floating Feature Badges */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[22px] sm:rounded-3xl overflow-hidden border border-[#29465F] min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] flex items-center p-4 sm:p-6 lg:p-8 shadow-2xl group"
          >
            {/* Background Image */}
            <Image
              src={data.image || "/img/book-a-appointment.webp"}
              alt="Yoga Session"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
            />

            {/* Dark gradient overlay for text readability on both mobile & desktop */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#071D32]/95 via-[#071D32]/50 to-transparent z-10 pointer-events-none"></div>

            {/* Floating Badges */}
            <div className="relative z-20 flex flex-col gap-2.5 sm:gap-3.5 w-full max-w-[320px] sm:max-w-[285px]">
              {data.features?.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-[#123B5D]/90 backdrop-blur-md border border-[#29465F] rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-3 sm:gap-3.5 shadow-xl hover:border-[#D6A23D]/60 transition-all"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0B2942] text-[#D6A23D] border border-[#29465F] flex items-center justify-center shrink-0">
                    {getFeatureIcon(feat.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[#F5F7FA] font-bold text-xs sm:text-[13.5px] leading-tight truncate">
                      {feat.title}
                    </h4>
                    <p className="text-[#A9BBCB] text-[10px] sm:text-[11.5px] leading-snug mt-0.5 line-clamp-2">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
