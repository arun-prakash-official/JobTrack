import React, { useState } from "react";
import { 
  ExternalLink, 
  Edit3, 
  Trash2, 
  MapPin, 
  Calendar, 
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { STATUSES, formatDate } from "../utils/jobUtils";

export function JobTable({ 
  applications = [], 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onViewNotes 
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  if (applications.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto rounded-xl linkedin-panel">
      <table className="w-full text-left border-collapse min-w-[760px]">
        <thead>
          <tr className="border-b border-[#e0dfdc] bg-[#f8faff] text-[11px] font-bold text-[#666666] uppercase tracking-wider">
            <th className="py-3.5 px-4 pl-6">Company & Role</th>
            <th className="py-3.5 px-4">Location & Type</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Applied Date</th>
            <th className="py-3.5 px-4 text-right pr-6">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e0dfdc]/60 text-sm">
          {applications.map((app) => {
            const initial = app.company ? app.company.charAt(0).toUpperCase() : "J";
            const isMenuOpen = activeMenuId === app.id;

            return (
              <tr 
                key={app.id} 
                className="hover:bg-[#f3f6f8] transition-colors group"
              >
                {/* Company & Role */}
                <td className="py-4 px-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#e8f2fe] border border-[#0a66c2]/30 flex items-center justify-center font-extrabold text-[#0a66c2] shrink-0 shadow-2xs">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#191919] truncate group-hover:text-[#0a66c2] transition-colors">
                          {app.company}
                        </span>
                        {app.url && (
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#666666] hover:text-[#0a66c2] transition-colors"
                            title="Visit Job Listing"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500 truncate">
                        {app.role}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Location & Job Type */}
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#191919] flex items-center gap-1 font-medium">
                      <MapPin size={12} className="text-[#666666]" />
                      {app.location || "N/A"}
                    </span>
                    <span className="text-[11px] text-[#0a66c2] bg-[#e8f2fe] px-2 py-0.5 rounded-md w-fit font-semibold border border-[#0a66c2]/20">
                      {app.jobType || "Full-time"}
                    </span>
                  </div>
                </td>

                {/* Status with Quick Change Menu */}
                <td className="py-4 px-4 relative">
                  <div className="relative inline-block">
                    <StatusBadge
                      status={app.status}
                      onClick={() => setActiveMenuId(isMenuOpen ? null : app.id)}
                      size="md"
                    />

                    {/* Quick Status Dropdown Menu */}
                    {isMenuOpen && (
                      <div className="absolute left-0 top-full mt-1.5 z-30 w-40 linkedin-panel bg-white rounded-xl shadow-xl py-1 animate-fade-in">
                        <div className="px-3 py-1 text-[10px] font-bold text-[#666666] border-b border-[#e0dfdc] uppercase tracking-wider">
                          Update Status
                        </div>
                        {STATUSES.map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              onStatusChange(app.id, st);
                              setActiveMenuId(null);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#e8f2fe] transition-colors ${
                              app.status === st ? "text-[#0a66c2] font-bold bg-[#e8f2fe]/60" : "text-[#191919] font-medium"
                            }`}
                          >
                            <span>{st}</span>
                            {app.status === st && <CheckCircle2 size={12} className="text-[#0a66c2]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>

                {/* Applied Date */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Calendar size={13} className="text-[#666666]" />
                    <span>{formatDate(app.appliedDate)}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-1.5">
                    {app.notes && (
                      <button
                        type="button"
                        onClick={() => onViewNotes(app)}
                        className="p-1.5 text-[#666666] hover:text-[#0a66c2] hover:bg-[#e8f2fe] rounded-lg transition-colors"
                        title="View Notes"
                      >
                        <ChevronRight size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onEdit(app)}
                      className="p-1.5 text-[#666666] hover:text-[#0a66c2] hover:bg-[#e8f2fe] rounded-lg transition-colors"
                      title="Edit Application"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(app)}
                      className="p-1.5 text-[#666666] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Application"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
