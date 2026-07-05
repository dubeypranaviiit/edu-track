"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { Briefcase, Clock, X } from "lucide-react";
import ApplyInstructorModal from "./ApplyInstructorModal";

export default function InstructorApplyBanner() {
  const { profile } = useUserStore();
  const [vacancyOpen, setVacancyOpen] = useState(false);
  const [appStatus, setAppStatus] = useState<"none" | "pending" | "approved" | "rejected">("none");
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!profile || profile.role !== "student") return;

    Promise.all([
      axios.get("/api/admin/vacancy"),
      axios.get("/api/instructor/apply"),
    ]).then(([vacRes, appRes]) => {
      setVacancyOpen(vacRes.data.vacancyOpen);
      setAppStatus(appRes.data.status);
    }).catch(console.error)
      .finally(() => setLoaded(true));
  }, [profile]);

  if (!loaded || !profile || profile.role !== "student") return null;
  if (!vacancyOpen && appStatus === "none") return null;
  if (dismissed) return null;

  if (appStatus === "approved") return null;

  if (appStatus === "pending") {
    return (
      <div className="mx-4 mb-4 flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <Clock size={20} className="text-yellow-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-yellow-800">Application Under Review</p>
          <p className="text-xs text-yellow-600 mt-0.5">Our team is reviewing your instructor application. You'll be notified on approval.</p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-yellow-400 hover:text-yellow-600 cursor-pointer">
          <X size={16} />
        </button>
      </div>
    );
  }

  if (appStatus === "rejected" && vacancyOpen) {
    return (
      <div className="mx-4 mb-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
        <X size={20} className="text-red-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">Application Not Approved</p>
          <p className="text-xs text-red-600 mt-0.5">Your previous application was rejected. You may apply again while vacancy is open.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 flex-shrink-0 cursor-pointer"
        >
          Re-apply
        </button>
      </div>
    );
  }

  if (vacancyOpen && appStatus === "none") {
    return (
      <>
        <div className="mx-4 mb-4 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Briefcase size={18} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-blue-800">Instructor Vacancy Open</p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium animate-pulse">
                Hiring
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-0.5">
              We're looking for instructors. Share your expertise and start teaching today.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex-shrink-0 transition cursor-pointer"
          >
            Apply Now
          </button>
          <button onClick={() => setDismissed(true)} className="text-blue-300 hover:text-blue-500 ml-1 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {showModal && (
          <ApplyInstructorModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              setAppStatus("pending");
            }}
          />
        )}
      </>
    );
  }

  return null;
}
