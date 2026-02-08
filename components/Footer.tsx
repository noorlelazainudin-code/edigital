
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B132B] py-6 mt-auto border-t border-[#C9B458]/30 shadow-2xl">
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-white font-montserrat font-bold text-xs md:text-sm tracking-widest mb-1 uppercase">
          Hak Milik ePengurusan Digital SMAAM @ 2026
        </h4>
        <p className="text-gray-500 font-poppins text-[9px] md:text-[11px] uppercase tracking-[0.2em]">
          SMA Al-Khairiah Al-Islamiah Mersing
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <div className="h-0.5 w-8 bg-[#C9B458]/10 rounded-full"></div>
          <div className="h-0.5 w-8 bg-[#C9B458]/20 rounded-full"></div>
          <div className="h-0.5 w-8 bg-[#C9B458]/10 rounded-full"></div>
        </div>
      </div>
    </footer>
  );
};
