"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="absolute bottom-16 right-0 bg-white text-black p-2 rounded-lg shadow-lg mb-2 w-48 text-sm font-poppins"
        >
          Fale com um especialista
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white border-r-8 border-r-transparent" />
        </motion.div>
      )}

      <motion.a
        href="https://wa.me/553399160008?text=Ol%C3%A1%2C%20Dr%20Luiz!%20Gostaria%20que%20minha%20empresa%20fosse%20analisada%20pela%20Bumerangue%20%F0%9F%AA%83%20"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#4527A0] text-white shadow-lg hover:bg-[#3b2087] transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <MessageCircle size={24} fill="white" />
      </motion.a>
    </div>
  )
}
