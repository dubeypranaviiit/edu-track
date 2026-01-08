import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
export default function useInstructorId() {
  const { profile } = useUserStore();
  const [instructorId, setInstructorId] = useState<string | null>(null);

  useEffect(() => {
    if (!profile?.clerkId) return;

    const fetchMongoId = async () => {
      try {
        const res = await axios.get(`/api/users/${profile.clerkId}`);
        setInstructorId(res.data._id); // Mongo ObjectId
      } catch (err) {
        console.error("Error fetching instructor Mongo ID", err);
      }
    };

    fetchMongoId();
  }, [profile]);

  return instructorId;
}
