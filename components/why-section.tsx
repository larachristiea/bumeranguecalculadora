"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertTriangle, BookOpen, Calculator } from "lucide-react"

export default function WhySection() {
  return (
    <section id="why" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-poppins">
            Não é jeitinho brasileiro. <span className="text-lime-400">É seu DIREITO.</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto mt-4 font-poppins text-sm md:text-base">
            <span className="text-white font-medium">A Bumerangue existe para apoiar empresários:</span> combinamos
            inteligência artificial com expertise tributária para identificar oportunidades legítimas de recuperação
            tributária conforme a legislação vigente.
          </p>
        </motion.div>

        {/* Separator */}
        <div className="relative my-12 md:my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4527A0] to-[#9CDD00]"></div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-lime-500 mb-6 font-poppins">
            Por que empresários como você pagam mais impostos do que deveriam
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <ReasonCard
            icon={<AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="Tributação Monofásica Mal Aplicada"
            description="Muitos produtos têm tributação concentrada no fabricante, com alíquota zero para varejistas. Mas sem a declaração correta, você acaba pagando novamente."
            delay={0}
          />
          <ReasonCard
            icon={<Calculator className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="ICMS Incluído Indevidamente na Base de PIS/COFINS"
            description="O STF decidiu que o ICMS não compõe a base de cálculo do PIS/COFINS. Milhares de empresas continuam calculando incorretamente."
            delay={0.2}
          />
          <ReasonCard
            icon={<BookOpen className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="Complexidade da Legislação Tributária"
            description="Com milhares de normas tributárias em vigor, é desafiador para um pequeno empresário acompanhar todas as mudanças e benefícios disponíveis na legislação."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}

function ReasonCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/10 hover:border-[#4527A0]/50 transition-all"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-poppins">{title}</h3>
      <p className="text-gray-400 font-poppins text-sm md:text-base">{description}</p>
    </motion.div>
  )
}
