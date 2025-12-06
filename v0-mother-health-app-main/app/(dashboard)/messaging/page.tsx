"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Loader, Phone, Video, MoreVertical, Search } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"

interface Conversation {
  id: string
  doctorName: string
  doctorRole: string
  lastMessage: string
  timestamp: string
  unread: number
  avatar: string
  status: "online" | "offline"
}

interface Message {
  id: string
  sender: "user" | "doctor"
  senderName: string
  content: string
  timestamp: Date
  read: boolean
}

export default function MessagingPage() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState<string>("1")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      senderName: "Dr. Marie Dupont",
      content: "Bonjour, comment allez-vous? Avez-vous des questions concernant la santé de votre enfant?",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversations: Conversation[] = [
    {
      id: "1",
      doctorName: "Dr. Marie Dupont",
      doctorRole: "Pédiatre",
      lastMessage: "Comment allez-vous? Avez-vous des questions...",
      timestamp: "14:30",
      unread: 0,
      avatar: "MD",
      status: "online",
    },
    {
      id: "2",
      doctorName: "Dr. Jean Martin",
      doctorRole: "Nutritionniste",
      lastMessage: "Les résultats sont bons, continuez...",
      timestamp: "10:15",
      unread: 2,
      avatar: "JM",
      status: "offline",
    },
    {
      id: "3",
      doctorName: "Dr. Sophie Bernard",
      doctorRole: "Psychologue",
      lastMessage: "À bientôt pour notre prochaine session",
      timestamp: "Hier",
      unread: 0,
      avatar: "SB",
      status: "online",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      senderName: user?.name || "Vous",
      content: input,
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    // Simulate doctor response
    setTimeout(() => {
      const doctorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        senderName: "Dr. Marie Dupont",
        content: "Merci pour votre message. Je vais examiner cela et vous revenir rapidement.",
        timestamp: new Date(),
        read: false,
      }
      setMessages((prev) => [...prev, doctorMessage])
      setLoading(false)
    }, 1000)
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)
  const filteredConversations = conversations.filter((conv) =>
    conv.doctorName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
            Messagerie
          </span>
          <MessageCircle className="w-8 h-8 text-blue-500" />
        </h1>
        <p className="text-slate-500 mt-2 text-lg">Communiquez directement avec vos médecins</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="glass-card border-none h-full flex flex-col overflow-hidden">
            <CardHeader className="border-b border-white/20 pb-4">
              <CardTitle className="text-lg mb-4">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full text-left p-4 border-b border-white/10 hover:bg-white/30 transition-colors ${
                      selectedConversation === conv.id ? "bg-white/40" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-sm font-semibold text-white shadow-md">
                          {conv.avatar}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            conv.status === "online" ? "bg-green-500" : "bg-slate-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-slate-800 text-sm">{conv.doctorName}</p>
                          {conv.unread > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-1">{conv.doctorRole}</p>
                        <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 ml-13">{conv.timestamp}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-none h-full flex flex-col overflow-hidden">
            {selectedConv ? (
              <>
                {/* Header */}
                <CardHeader className="border-b border-white/20 pb-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-sm font-semibold text-white shadow-md">
                        {selectedConv.avatar}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          selectedConv.status === "online" ? "bg-green-500" : "bg-slate-400"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{selectedConv.doctorName}</CardTitle>
                      <p className="text-xs text-slate-500">
                        {selectedConv.status === "online" ? "En ligne" : "Hors ligne"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/50">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/50">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/50">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-xs ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                        {message.sender === "doctor" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 shadow-md">
                            {selectedConv.avatar}
                          </div>
                        )}
                        <div>
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none shadow-md"
                                : "bg-white/60 rounded-bl-none shadow-sm"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <span className="text-xs text-slate-400 mt-1 block">
                            {message.timestamp.toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 shadow-md">
                          {selectedConv.avatar}
                        </div>
                        <div className="bg-white/60 px-4 py-2 rounded-lg rounded-bl-none shadow-sm">
                          <Loader className="w-4 h-4 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input */}
                <div className="border-t border-white/20 p-4 bg-white/20">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Écrivez votre message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={loading}
                      className="flex-1 bg-white/50 border-white/30"
                    />
                    <Button 
                      type="submit" 
                      disabled={loading || !input.trim()} 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400">Sélectionnez une conversation pour commencer</p>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
