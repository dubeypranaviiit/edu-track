"use client";

import { useEffect, useState, startTransition } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Shield, UserMinus, UserCheck, MoreVertical } from "lucide-react";

interface UserType {
  clerkId: string;
  email: string;
  name: string;
  role: "student" | "instructor" | "admin";
  isActive: boolean;
  instructorStatus: "none" | "pending" | "approved" | "rejected";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [actionType, setActionType] = useState<"suspend" | "activate" | "role_change" | null>(null);
  const [pendingRole, setPendingRole] = useState<"student" | "instructor" | "admin" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/users?page=${page}&limit=10&search=${search}`);
      setUsers(res.data.users);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleAction = async () => {
    if (!selectedUser || !actionType) return;
    try {
      setActionLoading(true);
      if (actionType === "suspend" || actionType === "activate") {
        const nextStatus = actionType === "activate";
        await axios.patch(`/api/admin/users/${selectedUser.clerkId}/status`, { isActive: nextStatus });
        toast.success(`User successfully ${nextStatus ? "activated" : "suspended"}`);
      } else if (actionType === "role_change" && pendingRole) {
        await axios.patch(`/api/admin/users/${selectedUser.clerkId}/role`, { role: pendingRole });
        toast.success(`User role successfully changed to ${pendingRole}`);
      }
      setConfirmOpen(false);
      fetchUsers();
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
      cell: (user: UserType) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</span>
          <span className="text-xs text-slate-400 font-mono">{user.clerkId}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      cell: (user: UserType) => <StatusBadge status={user.role} />,
    },
    {
      header: "Status",
      cell: (user: UserType) => (
        <StatusBadge status={user.isActive ? "active" : "suspended"} />
      ),
    },
    {
      header: "Actions",
      cell: (user: UserType) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(user);
                setActionType(user.isActive ? "suspend" : "activate");
                setConfirmOpen(true);
              }}
              className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {user.isActive ? (
                <>
                  <UserMinus className="size-4 text-rose-500" />
                  <span className="text-rose-500">Suspend User</span>
                </>
              ) : (
                <>
                  <UserCheck className="size-4 text-emerald-500" />
                  <span className="text-emerald-500">Reactivate User</span>
                </>
              )}
            </DropdownMenuItem>

            {}
            {["student", "instructor", "admin"].map((roleOpt) => {
              if (user.role === roleOpt) return null;
              return (
                <DropdownMenuItem
                  key={roleOpt}
                  onClick={() => {
                    setSelectedUser(user);
                    setActionType("role_change");
                    setPendingRole(roleOpt as any);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="size-4 text-blue-500" />
                  <span>Make {roleOpt}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-sm text-slate-500">View details, suspend accounts, and update roles.</p>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search by name or email..."
        serverSide
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
        onSearchChange={(s) => {
          startTransition(() => {
            setSearch(s);
            setPage(1);
          });
        }}
        isLoading={loading}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={
          actionType === "suspend"
            ? "Suspend User Account?"
            : actionType === "activate"
            ? "Reactivate User Account?"
            : `Change Role to ${pendingRole}?`
        }
        description={
          actionType === "suspend"
            ? `Are you sure you want to suspend ${selectedUser?.name}? They will lose access to all course resources.`
            : actionType === "activate"
            ? `Are you sure you want to reactivate ${selectedUser?.name}? Their access will be restored.`
            : `Are you sure you want to update the role of ${selectedUser?.name} from ${selectedUser?.role} to ${pendingRole}?`
        }
        confirmText="Proceed"
        variant={actionType === "suspend" ? "destructive" : "default"}
        onConfirm={handleAction}
        isLoading={actionLoading}
      />
    </div>
  );
}
