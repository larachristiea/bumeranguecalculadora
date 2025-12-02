"use client"

import type React from "react"

import { motion } from "framer-motion"
import { HeadphonesIcon, LineChart, Users, Lightbulb } from "lucide-react"

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-poppins">
            Benefícios do Programa Pioneiros Bumerangue
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <BenefitCard
            icon={<HeadphonesIcon className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="Atendimento Prioritário"
            description="Acesso direto à nossa equipe de especialistas tributários, com suporte personalizado."
            delay={0}
          />
          <BenefitCard
            icon={<LineChart className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="Análise Gratuita"
            description="Revisão tributária dos últimos 5 anos sem custo inicial para você."
            delay={0.2}
          />
          <BenefitCard
            icon={<Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="Influência no Produto"
            description="Seus insights moldarão nossa plataforma. A gente te ajuda e você faz parte da nossa história."
            delay={0.4}
          />
          <BenefitCard
            icon={<Users className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />}
            title="Comunidade Exclusiva"
            description="Participação na comunidade Bumerangue - um grupo seleto dos primeiros empreendedores a fazerem parte desta jornada."
            delay={0.6}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 p-4 md:p-6 bg-[#4527A0]/20 rounded-lg border border-[#4527A0]/30 text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-poppins">Análise Gratuita</h3>
          <p className="text-gray-300 max-w-3xl mx-auto font-poppins text-sm md:text-base">
            Você só paga uma porcentagem do valor efetivamente recuperado. Se não recuperarmos nada, você não paga nada.
            Sem taxas iniciais, sem mensalidades, sem surpresas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function BenefitCard({
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
