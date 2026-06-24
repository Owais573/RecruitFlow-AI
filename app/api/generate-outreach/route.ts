import { NextRequest, NextResponse } from "next/server";
import { generateStructuredAI } from "@/lib/openai";
import { OUTREACH_AGENT_PROMPT } from "@/prompts/outreachAgent";
import { OutreachMessages } from "@/types/recruitment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidateInfo, jobInfo } = body;

    if (!candidateInfo || !jobInfo) {
      return NextResponse.json(
        { error: "Missing candidate or job information" },
        { status: 400 }
      );
    }

    const result = await generateStructuredAI<OutreachMessages>(
      OUTREACH_AGENT_PROMPT,
      `=== CANDIDATE INFO ===\n${candidateInfo}\n\n=== TARGET JOB ===\n${jobInfo}`
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/generate-outreach:", error);
    return NextResponse.json(
      { error: "Failed to generate outreach messages. Please try again." },
      { status: 500 }
    );
  }
}
