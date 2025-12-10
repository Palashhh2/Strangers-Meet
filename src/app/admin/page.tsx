"use client";
import React from "react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  AI: { decision: string; confidence: number; reason: string };
  status: string;
}

interface AuditLog {
  timestamp: string;
  action: string;
  applicantId: string;
  applicantName: string;
  from?: string;
  to?: string;
  status?: string;
}

export default function AdminPage() {
  const [applicants, setApplicants] = React.useState<Applicant[]>([]);
  const [auditLogs, setAuditLogs] = React.useState<AuditLog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState<"overview" | "audit">("overview");

  React.useEffect(() => {
    Promise.all([
      fetch("/api/applicants").then((res) => res.json()),
      fetch("/api/audit").then((res) => res.json()),
    ])
      .then(([appData, auditData]) => {
        setApplicants(appData.applicants || []);
        setAuditLogs(auditData.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load admin data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-600">Admin Dashboard</h1>
      
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setTab("overview")}
          className={`px-4 py-2 font-medium transition ${
            tab === "overview"
              ? "text-brand-600 border-b-2 border-brand-600"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("audit")}
          className={`px-4 py-2 font-medium transition ${
            tab === "audit"
              ? "text-brand-600 border-b-2 border-brand-600"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Audit Log ({auditLogs.length})
        </button>
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-slate-600">Total Applicants</h3>
            <p className="text-3xl font-bold text-brand-600 mt-2">{applicants.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-slate-600">Accepted</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{applicants.filter(a => a.status === 'accept').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-slate-600">Rejected</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{applicants.filter(a => a.status === 'reject').length}</p>
          </div>
        </div>
      )}

      {tab === "audit" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Time</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Applicant</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-slate-500">
                      No audit logs yet
                    </td>
                  </tr>
                ) : (
                  auditLogs
                    .slice()
                    .reverse()
                    .map((log, idx) => (
                      <tr key={idx} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-3 text-xs text-slate-600">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                              log.action === "override"
                                ? "bg-blue-50 text-blue-700"
                                : log.action === "delete"
                                ? "bg-red-50 text-red-700"
                                : "bg-slate-50 text-slate-700"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-slate-900">{log.applicantName}</td>
                        <td className="px-6 py-3 text-slate-600">
                          {log.action === "override" && `${log.from} → ${log.to}`}
                          {log.action === "delete" && `was ${log.status}`}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-slate-600 text-sm">Navigate to <strong>Applicants</strong> or <strong>Groups</strong> using the header menu.</p>
    </div>
  );
}