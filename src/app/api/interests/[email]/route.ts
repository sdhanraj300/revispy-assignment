// /app/api/interests/[email]/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  try{
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const interests = user.interestedCategories;
    return NextResponse.json({ message: "Interests Fetched", interests });
  }
  catch(error){
    console.error("Error Fetching Interests", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
