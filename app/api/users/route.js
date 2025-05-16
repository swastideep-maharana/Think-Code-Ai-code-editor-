// app/api/users/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const users = await User.find({});
  return Response.json(users);
}
