"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    cnpj: "",
    regime: "",
    faturamento: "",
    funcionarios: 0,
    nome: "",
    telefone: "",
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, funcionarios: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    setShowSuccessModal(true)
  }

  return (
    <section id="contact-form" className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-500 mb-4 font-poppins">
            Descubra quanto você pode recuperar
          </h2>
          <p className="text-gray-400 font-poppins text-sm md:text-base">
            Preencha o formulário para iniciar sua análise gratuita.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="cnpj" className="text-white font-poppins">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white font-poppins"
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block font-poppins">Regime tributário atual</Label>
              <Select value={formData.regime} onValueChange={(value) => handleSelectChange("regime", value)} required>
                <SelectTrigger className="bg-white/10 border-white/20 text-white font-poppins">
                  <SelectValue placeholder="Selecione o regime tributário" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border-white/20">
                  <SelectItem value="simples" className="font-poppins">
                    Simples Nacional
                  </SelectItem>
                  <SelectItem value="presumido" className="font-poppins">
                    Lucro Presumido
                  </SelectItem>
                  <SelectItem value="real" className="font-poppins">
                    Lucro Real
                  </SelectItem>
                  <SelectItem value="naosei" className="font-poppins">
                    Não sei
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block font-poppins">Faturamento mensal médio</Label>
              <Select
                value={formData.faturamento}
                onValueChange={(value) => handleSelectChange("faturamento", value)}
                required
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white font-poppins">
                  <SelectValue placeholder="Selecione o faturamento mensal" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border-white/20">
                  <SelectItem value="ate50" className="font-poppins">
                    Até R$ 50.000
                  </SelectItem>
                  <SelectItem value="50a150" className="font-poppins">
                    De R$ 50.000 a R$ 150.000
                  </SelectItem>
                  <SelectItem value="150a500" className="font-poppins">
                    De R$ 150.000 a R$ 500.000
                  </SelectItem>
                  <SelectItem value="acima500" className="font-poppins">
                    Acima de R$ 500.000
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block font-poppins">
                Quantidade de funcionários CLT: {formData.funcionarios}
              </Label>
              <Slider
                defaultValue={[0]}
                max={30}
                step={1}
                className="my-4"
                onValueChange={handleSliderChange}
                value={[formData.funcionarios]}
              />
              <div className="flex justify-between text-xs text-gray-400 font-poppins">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30+</span>
              </div>
            </div>

            <div>
              <Label htmlFor="nome" className="text-white font-poppins">
                Nome
              </Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white font-poppins"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <Label htmlFor="telefone" className="text-white font-poppins">
                Telefone
              </Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white font-poppins"
                placeholder="(00) 00000-0000"
              />
            </div>

            <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold font-poppins">
              QUERO RECUPERAR MEU DINHEIRO
            </Button>

            <p className="text-gray-400 text-sm text-center font-poppins">
              Você só paga se recuperar. Custo zero, potencial enorme.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-lime-500/30 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-lime-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-poppins">Sua resposta foi registrada!</h3>
                <p className="text-gray-300 font-poppins">
                  Agora é só aguardar! A Bumerangue entrará em contato com você.
                </p>

                <Button
                  className="mt-6 bg-lime-500 hover:bg-lime-600 text-black font-bold font-poppins"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Fechar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
