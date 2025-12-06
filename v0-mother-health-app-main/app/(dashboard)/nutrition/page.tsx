"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Camera, MessageCircle, TrendingUp, Leaf } from "lucide-react"
import { MealAnalyzer } from "@/components/nutrition/meal-analyzer"
import { NutritionDashboard } from "@/components/nutrition/dashboard"
import { NutritionChatbot } from "@/components/nutrition/chatbot"
import { motion } from "framer-motion"

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "meal", label: "Repas", icon: Camera },
    { id: "chatbot", label: "Recettes", icon: MessageCircle },
    { id: "history", label: "Historique", icon: Apple },
  ]

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            Nutrition
          </span>
          <Leaf className="w-8 h-8 text-emerald-500" />
        </h1>
        <p className="text-slate-500 mt-2 text-lg">Suivez et optimisez l'alimentation de votre famille</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-white/20 h-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md transition-all text-sm sm:text-base font-medium"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="dashboard" className="mt-0">
            <NutritionDashboard />
          </TabsContent>

          <TabsContent value="meal" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100/50">
                <CardTitle className="text-2xl text-emerald-900">Analyse de Repas</CardTitle>
                <CardDescription className="text-emerald-600/80 text-base">
                  Prenez une photo de votre repas pour analyser les calories et nutriments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MealAnalyzer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chatbot" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-white border-b border-teal-100/50">
                <CardTitle className="text-2xl text-teal-900">Assistant Recettes</CardTitle>
                <CardDescription className="text-teal-600/80 text-base">Demandez des recettes équilibrées adaptées à votre famille</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <NutritionChatbot />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100/50">
                <CardTitle className="text-2xl text-slate-800">Historique Alimentaire</CardTitle>
                <CardDescription className="text-slate-500 text-base">Consultez vos repas précédents et les analyses</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12 text-slate-400 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <Apple className="w-8 h-8 text-slate-300" />
                  </div>
                  <p>Aucun historique pour le moment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
