"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);

  async function loadGroups() {
    try {
      const res = await fetch("/api/groups");
      if (!res.ok) throw new Error("Failed to fetch groups");
      const json = await res.json();
      setGroups(json.groups || []);
    } catch (err) {
      console.error("Error loading groups:", err);
    }
  }

  async function generateGroup() {
    try {
      const res = await fetch("/api/group", { method: "GET" });
      if (!res.ok) throw new Error("Failed to generate group");
      await loadGroups();
    } catch (err) {
      console.error("Error generating group:", err);
      alert("Failed to generate group. Check your OpenAI API key.");
    }
  }

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Groups</h1>

      <Button onClick={generateGroup} variant="default" className="mb-6" size="default">
        Generate New Group
      </Button>

      <div className="space-y-6">
        {groups.map((g, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-brand-700">Group #{index + 1}</h2>
              {g.scheduledAt && (
                <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded">
                  📅 {new Date(g.scheduledAt).toLocaleString()}
                </span>
              )}
            </div>

            {g.scheduledAt && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Scheduled for:</strong> {new Date(g.scheduledAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-3"><strong>Why this group works:</strong></p>
              <p className="text-sm italic text-slate-600 bg-slate-50 p-3 rounded">{g.explanation || g.reason}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Members:</p>
              <ul className="space-y-1">
                {g.members.map((m: any) => (
                  <li key={m.id} className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    {m.name} — {m.email}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
