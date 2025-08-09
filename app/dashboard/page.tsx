"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Plus, Search, User } from "lucide-react"
import Link from "next/link"
import { AddBookModal } from "@/components/add-book-modal"

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    status: "reading",
    tags: ["Self-help", "Productivity"],
    cover: "/atomic-habits-cover.png",
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    status: "to-read",
    tags: ["Finance", "Psychology"],
    cover: "/psychology-of-money-book-cover.png",
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    status: "finished",
    tags: ["History", "Science"],
    cover: "/sapiens-book-cover.png",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    status: "reading",
    tags: ["Productivity", "Focus"],
    cover: "/deep-work-book-cover.png",
  },
  {
    id: 5,
    title: "The Lean Startup",
    author: "Eric Ries",
    status: "to-read",
    tags: ["Business", "Startup"],
    cover: "/lean-startup-book-cover.png",
  },
  {
    id: 6,
    title: "Mindset",
    author: "Carol Dweck",
    status: "finished",
    tags: ["Psychology", "Growth"],
    cover: "/mindset-book-cover.png",
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

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredBooks = books.filter((book) => activeFilter === "all" || book.status === activeFilter)

  const filters = [
    { key: "all", label: "All Books", count: books.length },
    { key: "to-read", label: "To Read", count: books.filter((b) => b.status === "to-read").length },
    { key: "reading", label: "Reading", count: books.filter((b) => b.status === "reading").length },
    { key: "finished", label: "Finished", count: books.filter((b) => b.status === "finished").length },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                BacaList
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {filter.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.key ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <Card className="card-hover cursor-pointer border-0 shadow-md rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`${statusColors[book.status]} border font-medium`}>
                        {statusLabels[book.status]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">{book.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {book.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 mb-6">
              {activeFilter === "all"
                ? "Start building your reading list by adding your first book."
                : `No books in "${statusLabels[activeFilter] || activeFilter}" status.`}
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Book
            </Button>
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-105"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <AddBookModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
