"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import ToastContainer, { useToast } from "@/components/Toast";

type Applicant = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  dietary?: string;
  interests?: string;
  AI: any;
  status: string;
};

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const { toasts, addToast, removeToast } = useToast();

  async function loadData() {
    try {
      const res = await fetch("/api/applicants");
      if (!res.ok) throw new Error("Failed to fetch applicants");
      const json = await res.json();
      setApplicants(json.applicants || []);
    } catch (err) {
      console.error("Error loading applicants:", err);
      addToast("Failed to load applicants", "error");
    }
  }

  async function overrideDecision(id: string, decision: string) {
    try {
      const res = await fetch("/api/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, decision }),
      });
      if (!res.ok) throw new Error("Failed to update");
      addToast(`Applicant ${decision}ed successfully`, "success");
      loadData();
    } catch (err) {
      console.error("Error updating applicant:", err);
      addToast("Failed to update applicant", "error");
    }
  }

  async function deleteApplicant(id: string) {
    try {
      const res = await fetch("/api/override", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      addToast("Applicant deleted successfully", "success");
      loadData();
    } catch (err) {
      console.error("Error deleting applicant:", err);
      addToast("Failed to delete applicant", "error");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Applicants</h1>
        <div className="text-sm text-slate-500">{applicants.length} applicants</div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {applicants.map((item) => (
          <Card key={item.id} className="bg-white shadow-md hover:shadow-2xl transform-gpu motion-safe:transition motion-safe:duration-300 motion-safe:ease-out hover:-translate-y-2 hover:scale-[1.05] border border-slate-200 hover:border-brand-200">
            <CardHeader>
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="text-sm">{item.email}</CardDescription>
              </div>
              <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === "accept"
                      ? "bg-brand-50 text-brand-700"
                      : item.status === "reject"
                      ? "bg-red-50 text-red-700"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-2"><strong>AI Score:</strong> {item.AI?.score ?? "—"}</p>
              <p className="text-sm italic text-slate-600">{item.AI?.reason ?? "No reason provided"}</p>
            </CardContent>

            <CardFooter>
              <div className="flex gap-3 mt-2">
                <Button onClick={() => overrideDecision(item.id, "accept")} variant="default" size="sm">
                  Accept
                </Button>

                <Button onClick={() => overrideDecision(item.id, "reject")} variant="destructive" size="sm">
                  Reject
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{item.name}</DialogTitle>
                      <DialogDescription className="text-base">{item.email}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">Status:</span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === "accept"
                              ? "bg-brand-50 text-brand-700"
                              : item.status === "reject"
                              ? "bg-red-50 text-red-700"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* AI Evaluation Section */}
                      <div className="border-t pt-4">
                        <h3 className="font-semibold text-slate-900 mb-2">AI Evaluation</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Score:</span>
                            <span className="font-medium">{item.AI?.score ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-slate-600 block mb-1">Assessment:</span>
                            <p className="italic text-slate-700">{item.AI?.reason ?? "No assessment provided"}</p>
                          </div>
                          {item.AI?.confidence && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">Confidence:</span>
                              <span className="font-medium">{(item.AI.confidence * 100).toFixed(0)}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bio Section */}
                      {item.bio && (
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-slate-900 mb-2">Bio</h3>
                          <p className="text-sm text-slate-700">{item.bio}</p>
                        </div>
                      )}

                      {/* Dietary Preferences Section */}
                      {item.dietary && (
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-slate-900 mb-2">Dietary Preferences</h3>
                          <p className="text-sm text-slate-700">{item.dietary}</p>
                        </div>
                      )}

                      {/* Interests Section */}
                      {item.interests && (
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-slate-900 mb-2">Interests</h3>
                          <p className="text-sm text-slate-700">{item.interests}</p>
                        </div>
                      )}
                    </div>

                    <DialogFooter className="flex gap-2">
                      <Button variant="outline" onClick={() => overrideDecision(item.id, "accept")}>
                        Accept
                      </Button>
                      <Button variant="destructive" onClick={() => overrideDecision(item.id, "reject")}>
                        Reject
                      </Button>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {item.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button variant="destructive" onClick={() => deleteApplicant(item.id)}>
                          Delete
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
