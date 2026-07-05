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
  }, []);

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Instructor Requests</h1>
        <p className="text-sm text-slate-500 font-medium">Approve or reject pending instructor applications.</p>
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
