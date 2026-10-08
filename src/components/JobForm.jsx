import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Briefcase, 
  MapPin, 
  Globe, 
  Calendar, 
  FileText, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { STATUSES, JOB_TYPES } from "../utils/jobUtils";

export function JobForm({ initialData = null, onSubmit, onCancel }) {
  const getTodayISO = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "Bangalore",
    jobType: "Full-time",
    status: "Applied",
    appliedDate: getTodayISO(),
    url: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || "",
        role: initialData.role || "",
        location: initialData.location || "",
        jobType: initialData.jobType || "Full-time",
        status: initialData.status || "Applied",
        appliedDate: initialData.appliedDate || getTodayISO(),
        url: initialData.url || "",
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        company: "",
        role: "",
        location: "Bangalore",
        jobType: "Full-time",
        status: "Applied",
        appliedDate: getTodayISO(),
        url: "",
        notes: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.role.trim()) newErrors.role = "Role / Title is required";
    if (!formData.appliedDate) newErrors.appliedDate = "Applied date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      company: formData.company.trim(),
      role: formData.role.trim(),
      location: formData.location.trim(),
      url: formData.url.trim(),
      notes: formData.notes.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {/* Company Name & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
            <Building2 size={14} className="text-[#0a66c2]" />
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Google, Stripe"
            className={`linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm ${
              errors.company ? "border-rose-500 focus:border-rose-500" : ""
            }`}
          />
          {errors.company && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.company}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
            <Briefcase size={14} className="text-[#0a66c2]" />
            Job Role / Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className={`linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm ${
              errors.role ? "border-rose-500 focus:border-rose-500" : ""
            }`}
          />
          {errors.role && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.role}
            </p>
          )}
        </div>
      </div>

      {/* Location & Job Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
            <MapPin size={14} className="text-[#0a66c2]" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore, Remote, SF"
            className="linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
            <Briefcase size={14} className="text-[#0a66c2]" />
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm cursor-pointer font-medium"
          >
            {JOB_TYPES.map((type) => (
              <option key={type} value={type} className="bg-white text-[#191919]">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status & Applied Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
            <CheckCircle size={14} className="text-[#0a66c2]" />
            Application Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm cursor-pointer font-medium"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st} className="bg-white text-[#191919]">
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
            <Calendar size={14} className="text-[#0a66c2]" />
            Applied Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            className="linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm cursor-pointer font-medium"
          />
        </div>
      </div>

      {/* Job URL */}
      <div>
        <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
          <Globe size={14} className="text-[#0a66c2]" />
          Job Listing / Portal URL
        </label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://linkedin.com/jobs/view/123456"
          className="linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold text-[#191919] mb-1.5 flex items-center gap-1.5">
          <FileText size={14} className="text-[#0a66c2]" />
          Notes & Interview Context
        </label>
        <textarea
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="e.g. Applied via LinkedIn referral, scheduled technical interview..."
          className="linkedin-input w-full px-3.5 py-2.5 rounded-lg text-sm resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e0dfdc]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-full text-sm font-bold text-[#666666] hover:text-[#191919] hover:bg-[#edf3f8] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#0a66c2] hover:bg-[#004182] text-white shadow-md transition-all transform active:scale-95"
        >
          {initialData ? "Save Changes" : "+ Add Application"}
        </button>
      </div>
    </form>
  );
}

export default JobForm;
