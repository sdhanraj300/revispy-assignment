import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/auth"; // Ensure correct path

export async function getSession() {
  return await getServerSession(authOptions);
}
