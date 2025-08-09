"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, LinkIcon, Tag, BarChart3 } from "lucide-react"

interface AddBookModalProps {
  isOpen: boolean
  onClose: () => void
  book?: any
}

export function AddBookModal({ isOpen, onClose, book }: AddBookModalProps) {
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    url: book?.url || "",
    tags: book?.tags?.join(", ") || "",
    status: book?.status || "to-read",
    notes: book?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              {book ? "Edit Book" : "Add New Book"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                Title *
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter book title"
                  className="pl-10 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="author" className="text-sm font-medium text-gray-700 mb-2 block">
                Author *
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
                className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="url" className="text-sm font-medium text-gray-700 mb-2 block">
                URL (optional)
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  placeholder="https://example.com/book-link"
                  className="pl-10 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags" className="text-sm font-medium text-gray-700 mb-2 block">
                Tags
              </Label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="Fiction, Self-help, Business (comma-separated)"
                  className="pl-10 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            <div>
              <Label htmlFor="status" className="text-sm font-medium text-gray-700 mb-2 block">
                Reading Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-gray-400 mr-2" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-read">📚 To Read</SelectItem>
                  <SelectItem value="reading">📖 Currently Reading</SelectItem>
                  <SelectItem value="finished">✅ Finished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                Initial Notes (optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add any initial thoughts or notes about this book..."
                className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl font-medium"
            >
              {book ? "Update Book" : "Add Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
