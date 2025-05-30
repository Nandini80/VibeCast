"use client"

import { useState, useEffect } from "react"
import { Users, Trophy, Share2, Zap, Heart, Moon, Coffee } from "lucide-react"
import Link from "next/link"

interface QuizOption {
  text: string
  vibe: string
  points: number
  icon: typeof Coffee | typeof Zap | typeof Heart | typeof Moon
}

const questions = [
  {
    id: 1,
    question: "What's your ideal Friday night?",
    options: [
      { text: "Netflix and chill at home", vibe: "chill", points: 3, icon: Coffee },
      { text: "Wild party with friends", vibe: "party", points: 3, icon: Zap },
      { text: "Cozy dinner with close friends", vibe: "wholesome", points: 3, icon: Heart },
      { text: "Solo adventure exploring the city", vibe: "mysterious", points: 3, icon: Moon },
    ],
  },
  {
    id: 2,
    question: "Pick your spirit emoji:",
    options: [
      { text: "🌙 Moon", vibe: "mysterious", points: 3, icon: Moon },
      { text: "🔥 Fire", vibe: "party", points: 3, icon: Zap },
      { text: "🌻 Sunflower", vibe: "wholesome", points: 3, icon: Heart },
      { text: "😴 Sleeping", vibe: "chill", points: 3, icon: Coffee },
    ],
  },
  {
    id: 3,
    question: "Your coffee order reveals:",
    options: [
      { text: "Black coffee - pure and simple", vibe: "mysterious", points: 2, icon: Moon },
      { text: "Frappuccino with extra whip", vibe: "party", points: 2, icon: Zap },
      { text: "Oat milk latte with heart art", vibe: "wholesome", points: 2, icon: Heart },
      { text: "Whatever's easiest", vibe: "chill", points: 2, icon: Coffee },
    ],
  },
  {
    id: 4,
    question: "In group chats, you're the one who:",
    options: [
      { text: "Sends memes at 3am", vibe: "party", points: 4, icon: Zap },
      { text: "Checks on everyone's mental health", vibe: "wholesome", points: 4, icon: Heart },
      { text: "Lurks and reacts with emojis", vibe: "chill", points: 4, icon: Coffee },
      { text: "Drops cryptic messages", vibe: "mysterious", points: 4, icon: Moon },
    ],
  },
  {
    id: 5,
    question: "Your dream vacation is:",
    options: [
      { text: "Backpacking through unknown places", vibe: "mysterious", points: 3, icon: Moon },
      { text: "Beach resort with friends", vibe: "party", points: 3, icon: Zap },
      { text: "Cozy cabin in the mountains", vibe: "wholesome", points: 3, icon: Heart },
      { text: "Staycation in your own city", vibe: "chill", points: 3, icon: Coffee },
    ],
  },
]

const vibeTypes = {
  chill: {
    name: "Chill Vibes",
    emoji: "😌",
    description: "You're the calm in everyone's storm. Low-key legendary.",
    gradient: "vibe-chill",
    bgClass: "from-blue-400 to-blue-600",
  },
  party: {
    name: "Party Animal",
    emoji: "🎉",
    description: "You bring the energy wherever you go. Life of the party!",
    gradient: "vibe-party",
    bgClass: "from-pink-400 to-pink-600",
  },
  wholesome: {
    name: "Wholesome Soul",
    emoji: "🌻",
    description: "You're everyone's comfort person. Pure golden retriever energy.",
    gradient: "vibe-wholesome",
    bgClass: "from-green-400 to-green-600",
  },
  mysterious: {
    name: "Mysterious Aura",
    emoji: "🌙",
    description: "You're intriguingly complex. People want to know your secrets.",
    gradient: "vibe-mysterious",
    bgClass: "from-purple-400 to-purple-600",
  },
}

