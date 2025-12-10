"use client";
import * as React from "react";

interface Group {
  members: any[];
  explanation: string;
  scheduledAt?: string;
}

export default function MatchesPage() {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/group")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch groups");
        return res.json();
      })
      .then((data) => {
        setGroups(data.groups || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading matches:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-10">Loading matches...</p>;

  return (
    <div style={{ backgroundImage: "url('/bg-matches.svg')" }} className="min-h-screen bg-slate-50 bg-no-repeat bg-fixed bg-cover p-10">
      <h2 className="text-3xl font-bold text-brand-600 mb-6">Dinner Groups</h2>
      {groups.length === 0 && (
        <p className="text-slate-600">No dinner groups created yet. Visit admin to generate groups.</p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-700">Group {idx + 1}</h3>
              {group.scheduledAt && (
                <span className="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded whitespace-nowrap">
                  {new Date(group.scheduledAt).toLocaleDateString()}
                </span>
              )}
            </div>
            
            {group.scheduledAt && (
              <p className="text-sm text-slate-600 mb-3">
                <strong>Scheduled:</strong> {new Date(group.scheduledAt).toLocaleString()}
              </p>
            )}
            
            <ul className="mb-4 text-sm text-slate-700 space-y-1">
              {group.members.map((m: any) => (
                <li key={m.id} className="flex items-center gap-2">
                  <span className="text-xs bg-slate-200 px-2 py-1 rounded">{m.name}</span>
                </li>
              ))}
            </ul>
            
            <div className="border-t pt-3">
              <p className="text-sm text-slate-600 italic">{group.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
