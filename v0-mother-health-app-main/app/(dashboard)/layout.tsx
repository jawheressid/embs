"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-teal-50/50 to-blue-50/30">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Conteneur principal avec séparation visuelle */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Conteneur avec marges et fond subtil */}
          <div className="h-full bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl relative overflow-hidden">
            {/* Séparations transparentes décoratives */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
            
            {/* Contenu avec overflow */}
            <div className="relative z-10 h-full overflow-y-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
