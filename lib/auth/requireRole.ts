import { auth } from "@clerk/nextjs/server";
import User, { Role } from "@/models/user";
import { connectDB } from "@/lib/mongoose";

export async function requireRole(allowed: Role[]) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized", status: 401 };
  
  await connectDB();
  const user = await User.findOne({ clerkId: userId });
  if (!user || !allowed.includes(user.role)) {
    return { error: "Forbidden", status: 403 };
  }
  
  return { user };
}
