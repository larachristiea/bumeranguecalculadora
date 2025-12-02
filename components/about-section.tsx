"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Users, MessageCircle, Handshake, LightbulbIcon } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-[#4527A0]/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Image
              src="/images/bumerangue_icon.png"
              alt="Bumerangue Logo Background"
              width={250}
              height={250}
              className="object-contain opacity-30"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 font-poppins">
            De empreendedor para empreendedor
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
          <FeatureCard
            icon={<Users className="w-8 h-8 text-lime-400" />}
            title="Entendemos sua realidade"
            description="A Bumerangue foi criada por quem entende a realidade do pequeno e médio empresário brasileiro. Falamos de tributação e tecnologia com o sotaque que você entende."
            delay={0}
          />

          <FeatureCard
            icon={<MessageCircle className="w-8 h-8 text-lime-400" />}
            title="Linguagem simples"
            description="Acreditamos que você merece entender exatamente como recuperar o que é seu por direito."
            delay={0.2}
          />

          <FeatureCard
            icon={<Handshake className="w-8 h-8 text-lime-400" />}
            title="Parceria verdadeira"
            description="Nosso sucesso depende do seu. Por isso, trabalhamos com transparência e foco em resultados, construindo uma relação de confiança com cada cliente."
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center relative z-10"
        >
          <div className="inline-block p-4 bg-lime-500/10 rounded-full border border-lime-500/30 mb-6">
            <LightbulbIcon className="w-10 h-10 text-lime-400" />
          </div>
          <p className="text-white font-medium max-w-2xl mx-auto font-poppins text-lg">
            "Acreditamos que cada real recuperado é um investimento que volta para o seu negócio e para a economia
            brasileira."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
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
      className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-lime-500/30 transition-all group"
    >
      <div className="bg-lime-500/10 p-4 rounded-full inline-block mb-4 group-hover:bg-lime-500/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-poppins">{title}</h3>
      <p className="text-gray-300 font-poppins text-sm md:text-base">{description}</p>
    </motion.div>
  )
}
