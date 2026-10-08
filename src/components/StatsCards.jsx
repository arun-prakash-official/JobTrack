import React from "react";
import { 
  Briefcase, 
  Send, 
  CalendarCheck, 
  Trophy, 
  XCircle, 
  Bookmark,
  TrendingUp
} from "lucide-react";
import { calculateStats } from "../utils/jobUtils";

export function StatsCards({ applications = [], activeStatusFilter = "All", onStatusSelect }) {
  const stats = calculateStats(applications);

  const cards = [
    {
      id: "All",
      label: "Total Applications",
      count: stats.total,
      icon: Briefcase,
      iconBg: "bg-[#0a66c2] text-white shadow-xs",
      percentage: "100%",
    },
    {
      id: "Applied",
      label: "Applied",
      count: stats.applied,
      icon: Send,
      iconBg: "bg-[#e8f2fe] text-[#0a66c2]",
      percentage: stats.total ? `${Math.round((stats.applied / stats.total) * 100)}%` : "0%",
    },
    {
      id: "Interview",
      label: "Interviews",
      count: stats.interviews + stats.screening,
      icon: CalendarCheck,
      iconBg: "bg-amber-100 text-amber-700",
      percentage: stats.total ? `${Math.round(((stats.interviews + stats.screening) / stats.total) * 100)}%` : "0%",
    },
    {
      id: "Offer",
      label: "Offers",
      count: stats.offers,
      icon: Trophy,
      iconBg: "bg-emerald-100 text-emerald-700",
      percentage: stats.total ? `${Math.round((stats.offers / stats.total) * 100)}%` : "0%",
    },
    {
      id: "Rejected",
      label: "Rejected",
      count: stats.rejected,
      icon: XCircle,
      iconBg: "bg-rose-100 text-rose-700",
      percentage: stats.total ? `${Math.round((stats.rejected / stats.total) * 100)}%` : "0%",
    },
    {
      id: "Saved",
      label: "Saved Jobs",
      count: stats.saved,
      icon: Bookmark,
      iconBg: "bg-slate-200 text-slate-700",
      percentage: stats.total ? `${Math.round((stats.saved / stats.total) * 100)}%` : "0%",
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeStatusFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onStatusSelect && onStatusSelect(card.id)}
            className={`linkedin-card relative overflow-hidden p-4 rounded-xl text-left transition-all duration-200 focus:outline-none ${
              isSelected 
                ? "ring-2 ring-[#0a66c2] bg-[#f8faff] shadow-md scale-[1.01]" 
                : "hover:border-[#0a66c2]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 truncate pr-1">
                {card.label}
              </span>
              <div className={`p-1.5 rounded-lg ${card.iconBg}`}>
                <Icon size={15} />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold tracking-tight text-[#191919]">
                {card.count}
              </span>
              <span className="text-[11px] font-semibold text-[#0a66c2] flex items-center gap-0.5">
                <TrendingUp size={11} className="text-[#0a66c2]" />
                {card.percentage}
              </span>
            </div>

            {/* LinkedIn selection indicator bar */}
            {isSelected && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0a66c2]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default StatsCards;
