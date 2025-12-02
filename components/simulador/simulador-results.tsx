"use client"

import { Button } from "@/components/ui/button"
import { formatarMoeda, formatarPercentual } from "@/lib/simulador-utils"

export default function SimuladorResults({ data, onBack }: any) {
  const { formData, sistemaAtual, sistemaNovo } = data
  const economia = sistemaAtual.total - sistemaNovo.total
  const percentualImpacto = (economia / sistemaAtual.total) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Resultado da Simulação</h1>
          <p className="text-lg text-muted-foreground">{formData.nomeEmpresa}</p>
        </div>

        {/* Info do Cliente */}
        <div className="bg-card border border-primary/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">Dados da Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-semibold text-white">{formData.nomeEmpresa}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CNPJ</p>
              <p className="font-semibold text-white">{formData.cnpj || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sócio</p>
              <p className="font-semibold text-white">{formData.nomeSocio}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CPF</p>
              <p className="font-semibold text-white">{formData.cpfSocio}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-semibold text-white">{formData.telefone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-white">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Regime</p>
              <p className="font-semibold text-white">{formData.regimeTributario}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Setor</p>
              <p className="font-semibold text-white">{formData.setor}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Receita Bruta</p>
              <p className="font-semibold text-white">{formatarMoeda(formData.receitaBruta)}</p>
            </div>
          </div>
        </div>

        {/* Comparativo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sistema Atual */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-8 text-white">
            <h3 className="text-lg font-semibold mb-4 opacity-90">Sistema Atual</h3>
            <p className="text-4xl font-bold mb-2">{formatarMoeda(sistemaAtual.total)}</p>
            <p className="text-sm opacity-75">Carga tributária anual</p>
          </div>

          {/* Sistema Reforma */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white">
            <h3 className="text-lg font-semibold mb-4 opacity-90">Reforma Tributária</h3>
            <p className="text-4xl font-bold mb-2">{formatarMoeda(sistemaNovo.total)}</p>
            <p className="text-sm opacity-75">Carga tributária anual</p>
          </div>

          {/* Impacto */}
          <div
            className={`bg-gradient-to-br ${economia >= 0 ? "from-green-600 to-green-700" : "from-red-600 to-red-700"} rounded-xl p-8 text-white`}
          >
            <h3 className="text-lg font-semibold mb-4 opacity-90">
              {economia >= 0 ? "Economia Anual" : "Aumento Anual"}
            </h3>
            <p className="text-4xl font-bold mb-2">{formatarMoeda(Math.abs(economia))}</p>
            <p className="text-sm opacity-75">{formatarPercentual(Math.abs(percentualImpacto))}</p>
          </div>
        </div>

        {/* Detalhamento Sistema Atual */}
        <div className="bg-card border border-primary/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">Detalhamento - Sistema Atual</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="pb-4 text-muted-foreground">Imposto</th>
                  <th className="pb-4 text-muted-foreground text-right">Valor</th>
                  <th className="pb-4 text-muted-foreground text-right">% do Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: "IRPJ", valor: sistemaAtual.irpj },
                  { nome: "CSLL", valor: sistemaAtual.csll },
                  { nome: "PIS", valor: sistemaAtual.pis },
                  { nome: "COFINS", valor: sistemaAtual.cofins },
                  { nome: "ICMS", valor: sistemaAtual.icms },
                  { nome: "ISS", valor: sistemaAtual.iss },
                ].map((imp, idx) => (
                  <tr key={idx} className="border-b border-primary/20 hover:bg-primary/5">
                    <td className="py-4">{imp.nome}</td>
                    <td className="py-4 text-right font-semibold">{formatarMoeda(imp.valor)}</td>
                    <td className="py-4 text-right text-muted-foreground">
                      {formatarPercentual((imp.valor / sistemaAtual.total) * 100)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-primary/30">
                  <td className="py-4 font-bold">TOTAL</td>
                  <td className="py-4 text-right font-bold text-lg text-secondary">
                    {formatarMoeda(sistemaAtual.total)}
                  </td>
                  <td className="py-4 text-right font-bold text-lg text-secondary">100,0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detalhamento Sistema Novo */}
        <div className="bg-card border border-primary/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary">Detalhamento - Reforma Tributária (CBS + IBS)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="pb-4 text-muted-foreground">Componente</th>
                  <th className="pb-4 text-muted-foreground text-right">Valor</th>
                  <th className="pb-4 text-muted-foreground text-right">% do Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-primary/20 hover:bg-primary/5">
                  <td className="py-4">Base Tributável</td>
                  <td className="py-4 text-right font-semibold">{formatarMoeda(sistemaNovo.baseTributavel)}</td>
                  <td className="py-4 text-right text-muted-foreground">-</td>
                </tr>
                <tr className="border-b border-primary/20 hover:bg-primary/5">
                  <td className="py-4">Créditos Aproveitáveis</td>
                  <td className="py-4 text-right font-semibold text-green-400">
                    {formatarMoeda(sistemaNovo.creditos)}
                  </td>
                  <td className="py-4 text-right text-muted-foreground">-</td>
                </tr>
                <tr className="border-b border-primary/20 hover:bg-primary/5">
                  <td className="py-4">CBS (Contribuição Social Federal)</td>
                  <td className="py-4 text-right font-semibold">{formatarMoeda(sistemaNovo.cbs)}</td>
                  <td className="py-4 text-right text-muted-foreground">
                    {sistemaNovo.total > 0 ? formatarPercentual((sistemaNovo.cbs / sistemaNovo.total) * 100) : "0,0%"}
                  </td>
                </tr>
                <tr className="border-b border-primary/20 hover:bg-primary/5">
                  <td className="py-4">IBS (Imposto sobre Bens e Serviços)</td>
                  <td className="py-4 text-right font-semibold">{formatarMoeda(sistemaNovo.ibs)}</td>
                  <td className="py-4 text-right text-muted-foreground">
                    {sistemaNovo.total > 0 ? formatarPercentual((sistemaNovo.ibs / sistemaNovo.total) * 100) : "0,0%"}
                  </td>
                </tr>
                <tr className="border-t-2 border-primary/30">
                  <td className="py-4 font-bold">TOTAL</td>
                  <td className="py-4 text-right font-bold text-lg text-secondary">
                    {formatarMoeda(sistemaNovo.total)}
                  </td>
                  <td className="py-4 text-right font-bold text-lg text-secondary">100,0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerta de Benefício se aplicável */}
        {sistemaNovo.config.reducao > 0 && (
          <div className="bg-green-600/20 border border-green-600 rounded-xl p-6 mb-8 text-white">
            <h3 className="font-bold text-lg mb-2">Setor Beneficiado!</h3>
            <p>
              Sua empresa está em um setor com redução de alíquota de {sistemaNovo.config.reducao}% conforme a LC
              214/2025.
            </p>
            <p className="text-sm opacity-75 mt-2">{sistemaNovo.config.nome}</p>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-center mb-8">
          <Button onClick={onBack} variant="outline" className="px-8 py-3 text-lg bg-transparent">
            ← Voltar
          </Button>
          <Button className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Falar com Especialista
          </Button>
        </div>
      </div>
    </div>
  )
}