export default function VibeCheckQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({
    chill: 0,
    party: 0,
    wholesome: 0,
    mysterious: 0,
  })
  const [showResult, setShowResult] = useState(false)
  const [userName, setUserName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [totalUsers, setTotalUsers] = useState(1247)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUsers((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleAnswer = (option: QuizOption) => {
    setIsLoading(true)
    setTimeout(() => {
      const newAnswers = { ...answers }
      newAnswers[option.vibe] += option.points
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
        const result = getVibeResult()
        const results = JSON.parse(localStorage.getItem("vibeResults") || "[]")
        results.push({
          name: userName,
          vibe: result,
          timestamp: Date.now(),
          score: Math.max(...Object.values(newAnswers)),
        })
        localStorage.setItem("vibeResults", JSON.stringify(results))
      }
      setIsLoading(false)
    }, 300)
  }

  const getVibeResult = () => {
    const maxScore = Math.max(...Object.values(answers))
    const resultVibe = Object.entries(answers).find(([, score]) => score === maxScore)?.[0] || "chill"
    return resultVibe as keyof typeof vibeTypes
  }

  const shareResult = () => {
    const result = getVibeResult()
    const vibeType = vibeTypes[result]
    const text = `I just took the Vibe Check quiz and got ${vibeType.emoji} ${vibeType.name}! ${vibeType.description} Take the quiz: ${window.location.origin}`

    if (navigator.share) {
      navigator.share({
        title: "My Vibe Check Result",
        text: text,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(text)
      alert("Result copied to clipboard! 📋")
    }
  }

  const startQuiz = () => {
    if (userName.trim()) {
      setShowNameInput(false)
    }
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen gradient-bg-animated flex items-center justify-center p-4">
        <div className="vibe-card w-full max-w-md animate-fade-in-up">
          <div className="p-8 text-center">
            <div className="text-6xl mb-6 animate-bounce-gentle">✨</div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">Vibe Check Quiz</h1>
            <p className="text-muted-foreground mb-6">Discover your true vibe in 5 questions</p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 glass-effect p-3 rounded-lg">
              <Users className="h-4 w-4" />
              <span className="animate-pulse-gentle">{totalUsers.toLocaleString()} people have taken this quiz</span>
            </div>

            <div className="space-y-4">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  What should we call you?
                </label>
                <input
                  id="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  onKeyDown={(e) => e.key === "Enter" && startQuiz()}
                />
              </div>

              <button
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Vibe Check ✨
              </button>

              <div className="text-center">
                <Link
                  href="/leaderboard"
                  className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
                >
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const result = getVibeResult()
    const vibeType = vibeTypes[result]

    return (
      <div className="min-h-screen gradient-bg-animated flex items-center justify-center p-4">
        <div className="vibe-card w-full max-w-md animate-fade-in-up">
          <div className="p-8 text-center">
            <div className="text-8xl mb-6 animate-bounce-gentle">{vibeType.emoji}</div>
            <h2 className="text-2xl font-bold mb-4 text-shadow">{userName}, your vibe is...</h2>
            <div
              className={`${vibeType.gradient} text-white text-xl px-6 py-3 rounded-full inline-block mb-6 font-bold shadow-lg`}
            >
              {vibeType.name}
            </div>

            <p className="text-lg mb-8 text-muted-foreground leading-relaxed">{vibeType.description}</p>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Your Vibe Breakdown:</h3>
              {Object.entries(answers).map(([vibe, score]) => {
                const vibeInfo = vibeTypes[vibe as keyof typeof vibeTypes]
                return (
                  <div key={vibe} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{vibeInfo.emoji}</span>
                      <span className="capitalize font-medium">{vibe}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-1 ml-4">
                      <div className="progress-bar flex-1">
                        <div className="progress-fill" style={{ width: `${(score / 15) * 100}%` }} />
                      </div>
                      <span className="font-bold text-lg">{score}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={shareResult} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Result
              </button>
              <button onClick={() => window.location.reload()} className="btn-secondary flex-1">
                Retake Quiz
              </button>
            </div>

            <Link
              href="/leaderboard"
              className="text-primary hover:underline flex items-center justify-center gap-2 glass-effect p-3 rounded-lg"
            >
              <Trophy className="h-4 w-4" />
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen gradient-bg-animated flex items-center justify-center p-4">
      <div className="vibe-card w-full max-w-md animate-fade-in-up">
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-primary font-medium">Hey {userName}! 👋</span>
          </div>

          <div className="progress-bar mb-6">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <h2 className="text-xl font-bold mb-8 text-shadow">{questions[currentQuestion].question}</h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => {
              const IconComponent = option.icon
              return (
                <button
                  key={index}
                  className="btn-secondary w-full text-left justify-start h-auto p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform"
                  onClick={() => handleAnswer(option)}
                  disabled={isLoading}
                >
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span>{option.text}</span>
                </button>
              )
            })}
          </div>

          {isLoading && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <div className="loading-shimmer w-full h-2 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
