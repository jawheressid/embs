"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Upload, Sparkles, ArrowRight } from "lucide-react"
import { MentalHealthChatbot } from "@/components/mental-health/chatbot"
import { EmotionAnalyzer } from "@/components/mental-health/emotion-analyzer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function MentalHealthPage() {
  const [activeTab, setActiveTab] = useState("chatbot")

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Santé Mentale
            </span>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Explorez votre bien-être mental avec nos outils IA avancés</p>
        </div>
        <Link href="/teen-space">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-200 transition-all rounded-full px-6 py-6 h-auto text-base">
            Espace Ado <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-white/20 h-auto">
          <TabsTrigger 
            value="chatbot" 
            className="flex items-center justify-center gap-3 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md transition-all text-base font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            Chatbot IA
          </TabsTrigger>
          <TabsTrigger 
            value="emotion" 
            className="flex items-center justify-center gap-3 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md transition-all text-base font-medium"
          >
            <Upload className="w-5 h-5" />
            Analyse d'Émotions
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="chatbot" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100/50">
                <CardTitle className="text-2xl text-purple-900">Assistant Santé Mentale</CardTitle>
                <CardDescription className="text-purple-600/80 text-base">Discutez de votre bien-être mental ou de celui de votre enfant</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MentalHealthChatbot />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emotion" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-white border-b border-pink-100/50">
                <CardTitle className="text-2xl text-pink-900">Analyse des Émotions par Dessin</CardTitle>
                <CardDescription className="text-pink-600/80 text-base">Uploadez un dessin de votre enfant pour analyser ses émotions</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <EmotionAnalyzer />
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
