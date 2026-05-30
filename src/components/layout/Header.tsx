"use client";

import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8">
      <div className="relative w-80">
        <Search
          size={18}
          className="absolute left-3 top-3 text-neutral-400"
        />

        <input
          placeholder="Search..."
          className="w-full border border-neutral-200 rounded-xl py-2 pl-10 pr-4 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          R
        </div>
      </div>
    </header>
  );
}