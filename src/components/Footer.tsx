"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-[#202126] bg-[#080a0d] py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-xs text-[#8d9299] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <b className="text-base text-white">
            IchGehe<span className="text-[#ff8600]">Viral</span>
          </b>
          <div>AI Video Engine</div>
        </div>
        <div>© {new Date().getFullYear()} IchGeheViral</div>
      </div>
    </footer>
  );
}
