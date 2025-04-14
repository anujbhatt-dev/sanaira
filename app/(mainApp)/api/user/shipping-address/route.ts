// app/api/user/shipping/route.ts

import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerkUserId");

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

    const query = `
      *[_type == "user" && clerkUserId == $clerkUserId][0]{
        shippingDetails {
          name,
          phone,
          address {
            line1,
            line2,
            city,
            state,
            postal_code,
            country
          }
        }
      }
    `;

    const result = await backendClient.fetch(query, { clerkUserId });

    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching shipping details:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
