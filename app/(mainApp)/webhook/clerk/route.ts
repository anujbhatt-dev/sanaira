import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const eventType = body?.type;
    const user = body?.data;

    if (!user || !user.id) {
      return NextResponse.json({ message: "Invalid user data" }, { status: 400 });
    }

    if (eventType === "user.created") {
      const clerkUserId = user.id;

      // Check if user already exists in Sanity
      const existingUser = await backendClient.fetch(
        `*[_type == "user" && clerkUserId == $clerkUserId][0]`,
        { clerkUserId }
      );

      if (existingUser) {
        console.log("User already exists in Sanity");
        
        return NextResponse.json({ message: "User already exists in Sanity" }, { status: 200 });
      }

      const doc = {
        _type: "user",
        clerkUserId: user.id,
        createdAt: new Date(user.created_at).toISOString(),
        lastActiveAt: user.last_active_at ? new Date(user.last_active_at).toISOString() : null,
        firstName: user.first_name,
        lastName: user.last_name,
        primaryEmail: user.email_addresses?.[0]?.email_address || "",
        phone: user.phone_numbers?.[0]?.phone_number || "",
        imageUrl: user.image_url,
        shippingDetails: {
          _type: "shippingDetails",
          clerkUserId: user.id,
          name: user.first_name || "",
          phone: user.phone_numbers?.[0]?.phone_number || "",
          address: {
            _type: "address",
            line1: "",
            line2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
          },
        },
      };

      await backendClient.create(doc);

      return NextResponse.json({ message: "User created in Sanity" }, { status: 201 });
    }

    return NextResponse.json({ message: "Unhandled event type" }, { status: 200 });

  } catch (error) {
    console.error("Clerk webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
