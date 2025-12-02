"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ClipboardList, FileText, BarChart3, Wallet } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-[#4527A0]/10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-poppins">Como funciona</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StepCard
            icon={<ClipboardList className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="1. Preencha o formulário"
            description="Forneça algumas informações básicas sobre seu negócio para iniciarmos a análise."
            delay={0}
          />
          <StepCard
            icon={<FileText className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="2. Envie seus arquivos"
            description="Após nosso contato, você compartilha os XMLs das notas fiscais e arquivos PGDAS para análise."
            delay={0.2}
          />
          <StepCard
            icon={<BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="3. Receba seu Dashboard Tributário"
            description="Apresentamos um painel completo mostrando exatamente onde e quanto você pode recuperar."
            delay={0.4}
          />
          <StepCard
            icon={<Wallet className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="4. Recupere seu dinheiro"
            description="Cuidamos de toda a burocracia. Você só paga quando o dinheiro voltar para você."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}

function StepCard({
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
      className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/10 hover:border-lime-500/50 transition-all h-full"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-poppins">{title}</h3>
      <p className="text-gray-400 font-poppins text-sm md:text-base">{description}</p>
    </motion.div>
  )
}
