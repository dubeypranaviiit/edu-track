import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Enrollment from "@/models/enrollment.model";
import { requireRole } from "@/lib/auth/requireRole";

// Pre-load referenced models so Mongoose doesn't throw Schema errors during populate
import "@/models/user";
import "@/models/Course/course";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authResult = await requireRole(["admin"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const status = searchParams.get("status") || "";
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status) {
      query["payment.status"] = status;
    }

    const payments = await Enrollment.find(query)
      .populate("user", "name email clerkId")
      .populate("course", "title slug")
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Enrollment.countDocuments(query);

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
