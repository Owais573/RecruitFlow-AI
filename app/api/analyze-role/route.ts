import { NextRequest, NextResponse } from "next/server";
import { generateStructuredAI } from "@/lib/openai";
import { ROLE_ANALYZER_PROMPT } from "@/prompts/roleAnalyzer";
import { RoleAnalysis } from "@/types/recruitment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing job description" },
        { status: 400 }
      );
    }

    const result = await generateStructuredAI<RoleAnalysis>(
      ROLE_ANALYZER_PROMPT,
      `Analyze the following job description:\n\n${jobDescription}`
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/analyze-role:", error);
    return NextResponse.json(
      { error: "Failed to analyze role. Please try again." },
      { status: 500 }
    );
  }
}
