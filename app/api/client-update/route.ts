import { NextRequest, NextResponse } from "next/server";
import { generateStructuredAI } from "@/lib/openai";
import { CLIENT_REPORTER_PROMPT } from "@/prompts/clientReporter";
import { ClientUpdate } from "@/types/recruitment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { activityData } = body;

    if (!activityData || typeof activityData !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing activity data" },
        { status: 400 }
      );
    }

    const result = await generateStructuredAI<ClientUpdate>(
      CLIENT_REPORTER_PROMPT,
      `Generate a weekly update email based on this raw data:\n\n${activityData}`
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/client-update:", error);
    return NextResponse.json(
      { error: "Failed to generate client update. Please try again." },
      { status: 500 }
    );
  }
}
