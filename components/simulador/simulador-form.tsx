"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SimuladorResultsNew from "./simulador-results-new"
import { calcularSistemaAtual, calcularNovoSistema } from "@/lib/simulador-calculations"
import { formatarMoeda, parseMoeda } from "@/lib/simulador-utils"
import { FloatingPaper } from "@/components/floating-paper"
import { LogoAnimation } from "@/components/logo-animation"
import { salvarSimulacao } from "@/lib/supabase"

interface FormData {
  nomeEmpresa: string
  cnpj: string
  nomeSocio: string
  cpfSocio: string
  telefone: string
  email: string
  regimeTributario: string
  setor: string
  setorEspecifico: string
  estado: string
  receitaBruta: number
  custosAnuais: number
  percentualCreditos: number
  aliquotaCBS: number
  aliquotaIBS: number
}

export default function SimuladorForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nomeEmpresa: "",
    cnpj: "",
    nomeSocio: "",
    cpfSocio: "",
    telefone: "",
    email: "",
    regimeTributario: "",
    setor: "",
    setorEspecifico: "nenhum",
    estado: "",
    receitaBruta: 0,
    custosAnuais: 0,
    percentualCreditos: 0,
    aliquotaCBS: 8.8,
    aliquotaIBS: 17.7,
  })
  const [results, setResults] = useState(null)

  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validações
    if (
      !formData.nomeEmpresa ||
      !formData.nomeSocio ||
      !formData.cpfSocio ||
      !formData.telefone ||
      !formData.email ||
      !formData.regimeTributario ||
      !formData.setor ||
      !formData.estado
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    if (formData.receitaBruta <= 0) {
      setError("A receita bruta deve ser maior que zero.")
      return
    }

    setLoading(true)

    try {
      const sistemaAtual = calcularSistemaAtual(
        formData.receitaBruta,
        formData.regimeTributario,
        formData.estado,
        formData.setor,
      )

      const sistemaNovo = calcularNovoSistema(
        formData.receitaBruta,
        formData.custosAnuais,
        formData.setorEspecifico,
        formData.percentualCreditos,
        formData.aliquotaCBS,
        formData.aliquotaIBS,
      )

      // Salvar no Supabase
      const economia = sistemaAtual.total - sistemaNovo.total
      const economiaPercentual = ((economia / sistemaAtual.total) * 100)

      await salvarSimulacao(
        {
          nome_empresa: formData.nomeEmpresa,
          cnpj: formData.cnpj,
          cpf_responsavel: formData.cpfSocio,
          telefone: formData.telefone,
          email: formData.email,
          estado: formData.estado,
          regime_tributario: formData.regimeTributario,
          setor: formData.setor,
          receita_bruta_anual: Math.round(formData.receitaBruta * 100),
          custos_operacionais: Math.round(formData.custosAnuais * 100),
          setor_especifico: formData.setorEspecifico,
          percentual_creditos: formData.percentualCreditos,
          aliquota_cbs: formData.aliquotaCBS,
          aliquota_ibs: formData.aliquotaIBS,
        },
        {
          sistema_atual_base: Math.round(sistemaAtual.base * 100),
          sistema_atual_irpj: Math.round(sistemaAtual.irpj * 100),
          sistema_atual_csll: Math.round(sistemaAtual.csll * 100),
          sistema_atual_pis: Math.round(sistemaAtual.pis * 100),
          sistema_atual_cofins: Math.round(sistemaAtual.cofins * 100),
          sistema_atual_icms: Math.round(sistemaAtual.icms * 100),
          sistema_atual_iss: Math.round(sistemaAtual.iss * 100),
          sistema_atual_total: Math.round(sistemaAtual.total * 100),
          sistema_novo_base: Math.round(sistemaNovo.base * 100),
          sistema_novo_creditos: Math.round(sistemaNovo.creditos * 100),
          sistema_novo_cbs: Math.round(sistemaNovo.cbs * 100),
          sistema_novo_ibs: Math.round(sistemaNovo.ibs * 100),
          sistema_novo_total: Math.round(sistemaNovo.total * 100),
          setor_especifico_aplicado: formData.setorEspecifico,
          aliquota_efetiva: formData.aliquotaCBS + formData.aliquotaIBS,
          reducao_percentual: economiaPercentual,
          economia_valor: Math.round(economia * 100),
          economia_percentual: economiaPercentual,
        }
      )

      setResults({
        formData,
        sistemaAtual,
        sistemaNovo,
      })
      setShowResults(true)
    } catch (err) {
      setError("Erro ao calcular simulação. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (showResults && results) {
    return <SimuladorResultsNew data={results} onBack={() => setShowResults(false)} />
  }

  return (
    <div className="relative min-h-screen">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={8} />
      </div>

      {/* Animated logo - parallax effect */}
      <div className="fixed bottom-8 right-8 w-32 h-32 md:w-40 md:h-40 z-20">
        <LogoAnimation />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 relative">
            {/* Logo como marca d'água */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
              <img
                src="/images/bumerangue_icon.png"
                alt=""
                className="w-64 h-64 md:w-96 md:h-96 object-contain"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#9CDD00] relative z-10">
              SIMULADOR BUMERANGUE<br />DA REFORMA TRIBUTÁRIA
            </h1>
            <p className="text-lg text-muted-foreground relative z-10">Simulação Completa CBS + IBS - LC 214/2025</p>
          </div>

          {/* Intro Section */}
          <div className="mb-12 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#9CDD00] mb-4">
                A gente traduziu a Reforma Tributária pra você
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                São mais de 500 páginas de lei. Aqui, você só precisa de 2 minutos e alguns dados do seu negócio
                pra entender o impacto real no seu caixa.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#4527A0] to-transparent mb-6"></div>
              <p className="text-lg text-gray-300">
                Compare seu cenário atual com o novo sistema (CBS + IBS) e descubra quanto você pode economizar
                — ou onde precisa se preparar.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-destructive/20 backdrop-blur-sm border border-destructive rounded-lg text-destructive">
              {error}
            </div>
          )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-primary">Informações da Empresa</h2>
            <p className="text-muted-foreground mb-6">
              Preencha os dados para calcular o impacto da reforma tributária
            </p>

            {/* Grid de Formulário */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Nome Empresa */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold mb-2">
                  Nome da Empresa <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="nomeEmpresa"
                  placeholder="Ex: Minha Empresa Ltda"
                  value={formData.nomeEmpresa}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* CNPJ */}
              <div>
                <label className="block text-sm font-semibold mb-2">CNPJ</label>
                <Input
                  type="text"
                  name="cnpj"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  maxLength={18}
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* Nome Sócio */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome do Sócio <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="nomeSocio"
                  placeholder="Ex: João da Silva"
                  value={formData.nomeSocio}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* CPF Sócio */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  CPF do Sócio <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="cpfSocio"
                  placeholder="000.000.000-00"
                  value={formData.cpfSocio}
                  onChange={handleInputChange}
                  maxLength={14}
                  required
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Telefone <span className="text-destructive">*</span>
                </label>
                <Input
                  type="tel"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  maxLength={15}
                  required
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* Regime Tributário */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Regime Tributário <span className="text-destructive">*</span>
                </label>
                <select
                  name="regimeTributario"
                  value={formData.regimeTributario}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-input border border-primary/30 rounded-md focus:border-primary focus:outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="simples">Simples Nacional</option>
                  <option value="presumido">Lucro Presumido</option>
                  <option value="real">Lucro Real</option>
                </select>
              </div>

              {/* Setor */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Setor de Atuação <span className="text-destructive">*</span>
                </label>
                <select
                  name="setor"
                  value={formData.setor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-input border border-primary/30 rounded-md focus:border-primary focus:outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="comercio">Comércio</option>
                  <option value="industria">Indústria</option>
                  <option value="servicos">Serviços</option>
                </select>
              </div>

              {/* Setor Específico */}
              <div>
                <label className="block text-sm font-semibold mb-2">Setor Específico (Opcional)</label>
                <select
                  name="setorEspecifico"
                  value={formData.setorEspecifico}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-input border border-primary/30 rounded-md focus:border-primary focus:outline-none"
                >
                  <option value="nenhum">Nenhum (alíquota padrão)</option>
                  <option value="saude">Saúde (60% redução)</option>
                  <option value="educacao">Educação (60% redução)</option>
                  <option value="transporte">Transporte Público (60% redução)</option>
                  <option value="cesta_basica">Cesta Básica (alíquota zero)</option>
                  <option value="medicamentos">Medicamentos (60% redução)</option>
                  <option value="dispositivos">Dispositivos Médicos (60% redução)</option>
                  <option value="profissionais">Serviços Profissionais (30% redução)</option>
                  <option value="combustiveis">Combustíveis (40% redução)</option>
                </select>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Estado <span className="text-destructive">*</span>
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-input border border-primary/30 rounded-md focus:border-primary focus:outline-none"
                >
                  <option value="">Selecione</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              {/* Receita Bruta */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Receita Bruta Anual <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="receitaBruta"
                  placeholder="R$ 0,00"
                  value={formatarMoeda(formData.receitaBruta)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      receitaBruta: parseMoeda(e.target.value),
                    }))
                  }
                  required
                  inputMode="numeric"
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* Custos Anuais */}
              <div>
                <label className="block text-sm font-semibold mb-2">Custos Operacionais Anuais</label>
                <Input
                  type="text"
                  name="custosAnuais"
                  placeholder="R$ 0,00"
                  value={formatarMoeda(formData.custosAnuais)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      custosAnuais: parseMoeda(e.target.value),
                    }))
                  }
                  inputMode="numeric"
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>

              {/* % de Créditos */}
              <div>
                <label className="block text-sm font-semibold mb-2">% de Créditos Aproveitáveis</label>
                <Input
                  type="number"
                  name="percentualCreditos"
                  placeholder="0"
                  value={formData.percentualCreditos || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      percentualCreditos: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  min="0"
                  max="100"
                  step="0.01"
                  inputMode="decimal"
                  className="bg-input border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            {/* Alíquotas Padrão */}
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-primary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Alíquotas Padrão (LC 214/2025):</strong>
              </p>
              <p className="text-xs text-[#9CDD00] mb-4">
                Total: 26,5% (CBS 8,8% + IBS 17,7%)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Alíquota CBS (Federal) - Padrão: 8,8%</label>
                  <Input
                    type="number"
                    name="aliquotaCBS"
                    placeholder="8.8"
                    value={formData.aliquotaCBS || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        aliquotaCBS: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    step="0.01"
                    inputMode="decimal"
                    className="bg-input border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Alíquota IBS (Estadual/Municipal) - Padrão: 17,7%</label>
                  <Input
                    type="number"
                    name="aliquotaIBS"
                    placeholder="17.7"
                    value={formData.aliquotaIBS || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        aliquotaIBS: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    step="0.01"
                    inputMode="decimal"
                    className="bg-input border-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 text-lg"
            >
              {loading ? "Calculando..." : "Calcular Simulação"}
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
