"use client"

import { motion } from "framer-motion"

export default function SectionSeparator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative my-12 md:my-16"
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-black px-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4527A0] to-[#9CDD00]"></div>
        </div>
      </div>
    </motion.div>
  )
}
