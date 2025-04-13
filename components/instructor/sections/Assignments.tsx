"use client";

import React, { useState } from "react";
import Image from "next/image";

interface UploadedFile {
  type: "file" | "text";
  file?: File;
  previewUrl?: string;
  textContent?: string;
  course: string;
  topic: string;
  subtopic?: string;
}

const Assignments = () => {
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [assignmentType, setAssignmentType] = useState<"file" | "text">("file");
  const [textAssignment, setTextAssignment] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [uploadedAssignments, setUploadedAssignments] = useState<UploadedFile[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setPreviewFile(file);
    setFilePreview(previewUrl);
  };

  const handleUpload = () => {
    if (!course || !topic) {
      alert("Course and Topic are required");
      return;
    }

    if (assignmentType === "file") {
      if (!previewFile || !filePreview) {
        alert("Please select a file to upload.");
        return;
      }

      const newFile: UploadedFile = {
        type: "file",
        file: previewFile,
        previewUrl: filePreview,
        course,
        topic,
        subtopic,
      };

      setUploadedAssignments((prev) => [newFile, ...prev]);
    } else {
      if (!textAssignment.trim()) {
        alert("Text content cannot be empty.");
        return;
      }

      const newTextAssignment: UploadedFile = {
        type: "text",
        textContent: textAssignment.trim(),
        course,
        topic,
        subtopic,
      };

      setUploadedAssignments((prev) => [newTextAssignment, ...prev]);
    }

    // Clear inputs
    setCourse("");
    setTopic("");
    setSubtopic("");
    setPreviewFile(null);
    setFilePreview(null);
    setTextAssignment("");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Upload Assignment</h2>

      {/* Input fields */}
      <div className="grid gap-3 mb-4">
        <input
          type="text"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Subtopic (optional)"
          value={subtopic}
          onChange={(e) => setSubtopic(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />

        {/* Type toggle */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="file"
              checked={assignmentType === "file"}
              onChange={() => setAssignmentType("file")}
            />
            <span className="text-sm text-gray-700 dark:text-white">File Assignment</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="text"
              checked={assignmentType === "text"}
              onChange={() => setAssignmentType("text")}
            />
            <span className="text-sm text-gray-700 dark:text-white">Text Assignment</span>
          </label>
        </div>

        {assignmentType === "file" ? (
          <input
            type="file"
            accept="*/*"
            onChange={(e) => handleFileChange(e.target.files)}
            className="w-full"
          />
        ) : (
          <textarea
            value={textAssignment}
            onChange={(e) => setTextAssignment(e.target.value)}
            placeholder="Enter text-based assignment"
            rows={5}
            className="w-full px-3 py-2 border rounded-md"
          />
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </div>

      {/* Preview */}
      {assignmentType === "file" && filePreview && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Preview</h3>
          {previewFile?.type.startsWith("image/") ? (
            <Image
              src={filePreview}
              alt="Preview"
              width={300}
              height={200}
              className="rounded-md object-cover"
            />
          ) : previewFile?.type === "application/pdf" ? (
            <iframe
              src={filePreview}
              title="PDF Preview"
              width="100%"
              height="400"
              className="border rounded-md"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Preview not available for this file type.</p>
          )}
        </div>
      )}

      {assignmentType === "text" && textAssignment.trim() && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Text Preview</h3>
          <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-700 dark:text-gray-200">
            {textAssignment}
          </p>
        </div>
      )}

      <hr className="border-dashed border-gray-400 my-6" />

      {/* Uploaded Assignments */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Uploaded Assignments</h3>
      <div className="space-y-4">
        {uploadedAssignments.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 border rounded-md">
            <p className="text-gray-800 dark:text-gray-100">
              <strong>Course:</strong> {item.course}
            </p>
            <p className="text-gray-800 dark:text-gray-100">
              <strong>Topic:</strong> {item.topic}
            </p>
            {item.subtopic && (
              <p className="text-gray-800 dark:text-gray-100">
                <strong>Subtopic:</strong> {item.subtopic}
              </p>
            )}

            {item.type === "file" && (
              <>
                <p className="mt-2 text-gray-700 dark:text-gray-200">{item.file?.name}</p>
                {item.file?.type.startsWith("image/") && item.previewUrl && (
                  <Image
                    src={item.previewUrl}
                    alt="Uploaded"
                    width={250}
                    height={180}
                    className="mt-2 rounded-md object-cover"
                  />
                )}
                {item.file?.type === "application/pdf" && item.previewUrl && (
                  <iframe
                    src={item.previewUrl}
                    title="Uploaded PDF"
                    width="100%"
                    height="300"
                    className="mt-2 rounded-md border"
                  />
                )}
              </>
            )}

            {item.type === "text" && (
              <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {item.textContent}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
