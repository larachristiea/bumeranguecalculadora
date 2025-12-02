"use client"

import { Button } from "@/components/ui/button"
import { formatarMoeda, formatarPercentual, padronizarTexto, padronizarRegime, padronizarSetor } from "@/lib/simulador-utils"
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FloatingPaper } from "@/components/floating-paper"
import { LogoAnimation } from "@/components/logo-animation"
import Image from "next/image"

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default function SimuladorResultsNew({ data, onBack }: any) {
  const { formData, sistemaAtual, sistemaNovo } = data
  const economia = sistemaAtual.total - sistemaNovo.total
  const percentualImpacto = (economia / sistemaAtual.total) * 100
  const resultadosRef = useRef<HTMLDivElement>(null)

  const dadosPadronizados = {
    nomeEmpresa: padronizarTexto(formData.nomeEmpresa),
    nomeSocio: padronizarTexto(formData.nomeSocio),
    regimeTributario: padronizarRegime(formData.regimeTributario),
    setor: padronizarSetor(formData.setor),
  }

  // Gráfico de Barras - Sistema Atual
  const dadosGraficoBarras = {
    labels: ['IRPJ', 'CSLL', 'PIS', 'COFINS', 'ICMS', 'ISS'],
    datasets: [{
      data: [sistemaAtual.irpj, sistemaAtual.csll, sistemaAtual.pis, sistemaAtual.cofins, sistemaAtual.icms, sistemaAtual.iss],
      backgroundColor: (context: any) => {
        const index = context.dataIndex
        const max = Math.max(...context.dataset.data)
        return context.dataset.data[index] === max ? '#9CDD00' : '#2A2A2A'
      },
      borderRadius: 8,
      borderSkipped: false,
    }]
  }

  const optionsBarras = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#9CDD00',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => formatarMoeda(context.parsed.y)
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#888', font: { size: 11, family: 'Poppins' } }
      },
      y: {
        grid: { color: '#222', drawBorder: false },
        ticks: { color: '#888', font: { size: 10, family: 'Poppins' }, callback: (value: any) => 'R$ ' + (value / 1000).toFixed(0) + 'K' }
      }
    }
  }

  // Gráfico Donut - Sistema Reforma
  const dadosDonutReforma = {
    labels: ['CBS', 'IBS'],
    datasets: [{
      data: [sistemaNovo.cbs, sistemaNovo.ibs],
      backgroundColor: ['#4527A0', '#9CDD00'],
      borderWidth: 0,
      cutout: '70%',
      spacing: 0
    }]
  }

  const optionsDonut = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#9CDD00',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => formatarMoeda(context.parsed)
        }
      }
    }
  }

  // Percentuais para o donut
  const cbsPercent = ((sistemaNovo.cbs / sistemaNovo.total) * 100).toFixed(0)
  const ibsPercent = ((sistemaNovo.ibs / sistemaNovo.total) * 100).toFixed(0)

  const gerarPDF = async () => {
    if (typeof window === 'undefined') return
    const html2pdf = (await import('html2pdf.js')).default
    const element = resultadosRef.current
    if (!element) return

    const opt = {
      margin: [12, 10, 12, 10],
      filename: `Relatorio-Reforma-Tributaria-${dadosPadronizados.nomeEmpresa.replace(/\s/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true
      },
      pagebreak: {
        mode: ['avoid-all', 'css'],
        before: '.page-break',
        avoid: '.avoid-break'
      }
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      {/* Logo animada */}
      <div className="fixed bottom-8 right-8 w-32 h-32 md:w-40 md:h-40 z-20">
        <LogoAnimation />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10" ref={resultadosRef}>
        <div className="max-w-5xl mx-auto">

          {/* Cabeçalho PDF */}
          <div className="mb-8 pdf-header">
            <div className="flex items-center justify-between bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <Image src="/images/logo_bumerangue.png" alt="Bumerangue" width={150} height={40} className="w-auto h-10" />
              <div className="text-right">
                <p className="text-[#9CDD00] font-bold text-lg">RELATÓRIO DE SIMULAÇÃO</p>
                <p className="text-white text-sm">Reforma Tributária - LC 214/2025</p>
              </div>
            </div>
          </div>

          {/* Título */}
          <motion.div {...{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }} className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#9CDD00]">Resultado da Simulação</h1>
            <p className="text-lg text-gray-300">{dadosPadronizados.nomeEmpresa}</p>
          </motion.div>


          {/* Cards de Comparação */}
          <motion.div {...{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 } }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-red-600/20 backdrop-blur-md border border-red-600/30 rounded-xl p-6 text-center">
              <p className="text-red-300 text-sm mb-2">Sistema Atual</p>
              <p className="text-3xl font-bold text-white">{formatarMoeda(sistemaAtual.total)}</p>
            </div>
            <div className="bg-[#4527A0]/20 backdrop-blur-md border border-[#4527A0]/30 rounded-xl p-6 text-center">
              <p className="text-[#9CDD00] text-sm mb-2">Reforma Tributária</p>
              <p className="text-3xl font-bold text-white">{formatarMoeda(sistemaNovo.total)}</p>
            </div>
            <div className={`${economia >= 0 ? 'bg-green-600/20 border-green-600/30' : 'bg-red-600/20 border-red-600/30'} backdrop-blur-md border rounded-xl p-6 text-center`}>
              <p className={`${economia >= 0 ? 'text-green-300' : 'text-red-300'} text-sm mb-2`}>{economia >= 0 ? "Economia" : "Aumento"}</p>
              <p className="text-3xl font-bold text-white">{formatarMoeda(Math.abs(economia))}</p>
              <p className="text-sm text-gray-300 mt-1">{formatarPercentual(Math.abs(percentualImpacto))}</p>
            </div>
          </motion.div>

          {/* Dados da Empresa */}
          <motion.div {...{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 } }} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-10 avoid-break">
            <h2 className="text-2xl font-bold mb-6 text-[#9CDD00]">📋 Dados da Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div><span className="text-gray-400">Nome:</span> <span className="text-white font-medium">{dadosPadronizados.nomeEmpresa}</span></div>
              <div><span className="text-gray-400">CNPJ:</span> <span className="text-white font-medium">{formData.cnpj || "Não informado"}</span></div>
              <div><span className="text-gray-400">Sócio:</span> <span className="text-white font-medium">{dadosPadronizados.nomeSocio}</span></div>
              <div><span className="text-gray-400">CPF:</span> <span className="text-white font-medium">{formData.cpfSocio}</span></div>
              <div><span className="text-gray-400">Telefone:</span> <span className="text-white font-medium">{formData.telefone}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white font-medium">{formData.email}</span></div>
              <div><span className="text-gray-400">Regime:</span> <span className="text-white font-medium">{dadosPadronizados.regimeTributario}</span></div>
              <div><span className="text-gray-400">Setor:</span> <span className="text-white font-medium">{dadosPadronizados.setor}</span></div>
              <div><span className="text-gray-400">Receita Bruta:</span> <span className="text-white font-medium">{formatarMoeda(formData.receitaBruta)}</span></div>
            </div>
          </motion.div>

          {/* Gráficos Modernos */}
          <div className="page-break"></div>
          <motion.div {...{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 } }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 avoid-break">

            {/* Gráfico de Barras - Sistema Atual */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">Sistema Atual</h3>
                  <p className="text-3xl font-bold text-white mt-1">{formatarMoeda(sistemaAtual.total)}</p>
                </div>
              </div>
              <div className="h-64">
                <Bar data={dadosGraficoBarras} options={optionsBarras} />
              </div>
            </div>

            {/* Gráfico Donut - Sistema Reforma */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Sistema Reforma</h3>
              <div className="relative h-64 flex items-center justify-center">
                <div className="relative w-56 h-56">
                  <Doughnut data={dadosDonutReforma} options={optionsDonut} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-3xl font-bold">100%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-[#4527A0]"></div>
                    <span className="text-gray-400 text-sm">CBS</span>
                  </div>
                  <p className="text-white font-bold text-lg">{formatarMoeda(sistemaNovo.cbs)}</p>
                  <p className="text-gray-400 text-sm">{cbsPercent}%</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-[#9CDD00]"></div>
                    <span className="text-gray-400 text-sm">IBS</span>
                  </div>
                  <p className="text-white font-bold text-lg">{formatarMoeda(sistemaNovo.ibs)}</p>
                  <p className="text-gray-400 text-sm">{ibsPercent}%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detalhamento Sistema Atual */}
          <motion.div {...{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 } }} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-[#9CDD00]">💳 Sistema Atual - Detalhamento</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {[
                { nome: 'IRPJ', valor: sistemaAtual.irpj, cor: '#6A4C93' },
                { nome: 'CSLL', valor: sistemaAtual.csll, cor: '#4527A0' },
                { nome: 'PIS', valor: sistemaAtual.pis, cor: '#8B7AB8' },
                { nome: 'COFINS', valor: sistemaAtual.cofins, cor: '#9CDD00' },
                { nome: 'ICMS', valor: sistemaAtual.icms, cor: '#7AB800' },
                { nome: 'ISS', valor: sistemaAtual.iss, cor: '#B8E986' },
              ].map((imp, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: imp.cor }}></div>
                  <p className="text-xs text-gray-400">{imp.nome}</p>
                  <p className="font-bold text-white text-sm">{formatarMoeda(imp.valor)}</p>
                  <p className="text-xs text-gray-400">{formatarPercentual((imp.valor / sistemaAtual.total) * 100)}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-[#9CDD00]/50">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">TOTAL</span>
                <span className="font-bold text-xl text-[#9CDD00]">{formatarMoeda(sistemaAtual.total)}</span>
              </div>
            </div>
          </motion.div>

          {/* Detalhamento Sistema Reforma */}
          <motion.div {...{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 } }} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-[#9CDD00]">💳 Sistema Reforma - Detalhamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="w-4 h-4 rounded-full mb-2 bg-[#4527A0]"></div>
                <p className="text-sm text-gray-400">CBS (Federal)</p>
                <p className="font-bold text-white text-2xl">{formatarMoeda(sistemaNovo.cbs)}</p>
                <p className="text-sm text-gray-400 mt-1">{formatarPercentual((sistemaNovo.cbs / sistemaNovo.total) * 100)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="w-4 h-4 rounded-full mb-2 bg-[#9CDD00]"></div>
                <p className="text-sm text-gray-400">IBS (Estadual/Municipal)</p>
                <p className="font-bold text-white text-2xl">{formatarMoeda(sistemaNovo.ibs)}</p>
                <p className="text-sm text-gray-400 mt-1">{formatarPercentual((sistemaNovo.ibs / sistemaNovo.total) * 100)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-gray-400">Base Tributável</p>
                <p className="font-bold text-white text-lg">{formatarMoeda(sistemaNovo.baseTributavel)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-gray-400">Créditos Aproveitáveis</p>
                <p className="font-bold text-green-400 text-lg">{formatarMoeda(sistemaNovo.creditos)}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-[#9CDD00]/50">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">TOTAL</span>
                <span className="font-bold text-xl text-[#9CDD00]">{formatarMoeda(sistemaNovo.total)}</span>
              </div>
            </div>
          </motion.div>

          {/* Setor Beneficiado */}
          {sistemaNovo.config.reducao > 0 && (
            <motion.div {...{ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 } }} className="bg-green-600/20 backdrop-blur-md border border-green-600/30 rounded-xl p-6 mb-10">
              <h3 className="font-bold text-lg mb-2 text-green-300">✅ Setor Beneficiado!</h3>
              <p className="text-white">Sua empresa está em um setor com redução de {sistemaNovo.config.reducao}% conforme a LC 214/2025.</p>
              <p className="text-sm text-gray-300 mt-2">{sistemaNovo.config.nome}</p>
            </motion.div>
          )}

          {/* Botões Ação */}
          <motion.div {...{ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.9 } }} className="flex flex-col sm:flex-row gap-4 justify-center mb-10 no-print">
            <Button onClick={onBack} variant="outline" className="px-8 py-3 bg-white/10 border-white/20">← Voltar</Button>
            <Button
              onClick={gerarPDF}
              className="px-8 py-3 bg-gradient-to-r from-[#4527A0] to-[#9CDD00] hover:opacity-90"
            >
              📄 Gerar PDF do Relatório
            </Button>
            <Button
              onClick={() => window.open(`https://wa.me/5533999160008?text=${encodeURIComponent('Olá! Gostaria de falar sobre a simulação da Reforma Tributária para ' + dadosPadronizados.nomeEmpresa)}`, '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-[#4527A0] to-[#9CDD00] hover:opacity-90"
            >
              💬 Falar com Especialista
            </Button>
          </motion.div>

          {/* Aviso Legal */}
          <div className="bg-yellow-600/20 backdrop-blur-md border border-yellow-600/30 rounded-xl p-6 text-sm">
            <h4 className="font-bold mb-2 text-yellow-300">⚠️ Importante</h4>
            <p className="text-white">Esta é uma simulação estimada. Consulte um contador para análise detalhada.</p>
          </div>

          {/* Rodapé PDF */}
          <div className="mt-8 pt-6 border-t border-white/10 pdf-footer text-center text-sm text-gray-400">
            <p>Relatório gerado por <span className="text-[#9CDD00] font-bold">Bumerangue</span> - {new Date().toLocaleDateString('pt-BR')}</p>
            <p className="mt-1">www.bumeranguebrasil.com.br</p>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .pdf-header, .pdf-footer { display: block !important; }
          .page-break { page-break-after: always; }
          .avoid-break { page-break-inside: avoid; }

          /* Remove backgrounds para PDF */
          * {
            background: white !important;
            color: #000 !important;
            border-color: #ddd !important;
          }

          /* Manter cores importantes */
          h1, h2, h3, .text-green { color: #9CDD00 !important; }
          .chart-container { background: #f9f9f9 !important; }

          /* Ajustar tamanhos */
          .container { max-width: 100% !important; padding: 0 20px !important; }
          h1 { font-size: 24pt !important; margin-bottom: 10pt !important; }
          h2 { font-size: 18pt !important; margin-top: 15pt !important; margin-bottom: 10pt !important; }
          h3 { font-size: 14pt !important; }
          p, div { font-size: 10pt !important; line-height: 1.4 !important; }

          /* Gráficos menores no PDF */
          .chart-pdf { max-height: 200px !important; }
        }

        @page {
          size: A4;
          margin: 15mm 10mm;
        }
      `}</style>
    </div>
  )
}
