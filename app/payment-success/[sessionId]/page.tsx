"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SuccessProps {
  params: { sessionId: string };
}

const PaymentSuccessPage = ({ params }: SuccessProps) => {
  const sessionId = params.sessionId; // destructure safely
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Processing your enrollment...");
  const router = useRouter();

  useEffect(() => {
    const createEnrollment = async () => {
      try {
        const res = await axios.post("/api/payment/confirm", { sessionId });
        if (res.data.success) {
          setMessage(" Payment successful! You are now enrolled in the course.");
        } else {
          setMessage("⚠ Something went wrong. Contact support.");
        }
      } catch (err) {
        console.error(err);
        setMessage(" Enrollment creation failed. Contact support.");
      } finally {
        setLoading(false);
      }
    };

    createEnrollment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg text-center space-y-4">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
