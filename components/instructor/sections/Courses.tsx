"use client";
import React, { useState } from "react";

const Courses = () => {
  const [form, setForm] = useState({ name: "", code: "", department: "", description: "" });
  const [courses, setCourses] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code || !form.department) return alert("Fill all required fields.");
    setCourses([...courses, { ...form, id: Date.now() }]);
    setForm({ name: "", code: "", department: "", description: "" });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create Course</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Course Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Course Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default Courses;
