
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface SessionData {
  amount_total: number;
  currency: string;
  customer_email: string;
  payment_status: string;
}

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await axios.get(`/api/payment/session/${sessionId}`);
        setSession(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to retrieve payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Payment Successful!</h1>
      {session && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg mb-2">
            Thank you for your purchase, <span className="font-semibold">{session.customer_email}</span>!
          </p>
          <p className="mb-2">
            Amount Paid: ₹{(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
          </p>
          <p className="mb-4">Payment Status: {session.payment_status}</p>
          <a
            href="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition"
          >
            Go to Courses
          </a>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
