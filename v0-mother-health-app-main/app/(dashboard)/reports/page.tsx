"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Brain, Apple, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const monthlyData = [
  { month: "Jan", mental: 72, nutrition: 68 },
  { month: "Fév", mental: 75, nutrition: 70 },
  { month: "Mar", mental: 78, nutrition: 75 },
  { month: "Avr", mental: 82, nutrition: 78 },
  { month: "Mai", mental: 85, nutrition: 82 },
  { month: "Juin", mental: 88, nutrition: 85 },
]

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Rapports
            </span>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Suivez votre progression au fil du temps</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg gap-2">
          <Download className="w-4 h-4" />
          Exporter
        </Button>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full space-y-8">
        <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100/50 backdrop-blur-sm rounded-2xl border border-white/20 h-auto">
          <TabsTrigger 
            value="overview"
            className="py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all text-base font-medium"
          >
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger 
            value="mental"
            className="py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md transition-all text-base font-medium"
          >
            Santé Mentale
          </TabsTrigger>
          <TabsTrigger 
            value="nutrition"
            className="py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md transition-all text-base font-medium"
          >
            Nutrition
          </TabsTrigger>
        </TabsList>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="overview" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100/50">
                <CardTitle className="text-2xl text-slate-800">Progression Globale</CardTitle>
                <CardDescription className="text-slate-600 text-base">Comparaison de votre santé mentale et nutritionnelle</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-end justify-around gap-4 p-4 bg-slate-50/50 rounded-lg">
                  {monthlyData.map((data, index) => (
                    <motion.div 
                      key={data.month} 
                      className="flex flex-col items-center gap-2 flex-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex gap-1 items-end h-full">
                        <div
                          className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all hover:opacity-80 shadow-md"
                          style={{ width: "20px", height: `${(data.mental / 100) * 250}px` }}
                          title={`Santé Mentale: ${data.mental}`}
                        />
                        <div
                          className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t transition-all hover:opacity-80 shadow-md"
                          style={{ width: "20px", height: `${(data.nutrition / 100) * 250}px` }}
                          title={`Nutrition: ${data.nutrition}`}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{data.month}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4 justify-center mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-purple-400 rounded shadow-sm" />
                    <span className="text-sm text-slate-600">Santé Mentale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded shadow-sm" />
                    <span className="text-sm text-slate-600">Nutrition</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mental" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100/50">
                <CardTitle className="text-2xl text-purple-900 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Santé Mentale - Détails
                </CardTitle>
                <CardDescription className="text-purple-600/80 text-base">Votre bien-être émotionnel au cours des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-xl">
                    <p className="text-sm text-purple-600 mb-2">Score actuel</p>
                    <p className="text-4xl font-bold text-purple-700">88/100</p>
                  </div>
                  <div className="space-y-3">
                    <p className="font-semibold text-slate-800 text-lg">Observations</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Amélioration constante depuis janvier
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Réduction du stress observée
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Meilleure qualité de sommeil
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-0">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100/50">
                <CardTitle className="text-2xl text-emerald-900 flex items-center gap-2">
                  <Apple className="w-6 h-6" />
                  Nutrition - Détails
                </CardTitle>
                <CardDescription className="text-emerald-600/80 text-base">Votre équilibre alimentaire au cours des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-6 bg-emerald-50 rounded-xl">
                    <p className="text-sm text-emerald-600 mb-2">Score actuel</p>
                    <p className="text-4xl font-bold text-emerald-700">85/100</p>
                  </div>
                  <div className="space-y-3">
                    <p className="font-semibold text-slate-800 text-lg">Observations</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Équilibre macronutriments amélioré
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Consommation de fruits augmentée
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Réduction des sucres raffinés
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
