import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import Course from "@/models/Course/course";
import Enrollment from "@/models/enrollment.model";
import AdminAction from "@/models/adminAction";
import { requireRole } from "@/lib/auth/requireRole";
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Clock
} from "lucide-react";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectDB();
  const authResult = await requireRole(["admin"]);
  if ("error" in authResult) {
    redirect("/");
  }

  
  const totalUsers = await User.countDocuments();
  const totalCourses = await Course.countDocuments();
  const pendingRequests = await User.countDocuments({ instructorStatus: "pending" });

  const revenueResult = await Enrollment.aggregate([
    { $match: { "payment.status": "paid" } },
    { $group: { _id: null, total: { $sum: "$payment.amount" } } }
  ]);
  const totalRevenue = revenueResult[0]?.total || 0;

  
  const recentActions = await AdminAction.find()
    .populate("admin", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
    { label: "Total Courses", value: totalCourses, icon: BookOpen, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400" },
    { label: "Revenue", value: `₹${(totalRevenue).toLocaleString("en-IN")}`, icon: DollarSign, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { label: "Pending Approvals", value: pendingRequests, icon: Clock, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400" },
  ];

  return (
    <div className="space-y-8">
      {}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome to your EduTrack Admin Dashboard.</p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-xs flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</span>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <Icon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      {}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Admin Actions</h2>
          <span className="text-xs text-slate-400">Latest 5 events</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {recentActions.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No admin actions logged yet.</p>
          ) : (
            recentActions.map((action: any, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between text-sm">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    {action.admin?.name || "System Admin"} <span className="font-normal text-slate-500">performed</span> <span className="capitalize text-blue-600 dark:text-blue-400 font-semibold">{action.action.replace("_", " ")}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Target: {action.targetType} ({String(action.targetId)})
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-xs text-slate-400">
                    {new Date(action.createdAt).toLocaleString("en-IN")}
                  </span>
                  {action.meta && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {JSON.stringify(action.meta)}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
