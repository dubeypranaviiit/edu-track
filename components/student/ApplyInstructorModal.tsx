"use client";
import { useState } from "react";
import axios from "axios";
import { X, Loader2 } from "lucide-react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplyInstructorModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    bio: "",
    expertise: "",
    experience: "",
    linkedinUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!form.bio.trim() || !form.expertise.trim() || !form.experience.trim()) {
      setError("Bio, expertise, and experience are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/instructor/apply", form);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Apply to Become an Instructor</h2>
            <p className="text-sm text-gray-400 mt-0.5">Your application will be reviewed by the admin team.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about yourself as an educator..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area of Expertise <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Web Development, Data Science, UI/UX Design"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.expertise}
              onChange={(e) => setForm({ ...form, expertise: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teaching / Work Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe your relevant experience in teaching or industry..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
