"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface RequestType {
  _id: string;
  clerkId: string;
  email: string;
  name: string;
  instructorStatus: "none" | "pending" | "approved" | "rejected";
}

export default function AdminInstructorsPage() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [vacancyOpen, setVacancyOpen] = useState(false);
  const [vacancyLoading, setVacancyLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/instructor-requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    axios.get("/api/admin/vacancy").then((res) => {
      setVacancyOpen(res.data.vacancyOpen);
    });
  }, []);

  const toggleVacancy = async () => {
    setVacancyLoading(true);
    try {
      const res = await axios.patch("/api/admin/vacancy", { open: !vacancyOpen });
      setVacancyOpen(res.data.vacancyOpen);
      toast.success(`Instructor vacancy ${res.data.vacancyOpen ? "opened" : "closed"}`);
    } catch {
      toast.error("Failed to update vacancy");
    } finally {
      setVacancyLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedRequest || !actionType) return;
    try {
      setActionLoading(true);
      const status = actionType === "approve" ? "approved" : "rejected";
      await axios.patch(`/api/admin/instructor-requests/${selectedRequest.clerkId}`, { status });
      toast.success(`Request successfully ${status}`);
      setConfirmOpen(false);
      fetchRequests();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (req: RequestType) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{req.name}</span>
          <span className="text-xs text-slate-400 font-mono">{req.clerkId}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      cell: (req: RequestType) => <StatusBadge status={req.instructorStatus} />,
    },
    {
      header: "Actions",
      cell: (req: RequestType) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => {
              setSelectedRequest(req);
              setActionType("approve");
              setConfirmOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
          >
            <Check className="size-4 mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setSelectedRequest(req);
              setActionType("reject");
              setConfirmOpen(true);
            }}
            className="cursor-pointer"
          >
            <X className="size-4 mr-1" />
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Instructor Requests</h1>
          <p className="text-sm text-slate-500 font-medium">Approve or reject pending instructor applications.</p>
        </div>

        <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-gray-800">Instructor Vacancy</p>
            <p className="text-xs text-gray-400">
              {vacancyOpen ? "Apply button visible to students" : "Apply button hidden from students"}
            </p>
          </div>
          <button
            onClick={toggleVacancy}
            disabled={vacancyLoading}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 cursor-pointer ${
              vacancyOpen ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                vacancyOpen ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs font-medium ${vacancyOpen ? "text-green-600" : "text-gray-400"}`}>
            {vacancyLoading ? "..." : vacancyOpen ? "OPEN" : "CLOSED"}
          </span>
        </div>
      </div>

      <DataTable
        data={requests}
        columns={columns}
        isLoading={loading}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={actionType === "approve" ? "Approve Instructor Application?" : "Reject Instructor Application?"}
        description={
          actionType === "approve"
            ? `Are you sure you want to approve ${selectedRequest?.name} as an instructor? They will gain course creation and management capabilities.`
            : `Are you sure you want to reject the application from ${selectedRequest?.name}?`
        }
        confirmText="Confirm"
        variant={actionType === "reject" ? "destructive" : "default"}
        onConfirm={handleAction}
        isLoading={actionLoading}
      />
    </div>
  );
}
