"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, Trash2, Plus, Sparkles, Brain, MoreVertical } from "lucide-react"
import Link from "next/link"

const bookData = {
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  status: "reading",
  tags: ["Self-help", "Productivity", "Psychology"],
  cover: "/atomic-habits-cover.png",
  url: "https://example.com/atomic-habits",
}

const notes = [
  {
    id: 1,
    content:
      "The key insight is that small changes compound over time. A 1% improvement daily leads to 37x better results in a year.",
    date: "2024-01-15",
    type: "insight",
  },
  {
    id: 2,
    content:
      "Four laws of behavior change: 1) Make it obvious, 2) Make it attractive, 3) Make it easy, 4) Make it satisfying.",
    date: "2024-01-14",
    type: "summary",
  },
  {
    id: 3,
    content:
      "Environment design is crucial. If you want to read more, place books everywhere. If you want to eat healthy, put fruits on the counter.",
    date: "2024-01-13",
    type: "actionable",
  },
]

const statusColors = {
  "to-read": "bg-blue-100 text-blue-700 border-blue-200",
  reading: "bg-amber-100 text-amber-700 border-amber-200",
  finished: "bg-green-100 text-green-700 border-green-200",
}

const statusLabels = {
  "to-read": "To Read",
  reading: "Reading",
  finished: "Finished",
}

const noteTypeColors = {
  insight: "bg-purple-50 border-purple-200",
  summary: "bg-blue-50 border-blue-200",
  actionable: "bg-green-50 border-green-200",
}

export default function BookDetail() {
  const [book, setBook] = useState(bookData)
  const [showSummary, setShowSummary] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    setBook({ ...book, status: newStatus })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" asChild className="rounded-xl">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden sticky top-24">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
                    <p className="text-lg text-gray-600">{book.author}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                      <Select value={book.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="to-read">To Read</SelectItem>
                          <SelectItem value="reading">Reading</SelectItem>
                          <SelectItem value="finished">Finished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => setShowSummary(true)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Summary
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl border-gray-200 bg-transparent">
                      <Brain className="w-4 h-4 mr-2" />
                      Flashcards
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes and Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            {showSummary && (
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                    AI-Generated Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      "Atomic Habits" presents a comprehensive framework for building good habits and breaking bad ones.
                      The core premise is that small, incremental changes (atomic habits) compound over time to produce
                      remarkable results. Clear introduces the Four Laws of Behavior Change: make it obvious,
                      attractive, easy, and satisfying. The book emphasizes identity-based habits, suggesting that
                      lasting change occurs when you focus on who you wish to become rather than what you want to
                      achieve.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Key concepts include habit stacking, environment design, and the importance of systems over goals.
                      Clear provides practical strategies for implementation, making this both a theoretical framework
                      and a practical guide for personal development.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes Section */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notes & Highlights</CardTitle>
                  <Button
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {notes.map((note) => (
                  <Card key={note.id} className={`border rounded-xl ${noteTypeColors[note.type]}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline" className="text-xs capitalize">
                          {note.type}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50 text-red-500">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{note.content}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(note.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                ))}

                {notes.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                    <p className="text-gray-500 mb-4">Start capturing your thoughts and insights as you read.</p>
                    <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Note
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
