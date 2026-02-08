
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B132B] py-8 mt-auto border-t border-[#C9B458]/50 shadow-2xl">
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-white font-montserrat font-bold text-lg md:text-xl tracking-wide mb-1">
          Hak Milik ePengurusan Digital SMAAM @ 2026
        </h4>
        <p className="text-gray-400 font-poppins text-sm md:text-base opacity-80 uppercase tracking-widest">
          SMA Al-Khairiah Al-Islamiah Mersing
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <div className="h-0.5 w-12 bg-[#C9B458]/20 rounded-full"></div>
          <div className="h-0.5 w-12 bg-[#C9B458]/40 rounded-full"></div>
          <div className="h-0.5 w-12 bg-[#C9B458]/20 rounded-full"></div>
        </div>
      </div>
    </footer>
  );
};
