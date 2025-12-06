"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Apple, MessageSquare, TrendingUp, LogOut, X, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import logo from "@/components/layout/logos/Etma.png"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const menuItems = [
    { icon: Heart, label: "Accueil", href: "/home", color: "text-rose-500" },
    { icon: Brain, label: "Santé Mentale", href: "/mental-health", color: "text-purple-500" },
    { icon: Apple, label: "Nutrition", href: "/nutrition", color: "text-green-500" },
    { icon: MessageSquare, label: "Messagerie", href: "/messaging", color: "text-blue-500" },
    { icon: TrendingUp, label: "Rapports", href: "/reports", color: "text-orange-500" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed md:relative w-72 h-screen z-50 md:z-0 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        initial={false}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ x: undefined }} 
      >
        <div className="h-full m-4 glass rounded-3xl flex flex-col overflow-hidden border-white/40 relative">
          {/* Séparation transparente à droite */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                 <img src={logo.src} alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">
                Etma'En
              </span>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary shadow-sm"
                        : "hover:bg-white/50 text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                      />
                    )}
                    <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : item.color)} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 ml-auto text-secondary animate-pulse" />}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-white/10 bg-white/30">
            {user && (
              <div className="mb-4 p-3 rounded-xl bg-white/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold shadow-md">
                  {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm text-slate-800 truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-2 text-slate-600 hover:text-red-600 hover:bg-red-50/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
