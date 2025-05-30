import { NextResponse } from "next/server";

// Define the type of each result
type Result = {
  name: string;
  vibe: keyof typeof globalStats.vibeDistribution;
  score: number;
  timestamp: number;
};

// Simulated database - in production, use a real database
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
  // Simulate real-time updates
  globalStats.totalUsers += Math.floor(Math.random() * 3);

  return NextResponse.json(globalStats);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, vibe, score } = body;

  // Update global stats
  globalStats.totalUsers += 1;
  globalStats.vibeDistribution[
    vibe as keyof typeof globalStats.vibeDistribution
  ] += 1;

  // Add to recent results (keep last 100)
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
