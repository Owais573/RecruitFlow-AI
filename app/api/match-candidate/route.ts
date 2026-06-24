import { NextRequest, NextResponse } from "next/server";
import { generateStructuredAI } from "@/lib/openai";
import { CANDIDATE_MATCHER_PROMPT } from "@/prompts/candidateMatcher";
import { CandidateMatch } from "@/types/recruitment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription, candidateProfile } = body;

    if (!jobDescription || !candidateProfile) {
      return NextResponse.json(
        { error: "Missing job description or candidate profile" },
        { status: 400 }
      );
    }

    const result = await generateStructuredAI<CandidateMatch>(
      CANDIDATE_MATCHER_PROMPT,
      `=== JOB DESCRIPTION ===\n${jobDescription}\n\n=== CANDIDATE PROFILE ===\n${candidateProfile}`
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/match-candidate:", error);
    return NextResponse.json(
      { error: "Failed to match candidate. Please try again." },
      { status: 500 }
    );
  }
}
