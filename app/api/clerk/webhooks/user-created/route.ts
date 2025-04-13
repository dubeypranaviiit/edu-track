// app/api/clerk/webhooks/user-created/route.ts

import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const event = await req.json();

  if (event.type === "user.created") {
    const userId = event.data.id;

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "student", 
      },
    });
  }

  return NextResponse.json({ message: "OK" });
}
