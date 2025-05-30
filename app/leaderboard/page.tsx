"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const vibeTypes = {
  chill: {
    name: "Chill Vibes",
    emoji: "😌",
    gradient: "vibe-chill",
    bgClass: "from-blue-400 to-blue-600",
  },
  party: {
    name: "Party Animal",
    emoji: "🎉",
    gradient: "vibe-party",
    bgClass: "from-pink-400 to-pink-600",
  },
  wholesome: {
    name: "Wholesome Soul",
    emoji: "🌻",
    gradient: "vibe-wholesome",
    bgClass: "from-green-400 to-green-600",
  },
  mysterious: {
    name: "Mysterious Aura",
    emoji: "🌙",
    gradient: "vibe-mysterious",
    bgClass: "from-purple-400 to-purple-600",
  },
}

export default function Leaderboard() {
  const [results, setResults] = useState<any[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const savedResults = JSON.parse(localStorage.getItem("vibeResults") || "[]")
      const sortedResults = savedResults
        .sort((a: any, b: any) => b.score - a.score || b.timestamp - a.timestamp)
        .slice(0, 50)
      setResults(sortedResults)
      setIsLoading(false)
    }, 500)
  }, [])

  const filteredResults = filter === "all" ? results : results.filter((result) => result.vibe === filter)

  const getVibeStats = () => {
    const stats = results.reduce((acc, result) => {
      acc[result.vibe] = (acc[result.vibe] || 0) + 1
      return acc
    }, {})
    return stats
  }

  const vibeStats = getVibeStats()
  const totalResults = results.length

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg-animated flex items-center justify-center p-4">
        <div className="vibe-card w-full max-w-md p-8 text-center">
          <div className="text-6xl mb-4 animate-bounce-gentle">🏆</div>
          <div className="loading-shimmer w-full h-4 rounded-full mb-4"></div>
          <div className="loading-shimmer w-3/4 h-4 rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg-animated p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="vibe-card animate-fade-in-up">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
                <span className="text-4xl">🏆</span>
                Vibe Check Leaderboard
              </h1>
              <Link href="/">
                <button className="btn-secondary flex items-center gap-2">
                  <span className="text-lg">🏠</span>
                  Take Quiz
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-lg">👥</span>
                <span>{totalResults} total vibes checked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg animate-pulse-gentle">🔴</span>
                <span>Live updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vibe Distribution */}
        <div className="vibe-card animate-fade-in-up">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-shadow">Vibe Distribution</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(vibeTypes).map(([key, vibe]) => {
                const count = vibeStats[key] || 0
                const percentage = totalResults > 0 ? ((count / totalResults) * 100).toFixed(1) : 0
                return (
                  <div
                    key={key}
                    className="text-center glass-effect p-4 rounded-lg hover:scale-105 transition-transform"
                  >
                    <div className="text-3xl mb-2 animate-bounce-gentle">{vibe.emoji}</div>
                    <div className="font-bold text-xl">{count}</div>
                    <div className="text-sm text-gray-600 mb-2">{percentage}%</div>
                    <div className={`${vibe.gradient} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {vibe.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 animate-fade-in-up">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "all" ? "btn-primary" : "btn-secondary"
            }`}
          >
            All Vibes ✨
          </button>
          {Object.entries(vibeTypes).map(([key, vibe]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filter === key ? "btn-primary" : "btn-secondary"
              }`}
            >
              {vibe.emoji} {vibe.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="vibe-card animate-fade-in-up">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-shadow">
              {filter === "all"
                ? "🌟 Top Vibes"
                : `🌟 Top ${vibeTypes[filter as keyof typeof vibeTypes]?.name || ""} Vibes`}
            </h2>

            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce-gentle">🏆</div>
                <p className="text-gray-600 mb-6">No results yet. Be the first to take the quiz!</p>
                <Link href="/">
                  <button className="btn-primary">Take Quiz Now ✨</button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((result, index) => {
                  const vibe = vibeTypes[result.vibe as keyof typeof vibeTypes]
                  const timeAgo = new Date(result.timestamp).toLocaleDateString()
                  const isTopThree = index < 3

                  return (
                    <div
                      key={`${result.name}-${result.timestamp}`}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                        isTopThree ? "glass-effect border-2 border-purple-300 shadow-lg" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-lg font-bold flex items-center justify-center w-8 h-8 rounded-full ${
                            index === 0
                              ? "bg-yellow-400 text-yellow-900"
                              : index === 1
                                ? "bg-gray-300 text-gray-700"
                                : index === 2
                                  ? "bg-orange-400 text-orange-900"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </div>
                        <div className="text-3xl animate-pulse-gentle">{vibe.emoji}</div>
                        <div>
                          <div className="font-bold text-lg">{result.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <span className={`${vibe.gradient} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                              {vibe.name}
                            </span>
                            <span>•</span>
                            <span>{timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl text-purple-600">{result.score}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Back to Quiz Button */}
        <div className="text-center animate-fade-in-up">
          <Link href="/">
            <button className="btn-primary text-lg px-8 py-4">Take the Quiz Again! 🎯</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
