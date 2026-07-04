"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

interface PaymentType {
  _id: string;
  enrolledAt: string;
  user: {
    name: string;
    email: string;
  };
  course: {
    title: string;
    slug: string;
  };
  payment: {
    amount: number;
    currency: string;
    status: "pending" | "paid" | "failed";
    paymentId?: string;
  };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const statusParam = statusFilter === "all" ? "" : statusFilter;
      const res = await axios.get(`/api/admin/payments?page=${page}&limit=10&status=${statusParam}`);
      setPayments(res.data.payments);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page, statusFilter]);

  const columns = [
    {
      header: "User",
      cell: (pay: PaymentType) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{pay.user?.name || "Unknown"}</span>
          <span className="text-xs text-slate-400">{pay.user?.email || "No Email"}</span>
        </div>
      ),
    },
    {
      header: "Course",
      cell: (pay: PaymentType) => (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {pay.course?.title || "Unknown Course"}
        </span>
      ),
    },
    {
      header: "Amount",
      cell: (pay: PaymentType) => (
        <span className="font-bold text-slate-900 dark:text-white">
          ₹{pay.payment?.amount?.toLocaleString("en-IN") || 0}
        </span>
      ),
    },
    {
      header: "Payment ID",
      cell: (pay: PaymentType) => (
        <span className="text-xs text-slate-400 font-mono">
          {pay.payment?.paymentId || "N/A"}
        </span>
      ),
    },
    {
      header: "Date",
      cell: (pay: PaymentType) => (
        <span className="text-xs text-slate-500">
          {new Date(pay.enrolledAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (pay: PaymentType) => (
        <StatusBadge status={pay.payment?.status || "pending"} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
          <p className="text-sm text-slate-500 font-medium">Monitor course enrollments and transaction statuses.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Filter Status:</span>
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        data={payments}
        columns={columns}
        serverSide
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
        isLoading={loading}
      />
    </div>
  );
}
