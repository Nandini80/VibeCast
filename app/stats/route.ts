import { NextResponse } from "next/server";

type Result = {
  name: string;
  vibe: keyof typeof globalStats.vibeDistribution;
  score: number;
  timestamp: number;
};

// Simulated database
const globalStats = {
  totalUsers: 1247,
  vibeDistribution: {
    chill: 312,
    party: 298,
    wholesome: 356,
    mysterious: 281,
  },
  recentResults: [] as Result[],
};

export async function GET() {
  globalStats.totalUsers += Math.floor(Math.random() * 3); // Simulate new users

  return NextResponse.json(globalStats);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, vibe, score } = body;

  globalStats.totalUsers += 1;
  globalStats.vibeDistribution[
    vibe as keyof typeof globalStats.vibeDistribution
  ] += 1;

  globalStats.recentResults.unshift({
    name,
    vibe,
    score,
    timestamp: Date.now(),
  });

  if (globalStats.recentResults.length > 100) {
    globalStats.recentResults = globalStats.recentResults.slice(0, 100);
  }

  return NextResponse.json({ success: true, stats: globalStats });
}
