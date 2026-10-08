import React, { useState } from "react";
import { 
  ExternalLink, 
  Edit3, 
  Trash2, 
  MapPin, 
  Calendar, 
  FileText,
  CheckCircle2
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { STATUSES, formatDate } from "../utils/jobUtils";

export function JobCard({ 
  application, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onViewNotes 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const initial = application.company ? application.company.charAt(0).toUpperCase() : "J";

  return (
    <div className="linkedin-card rounded-xl p-5 relative border border-[#e0dfdc] flex flex-col justify-between space-y-4 group">
      {/* Header: Avatar, Company & Role */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#e8f2fe] border border-[#0a66c2]/30 flex items-center justify-center font-extrabold text-lg text-[#0a66c2] shrink-0 shadow-2xs">
              {initial}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-[#191919] text-base group-hover:text-[#0a66c2] transition-colors">
                  {application.company}
                </h4>
                {application.url && (
                  <a
                    href={application.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#666666] hover:text-[#0a66c2] transition-colors p-0.5"
                    title="Visit Job Listing"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-600">
                {application.role}
              </p>
            </div>
          </div>
        </div>

        {/* Location & Job Type Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {application.location && (
            <span className="text-xs text-[#191919] flex items-center gap-1 bg-[#edf3f8] px-2.5 py-1 rounded-md font-medium">
              <MapPin size={12} className="text-[#666666]" />
              {application.location}
            </span>
          )}
          <span className="text-xs text-[#0a66c2] bg-[#e8f2fe] px-2.5 py-1 rounded-md border border-[#0a66c2]/20 font-semibold">
            {application.jobType || "Full-time"}
          </span>
        </div>

        {/* Notes preview if present */}
        {application.notes && (
          <div 
            onClick={() => onViewNotes(application)}
            className="p-2.5 rounded-lg bg-[#f8faff] border border-[#e0dfdc] text-xs text-[#191919] cursor-pointer hover:border-[#0a66c2]/40 transition-colors line-clamp-2 flex items-start gap-2"
          >
            <FileText size={14} className="text-[#666666] shrink-0 mt-0.5" />
            <span className="italic font-medium">{application.notes}</span>
          </div>
        )}
      </div>

      {/* Footer: Status Badge, Applied Date & Actions */}
      <div className="pt-3 border-t border-[#e0dfdc]/60 flex items-center justify-between gap-2">
        {/* Status Badge with drop menu */}
        <div className="relative">
          <StatusBadge
            status={application.status}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            size="sm"
          />

          {isMenuOpen && (
            <div className="absolute left-0 bottom-full mb-2 z-30 w-40 linkedin-panel bg-white rounded-xl shadow-xl py-1 animate-fade-in">
              <div className="px-3 py-1 text-[10px] font-bold text-[#666666] border-b border-[#e0dfdc] uppercase tracking-wider">
                Update Status
              </div>
              {STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    onStatusChange(application.id, st);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#e8f2fe] transition-colors ${
                    application.status === st ? "text-[#0a66c2] font-bold bg-[#e8f2fe]/60" : "text-[#191919] font-medium"
                  }`}
                >
                  <span>{st}</span>
                  {application.status === st && <CheckCircle2 size={12} className="text-[#0a66c2]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Applied Date & Actions */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Calendar size={12} className="text-[#666666]" />
            {formatDate(application.appliedDate)}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(application)}
              className="p-1.5 text-[#666666] hover:text-[#0a66c2] hover:bg-[#e8f2fe] rounded-lg transition-colors"
              title="Edit Application"
            >
              <Edit3 size={15} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(application)}
              className="p-1.5 text-[#666666] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Delete Application"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
