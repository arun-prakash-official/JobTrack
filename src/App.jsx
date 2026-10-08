import React from "react";
import Dashboard from "./components/Dashboard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { INITIAL_APPLICATIONS } from "./utils/jobUtils";

function App() {
  // Persistence via custom useLocalStorage hook
  const [applications, setApplications] = useLocalStorage(
    "jobtrack-applications",
    INITIAL_APPLICATIONS
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Dashboard
        applications={applications}
        setApplications={setApplications}
      />
    </div>
  );
}

export default App;
