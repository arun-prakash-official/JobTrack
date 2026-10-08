// Status Model as requested
export const STATUSES = [
  "Saved",
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Rejected"
];

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote"
];

// Status Configuration optimized for LinkedIn Brand Theme (#0a66c2)
export const STATUS_CONFIG = {
  Saved: {
    label: "Saved",
    bgColor: "bg-slate-100 text-slate-700 border-slate-300 shadow-xs",
    badgeBg: "bg-slate-200/60",
    dotColor: "bg-slate-500",
    hoverBg: "hover:bg-slate-200/70",
    iconName: "Bookmark",
    rank: 1,
  },
  Applied: {
    label: "Applied",
    bgColor: "bg-[#e8f2fe] text-[#0a66c2] border-[#0a66c2]/40 font-semibold shadow-xs",
    badgeBg: "bg-[#0a66c2]/15",
    dotColor: "bg-[#0a66c2]",
    hoverBg: "hover:bg-[#0a66c2]/10",
    iconName: "Send",
    rank: 2,
  },
  Screening: {
    label: "Screening",
    bgColor: "bg-purple-50 text-purple-700 border-purple-200 font-semibold shadow-xs",
    badgeBg: "bg-purple-100",
    dotColor: "bg-purple-600",
    hoverBg: "hover:bg-purple-100/80",
    iconName: "UserCheck",
    rank: 3,
  },
  Interview: {
    label: "Interview",
    bgColor: "bg-amber-50 text-amber-800 border-amber-300 font-semibold shadow-xs",
    badgeBg: "bg-amber-100",
    dotColor: "bg-amber-600 animate-pulse",
    hoverBg: "hover:bg-amber-100/90",
    iconName: "Calendar",
    rank: 4,
  },
  Offer: {
    label: "Offer",
    bgColor: "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold shadow-xs",
    badgeBg: "bg-emerald-100",
    dotColor: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-100/90",
    iconName: "CheckCircle2",
    rank: 5,
  },
  Rejected: {
    label: "Rejected",
    bgColor: "bg-rose-50 text-rose-700 border-rose-200 font-semibold shadow-xs",
    badgeBg: "bg-rose-100",
    dotColor: "bg-rose-600",
    hoverBg: "hover:bg-rose-100/90",
    iconName: "XCircle",
    rank: 6,
  },
};

// Default sample applications
export const INITIAL_APPLICATIONS = [
  {
    id: "172830123",
    company: "Google",
    role: "Frontend Developer",
    location: "Bangalore",
    jobType: "Full-time",
    status: "Interview",
    appliedDate: "2026-10-05",
    url: "https://careers.google.com/jobs/results/123456",
    notes: "Completed Technical Screening on Oct 06. System design & React live coding scheduled for next week."
  },
  {
    id: "172830124",
    company: "Amazon",
    role: "Senior Software Engineer",
    location: "Hyderabad",
    jobType: "Full-time",
    status: "Applied",
    appliedDate: "2026-10-03",
    url: "https://amazon.jobs/en/jobs/2984102",
    notes: "Applied through internal referral link. Waiting for HR recruiter callback."
  },
  {
    id: "172830125",
    company: "Microsoft",
    role: "Data Analyst",
    location: "Bangalore",
    jobType: "Full-time",
    status: "Offer",
    appliedDate: "2026-09-28",
    url: "https://careers.microsoft.com/us/en/job/984712",
    notes: "Offer received! Base pay package reviewed. Decision deadline is Oct 15."
  },
  {
    id: "172830126",
    company: "Stripe",
    role: "Staff Frontend Engineer",
    location: "Remote",
    jobType: "Remote",
    status: "Screening",
    appliedDate: "2026-10-06",
    url: "https://stripe.com/jobs/listing/staff-frontend-eng",
    notes: "Recruiter phone call went smoothly. Submitted portfolio & code samples."
  },
  {
    id: "172830127",
    company: "Meta",
    role: "React UI Specialist",
    location: "Remote",
    jobType: "Contract",
    status: "Rejected",
    appliedDate: "2026-09-20",
    url: "https://metacareers.com/v2/jobs/774812",
    notes: "Received automated rejection email after final stage."
  },
  {
    id: "172830128",
    company: "Uber",
    role: "Product Designer & Developer",
    location: "Bangalore",
    jobType: "Full-time",
    status: "Saved",
    appliedDate: "2026-10-07",
    url: "https://uber.com/careers/p/109283",
    notes: "Saved job listing. Updating resume before submitting application."
  },
  {
    id: "172830129",
    company: "Notion",
    role: "Frontend Engineer - Product",
    location: "Remote",
    jobType: "Full-time",
    status: "Interview",
    appliedDate: "2026-10-01",
    url: "https://notion.so/careers/frontend-product",
    notes: "Pair programming interview round passed! Waiting for final VP engineering chat."
  }
];

// Helper to format ISO date strings into clean display dates
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
};

// Calculate metrics for stats cards
export const calculateStats = (applications = []) => {
  const total = applications.length;
  const saved = applications.filter((app) => app.status === "Saved").length;
  const applied = applications.filter((app) => app.status === "Applied").length;
  const screening = applications.filter((app) => app.status === "Screening").length;
  const interviews = applications.filter((app) => app.status === "Interview").length;
  const offers = applications.filter((app) => app.status === "Offer").length;
  const rejected = applications.filter((app) => app.status === "Rejected").length;

  const activeApplications = total - saved;
  const responseRate = activeApplications > 0 
    ? Math.round(((screening + interviews + offers + rejected) / activeApplications) * 100) 
    : 0;

  return {
    total,
    saved,
    applied,
    screening,
    interviews,
    offers,
    rejected,
    responseRate
  };
};

// Search & Filter applications
export const filterApplications = (applications = [], filters = {}) => {
  const { search = "", status = "All", jobType = "All" } = filters;

  return applications.filter((app) => {
    const matchesSearch =
      !search ||
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase()) ||
      (app.location && app.location.toLowerCase().includes(search.toLowerCase())) ||
      (app.notes && app.notes.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = status === "All" || app.status === status;
    const matchesJobType = jobType === "All" || app.jobType === jobType;

    return matchesSearch && matchesStatus && matchesJobType;
  });
};

// Sort applications
export const sortApplications = (applications = [], sortBy = "newest") => {
  const sorted = [...applications];

  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    case "oldest":
      return sorted.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
    case "company":
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
    case "status":
      return sorted.sort((a, b) => (STATUS_CONFIG[a.status]?.rank || 0) - (STATUS_CONFIG[b.status]?.rank || 0));
    default:
      return sorted;
  }
};
