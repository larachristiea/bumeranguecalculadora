"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { LogoAnimation } from "@/components/logo-animation"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
              O que é seu,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4527A0] to-[#9CDD00]">
                {" "}
                de volta para você
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base md:text-xl mb-8 max-w-3xl mx-auto font-poppins"
          >
            A plataforma que identifica e recupera impostos pagos indevidamente pelos empresários do Simples Nacional –
            sem risco: você só paga se recuperarmos seu dinheiro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-lime-500 hover:bg-lime-600 text-black font-bold px-8 font-poppins w-full sm:w-auto"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Quero Recuperar Meu Dinheiro
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 p-4 bg-[#4527A0]/20 rounded-lg border border-[#4527A0]/30"
          >
            <p className="text-white font-medium font-poppins text-sm md:text-base">
              <span className="text-lime-400 font-bold">Atenção:</span> Podemos recuperar valores pagos indevidamente
              nos últimos 5 anos!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated logo - smaller size */}
      <div className="absolute bottom-4 right-4 w-24 h-24 md:w-32 md:h-32">
        <LogoAnimation />
      </div>
    </div>
  )
}
