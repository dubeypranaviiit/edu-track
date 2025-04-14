// 'use client';

// import { useState } from 'react';
// import axios from 'axios'; // Add axios for API calls
// import { Button } from '@/components/ui/button';
// import { uploadToCloudinary } from '@/lib/cloudinaryUpload'; // Import cloudinary helper function

// interface UploadButtonProps {
//   onUpload: (url: string) => void; // Callback to pass uploaded URL to parent component
// }

// export const UploadButton = ({ onUpload }: UploadButtonProps) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     setError(null); // Reset any previous error message
// // 
//     try {
//       // Upload file to Cloudinary and get the secure URL
//       const fileUrl = await uploadToCloudinary(file, 'your_folder_name'); // Specify the folder name
//       onUpload(fileUrl); // Send the URL back to the parent component
//     } catch (error) {
//       setError('Failed to upload file. Please try again.');
//       console.error('Upload failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         onChange={handleUpload}
//         className="block mb-2 text-sm text-gray-500"
//       />
//       {loading && <p className="text-gray-500">Uploading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <Button variant="outline" size="sm" disabled={loading}>
//         Upload File
//       </Button>
//     </div>
//   );
// };
