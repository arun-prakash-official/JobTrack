import React from "react";
import { 
  Bookmark, 
  Send, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { STATUS_CONFIG } from "../utils/jobUtils";

const ICON_MAP = {
  Bookmark: Bookmark,
  Send: Send,
  UserCheck: UserCheck,
  Calendar: Calendar,
  CheckCircle2: CheckCircle2,
  XCircle: XCircle,
};

export function StatusBadge({ status, onClick, className = "", size = "md" }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Saved"];
  const IconComponent = ICON_MAP[config.iconName] || Bookmark;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs font-medium gap-1.5",
    lg: "px-3 py-1.5 text-sm font-medium gap-2"
  }[size] || "px-2.5 py-1 text-xs font-medium gap-1.5";

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }[size] || 14;

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center rounded-full border transition-all duration-200 ${config.bgColor} ${sizeClasses} ${
        onClick ? `cursor-pointer ${config.hoverBg} hover:scale-105 active:scale-95` : ""
      } ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <IconComponent size={iconSizes} className="opacity-90 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}

export default StatusBadge;
