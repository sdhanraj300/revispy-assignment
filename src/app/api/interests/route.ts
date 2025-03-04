import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category
      .findMany()
      .then((categories) => categories.map((category) => category.name));
    return NextResponse.json({ message: "All Categories Fetched", categories });
  } catch (error) {
    console.error("Error Fetching Categories", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
    const { interests,email } = await req.json();
    const user = await prisma.user.findUnique({
        where: { email},
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const existingInterests = user.interestedCategories;
    console.log(existingInterests);
    const newInterests = [...new Set([...existingInterests, ...interests])];
    console.log(newInterests);
     await prisma.user.update({
        where: { email },
        data: {
            interestedCategories: interests,
        },
    });
    return NextResponse.json({ message: "Interests updated successfully" });

}
