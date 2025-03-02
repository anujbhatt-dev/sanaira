import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    console.log("hit get");

    // Log request headers
    console.log("Headers:", req.headers);

    // Log request method
    console.log("Method:", req.method);

    // Log URL
    console.log("URL:", req.url);

    return Response.json({ message: "hit" });
}

export async function POST(req: NextRequest) {
    console.log("hit post");

    try {
        // Read JSON body
        const body = await req.json();
        console.log("Body:", body);
    } catch (error) {
        console.error("Error reading body:", error);
    }

    return Response.json({ message: "hit" });
}
