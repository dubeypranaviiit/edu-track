"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
 // your store for courses
import useInstructorId from "@/lib/hooks/useInstructorId"; // custom hook
import { useCourseStore } from "@/store/useCourseStore";
export default function AddAssignmentForm() {
  const instructorId = useInstructorId(); // get logged-in instructor ID directly

  const { courses, fetchCourses, loadingCourses } = useCourseStore();

  const [formData, setFormData] = useState({
    topic: "",
    subtopic: "",
    slug: "",
    type: "text",
    textContent: "",
    file: null,
    course: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch courses for this instructor
  useEffect(() => {
    if (instructorId) fetchCourses(instructorId);
  }, [instructorId, fetchCourses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-find course ID if slug matches
    if (name === "slug") {
      const course = courses.find(c => c.slug === value);
      if (course) setFormData(prev => ({ ...prev, course: course._id }));
      else setFormData(prev => ({ ...prev, course: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorId) return toast.error("Instructor not found!");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("slug", formData.slug);
      data.append("topic", formData.topic);
      data.append("subtopic", formData.subtopic);
      data.append("type", formData.type);
      data.append("course", formData.course);
      data.append("instructor", instructorId); // sent as uploadedBy
      if (formData.type === "text") data.append("textContent", formData.textContent);
      if (formData.type === "file" && formData.file) data.append("file", formData.file);

      const res = await axios.post("/api/assignments", data);
      toast.success("Assignment created successfully!");
      setFormData({
        topic: "",
        subtopic: "",
        slug: "",
        type: "text",
        textContent: "",
        file: null,
        course: "",
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  if (loadingCourses) return <p>Loading courses...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Topic */}
        <div>
          <label>Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Enter assignment topic"
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Subtopic */}
        <div>
          <label>Subtopic</label>
          <input
            type="text"
            name="subtopic"
            value={formData.subtopic}
            onChange={handleChange}
            placeholder="Enter subtopic (optional)"
            className="w-full border rounded p-2"
          />
        </div>

        {/* Slug */}
        <div>
          <label>Course Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Enter course slug to auto-select course"
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Type */}
        <div>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </select>
        </div>

        {/* Text Content */}
        {formData.type === "text" && (
          <div>
            <label>Text Content</label>
            <textarea
              name="textContent"
              value={formData.textContent}
              onChange={handleChange}
              placeholder="Write your assignment content here"
              className="w-full border rounded p-2"
              rows={5}
              required
            />
          </div>
        )}

        {/* File Upload */}
        {formData.type === "file" && (
          <div>
            <label>Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
}
