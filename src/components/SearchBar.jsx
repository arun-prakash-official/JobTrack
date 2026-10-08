import React from "react";
import { Search, X } from "lucide-react";

export function SearchBar({ value = "", onChange, placeholder = "Search company, role, location, or notes..." }) {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="linkedin-input w-full pl-10 pr-9 py-2.5 rounded-lg text-sm placeholder-[#666666] text-[#191919] focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#666666] hover:text-[#191919] transition-colors"
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
