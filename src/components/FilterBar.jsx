import React from "react";
import { 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  Table as TableIcon, 
  RotateCcw,
  Briefcase
} from "lucide-react";
import SearchBar from "./SearchBar";
import { STATUSES, JOB_TYPES } from "../utils/jobUtils";

export function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  jobTypeFilter,
  onJobTypeChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalResults = 0
}) {
  const hasActiveFilters = 
    search !== "" || 
    statusFilter !== "All" || 
    jobTypeFilter !== "All" || 
    sortBy !== "newest";

  return (
    <div className="linkedin-panel p-4 rounded-xl mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        {/* Search input */}
        <SearchBar value={search} onChange={onSearchChange} />

        {/* Filter controls container */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[135px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#666666]">
              <Filter size={14} />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="linkedin-input w-full pl-8 pr-8 py-2.5 rounded-lg text-xs sm:text-sm font-semibold appearance-none cursor-pointer focus:outline-none"
            >
              <option value="All" className="bg-white text-[#191919]">Status: All</option>
              {STATUSES.map((st) => (
                <option key={st} value={st} className="bg-white text-[#191919]">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[135px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#666666]">
              <Briefcase size={14} />
            </div>
            <select
              value={jobTypeFilter}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="linkedin-input w-full pl-8 pr-8 py-2.5 rounded-lg text-xs sm:text-sm font-semibold appearance-none cursor-pointer focus:outline-none"
            >
              <option value="All" className="bg-white text-[#191919]">Type: All</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type} className="bg-white text-[#191919]">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative flex-1 sm:flex-initial min-w-[145px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#666666]">
              <ArrowUpDown size={14} />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="linkedin-input w-full pl-8 pr-8 py-2.5 rounded-lg text-xs sm:text-sm font-semibold appearance-none cursor-pointer focus:outline-none"
            >
              <option value="newest" className="bg-white text-[#191919]">Sort: Newest</option>
              <option value="oldest" className="bg-white text-[#191919]">Sort: Oldest</option>
              <option value="company" className="bg-white text-[#191919]">Sort: Company A-Z</option>
              <option value="status" className="bg-white text-[#191919]">Sort: Status Priority</option>
            </select>
          </div>

          {/* Layout View Mode Switch */}
          <div className="flex items-center bg-[#edf3f8] p-1 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={`p-2 rounded-md text-xs font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-[#0a66c2] text-white shadow-xs"
                  : "text-[#666666] hover:text-[#191919]"
              }`}
              title="Table View"
            >
              <TableIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("cards")}
              className={`p-2 rounded-md text-xs font-semibold transition-all ${
                viewMode === "cards"
                  ? "bg-[#0a66c2] text-white shadow-xs"
                  : "text-[#666666] hover:text-[#191919]"
              }`}
              title="Cards Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Reset button if filters active */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3 py-2 rounded-lg text-xs font-bold bg-[#edf3f8] hover:bg-[#e8f2fe] text-[#0a66c2] transition-all flex items-center gap-1.5 shrink-0"
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results counter indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1 font-medium">
        <span>
          Showing <strong className="text-[#0a66c2] font-bold">{totalResults}</strong> {totalResults === 1 ? "application" : "applications"}
        </span>
        {hasActiveFilters && (
          <span className="text-[#0a66c2] italic font-semibold">
            Filters active
          </span>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
