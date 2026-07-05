import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import SiteSetting from "@/models/siteSetting";
import { requireRole } from "@/lib/auth/requireRole";

export async function GET() {
  try {
    await connectDB();
    const setting = await SiteSetting.findOne({ key: "instructor_vacancy_open" });
    return NextResponse.json({ vacancyOpen: setting?.value === true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ vacancyOpen: false });
  }
}

export async function PATCH(req: NextRequest) {
  const authResult = await requireRole(["admin"]);
  if ("error" in authResult)
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  try {
    await connectDB();
    const { open } = await req.json();

    const setting = await SiteSetting.findOneAndUpdate(
      { key: "instructor_vacancy_open" },
      { value: open },
      { upsert: true, new: true }
    );

    return NextResponse.json({ vacancyOpen: setting.value });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
