"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface ContactType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  method: string;
  message?: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/contacts");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (msg: ContactType) => (
        <span className="font-semibold text-slate-900 dark:text-white">
          {msg.name}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Contact Info",
      cell: (msg: ContactType) => (
        <div className="flex flex-col text-xs text-slate-500">
          <span className="flex items-center gap-1">Method: <StatusBadge status={msg.method} className="scale-90" /></span>
          {msg.phone && <span>Phone: {msg.phone}</span>}
        </div>
      ),
    },
    {
      header: "Message",
      accessorKey: "message",
      cell: (msg: ContactType) => (
        <p className="text-slate-600 dark:text-slate-300 max-w-md whitespace-pre-wrap leading-relaxed text-xs">
          {msg.message || "No message content."}
        </p>
      ),
    },
    {
      header: "Submitted At",
      cell: (msg: ContactType) => (
        <span className="text-xs text-slate-400">
          {new Date(msg.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact Inbox</h1>
        <p className="text-sm text-slate-500 font-medium">Read feedback and queries submitted through the public contact form.</p>
      </div>

      <DataTable
        data={messages}
        columns={columns}
        isLoading={loading}
      />
    </div>
  );
}
