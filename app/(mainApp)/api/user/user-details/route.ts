import { backendClient } from "@/sanity/lib/backendClient";
import { UserI } from "@/types";
import { NextRequest, NextResponse } from "next/server";




// Define the type for expected fields in the body


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {user} = body;
    console.log("Received body:", body);

    if (!user.id) {
      return NextResponse.json({ success: false, error: "clerkUserId is required" }, { status: 400 });
    }

    // Step 1: Check if user already exists
    const existingUser = await backendClient.fetch(
      `*[_type == "user" && clerkUserId == $clerkUserId][0]`,
      { clerkUserId: user.id }
    );
    console.log(existingUser);
    

    if (existingUser) {
        console.log("user does exists");    
        return NextResponse.json({ success: true, user: existingUser }, { status: 200 });
    }
    console.log("user does not exists");    

    // Step 2: If not found, create the user with default or provided values
    const newUser = await backendClient.create({
      _type: "user",
      clerkUserId: user.id,
      createdAt: new Date().toISOString(),
      firstName: user.firstName || "Guest",
      lastName: user.lastName || "",
      primaryEmail: user.primaryEmailAddress.emailAddress || "",
      imageUrl: user.imageUrl || "",
      phone: user.phone || "",
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/user-details:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
