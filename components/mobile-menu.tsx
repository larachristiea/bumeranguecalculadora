"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)

    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white font-poppins">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <nav className="flex-1 overflow-auto py-8 px-6">
              <ul className="space-y-6">
                <MobileNavItem href="#why" onClick={onClose}>
                  Por Quê
                </MobileNavItem>
                <MobileNavItem href="#how-it-works" onClick={onClose}>
                  Como Funciona
                </MobileNavItem>
                <MobileNavItem href="#benefits" onClick={onClose}>
                  Benefícios
                </MobileNavItem>
                <MobileNavItem href="#about" onClick={onClose}>
                  Sobre Nós
                </MobileNavItem>
                <MobileNavItem href="#contact-form" onClick={onClose}>
                  Formulário
                </MobileNavItem>
              </ul>
            </nav>

            <div className="p-6 border-t border-white/10">
              <Button
                className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold font-poppins"
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                  onClose()
                }}
              >
                Recupere Seu Dinheiro
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MobileNavItem({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-xl font-medium text-white block py-2 font-poppins"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
          onClick()
        }}
      >
        {children}
      </Link>
    </li>
  )
}
