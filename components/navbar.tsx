"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import MobileMenu from "./mobile-menu"
import type React from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
      >
        <a href="https://bumeranguebrasil.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
          <Image
            src="/images/logo_bumerangue.png"
            alt="Bumerangue Logo"
            width={150}
            height={40}
            priority
            className="w-auto h-8 md:h-10"
          />
        </a>

        {/* Menu removido - apenas logo */}
      </motion.nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group font-poppins"
      onClick={(e) => {
        e.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 transition-all group-hover:w-full" />
    </Link>
  )
}
