import { useState, useMemo } from "react";
import {
  Plus,
  Briefcase,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Search,
  CheckCircle2
} from "lucide-react";

import StatsCards from "./StatsCards";
import FilterBar from "./FilterBar";
import JobTable from "./JobTable";
import JobCard from "./JobCard";
import Modal from "./Modal";
import JobForm from "./JobForm";

import {
  filterApplications,
  sortApplications,
  INITIAL_APPLICATIONS,
  calculateStats
} from "../utils/jobUtils";

export function Dashboard({ applications = [], setApplications }) {
  // State for search, filtering, sorting, view mode
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'

  // Modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  const [deletingApp, setDeletingApp] = useState(null);
  const [viewingNotesApp, setViewingNotesApp] = useState(null);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Filtered & Sorted applications list
  const filteredApps = useMemo(() => {
    const filtered = filterApplications(applications, {
      search,
      status: statusFilter,
      jobType: jobTypeFilter
    });
    return sortApplications(filtered, sortBy);
  }, [applications, search, statusFilter, jobTypeFilter, sortBy]);

  const stats = useMemo(() => calculateStats(applications), [applications]);

  // CRUD Handlers
  const handleCreateOrUpdate = (formData) => {
    if (editingApp) {
      setApplications((prev) =>
        prev.map((app) => (app.id === editingApp.id ? { ...app, ...formData } : app))
      );
      showToast(`Updated "${formData.company} - ${formData.role}"`);
    } else {
      const newApp = {
        id: Date.now().toString(),
        ...formData
      };
      setApplications((prev) => [newApp, ...prev]);
      showToast(`Added "${formData.company} - ${formData.role}"`);
    }
    setIsAddEditModalOpen(false);
    setEditingApp(null);
  };

  const handleDeleteConfirm = () => {
    if (!deletingApp) return;
    setApplications((prev) => prev.filter((app) => app.id !== deletingApp.id));
    showToast(`Deleted application for "${deletingApp.company}"`, "info");
    setDeletingApp(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    const app = applications.find((a) => a.id === id);
    if (app) {
      showToast(`Changed status for ${app.company} to "${newStatus}"`);
    }
  };

  const handleResetDemoData = () => {
    if (window.confirm("Reset applications to default sample data?")) {
      setApplications(INITIAL_APPLICATIONS);
      setSearch("");
      setStatusFilter("All");
      setJobTypeFilter("All");
      setSortBy("newest");
      showToast("Reset to sample demo applications");
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setJobTypeFilter("All");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen pb-16 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-2.5 px-4 py-3 rounded-xl linkedin-panel bg-white shadow-xl text-[#191919] text-sm font-semibold">
          {toast.type === "success" ? (
            <CheckCircle2 className="text-[#0a66c2] shrink-0" size={18} />
          ) : (
            <Sparkles className="text-[#0a66c2] shrink-0" size={18} />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* App Header / Navigation Bar */}
      <header className="linkedin-panel p-5 sm:p-6 rounded-xl border border-[#e0dfdc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0a66c2] flex items-center justify-center text-white shrink-0 shadow-md">
            <Briefcase size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#191919] tracking-tight">
                JobTrack
              </h1>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-[#e8f2fe] text-[#0a66c2] border border-[#0a66c2]/30">
                Track your Progress
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Track applications, interview pipeline, and career progress
            </p>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleResetDemoData}
            className="px-4 py-2.5 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/10 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Reset default sample data"
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingApp(null);
              setIsAddEditModalOpen(true);
            }}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <Plus size={18} />
            <span>Add Application</span>
          </button>
        </div>
      </header>

      {/* Stats Cards Section */}
      <StatsCards
        applications={applications}
        activeStatusFilter={statusFilter}
        onStatusSelect={(status) => setStatusFilter(status)}
      />

      {/* Filter and Search Control Bar */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        jobTypeFilter={jobTypeFilter}
        onJobTypeChange={setJobTypeFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
        totalResults={filteredApps.length}
      />

      {/* Main Content Area: Table / Cards Grid / Empty States */}
      <main>
        {filteredApps.length > 0 ? (
          viewMode === "table" ? (
            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <JobTable
                  applications={filteredApps}
                  onEdit={(app) => {
                    setEditingApp(app);
                    setIsAddEditModalOpen(true);
                  }}
                  onDelete={(app) => setDeletingApp(app)}
                  onStatusChange={handleStatusChange}
                  onViewNotes={(app) => setViewingNotesApp(app)}
                />
              </div>

              {/* Mobile Card Grid View fallback when in table mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {filteredApps.map((app) => (
                  <JobCard
                    key={app.id}
                    application={app}
                    onEdit={(a) => {
                      setEditingApp(a);
                      setIsAddEditModalOpen(true);
                    }}
                    onDelete={(a) => setDeletingApp(a)}
                    onStatusChange={handleStatusChange}
                    onViewNotes={(a) => setViewingNotesApp(a)}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Explicit Grid / Cards View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApps.map((app) => (
                <JobCard
                  key={app.id}
                  application={app}
                  onEdit={(a) => {
                    setEditingApp(a);
                    setIsAddEditModalOpen(true);
                  }}
                  onDelete={(a) => setDeletingApp(a)}
                  onStatusChange={handleStatusChange}
                  onViewNotes={(a) => setViewingNotesApp(a)}
                />
              ))}
            </div>
          )
        ) : (
          /* Empty State when zero applications match filters or exist */
          <div className="linkedin-panel rounded-xl p-12 text-center border border-[#e0dfdc] max-w-lg mx-auto my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e8f2fe] text-[#0a66c2] border border-[#0a66c2]/30 flex items-center justify-center mx-auto mb-2">
              {search || statusFilter !== "All" || jobTypeFilter !== "All" ? (
                <Search size={32} />
              ) : (
                <Briefcase size={32} />
              )}
            </div>
            <h3 className="text-xl font-bold text-[#191919]">
              {applications.length === 0
                ? "No Job Applications Yet"
                : "No Applications Match Search"}
            </h3>
            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
              {applications.length === 0
                ? "Start tracking your career journey by adding your first job application or loading sample demo data."
                : "Try adjusting your search terms, status filters, or clear all filters to see results."}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {applications.length === 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingApp(null);
                      setIsAddEditModalOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Application
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDemoData}
                    className="px-5 py-2.5 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/10 font-bold text-sm transition-all"
                  >
                    Load Sample Data
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm transition-all flex items-center gap-2 shadow-md"
                >
                  <RotateCcw size={16} />
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal 1: Add / Edit Application Form */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingApp(null);
        }}
        title={editingApp ? `Edit Application: ${editingApp.company}` : "Add New Job Application"}
        maxWidth="max-w-2xl"
      >
        <JobForm
          initialData={editingApp}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setIsAddEditModalOpen(false);
            setEditingApp(null);
          }}
        />
      </Modal>

      {/* Modal 2: Delete Confirmation Dialog */}
      <Modal
        isOpen={!!deletingApp}
        onClose={() => setDeletingApp(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        {deletingApp && (
          <div className="text-left space-y-4">
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              <AlertTriangle size={20} className="shrink-0 text-rose-600" />
              <span>Are you sure you want to delete this job application record? This action cannot be undone.</span>
            </div>

            <div className="p-4 rounded-lg bg-[#edf3f8] border border-[#e0dfdc] space-y-1">
              <div className="font-bold text-[#191919] text-base">
                {deletingApp.company}
              </div>
              <div className="text-xs font-medium text-slate-600">
                {deletingApp.role} • {deletingApp.location || "N/A"}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingApp(null)}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#666666] hover:text-[#191919] hover:bg-[#edf3f8] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all"
              >
                Delete Application
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal 3: View Notes Detail Modal */}
      <Modal
        isOpen={!!viewingNotesApp}
        onClose={() => setViewingNotesApp(null)}
        title={viewingNotesApp ? `Notes: ${viewingNotesApp.company} (${viewingNotesApp.role})` : "Application Notes"}
        maxWidth="max-w-lg"
      >
        {viewingNotesApp && (
          <div className="text-left space-y-4">
            <div className="p-4 rounded-lg bg-[#f8faff] border border-[#e0dfdc] text-[#191919] text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {viewingNotesApp.notes || "No notes entered."}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingNotesApp(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#edf3f8] hover:bg-[#e8f2fe] text-[#0a66c2] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;
