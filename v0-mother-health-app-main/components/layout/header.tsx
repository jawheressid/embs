"use client"
import { Menu, Bell, User, Search } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 flex items-center justify-between px-8 sticky top-0 z-30 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl shadow-lg border-b border-white/30" />
      
      {/* Séparation transparente en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div className="relative z-10 flex items-center gap-4 w-full">
        <button 
          onClick={onMenuClick} 
          className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 border-2 border-white/40 focus-within:bg-white focus-within:shadow-lg focus-within:border-primary/30 transition-all w-96 relative">
          {/* Séparation interne subtile */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white border-2 border-white/40 shadow-sm relative transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white border-2 border-white/40 shadow-sm transition-colors"
          >
            <User className="w-5 h-5 text-slate-600" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
