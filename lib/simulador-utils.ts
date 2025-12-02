export function formatarMoeda(valor: number): string {
  if (!valor || valor === 0) return "R$ 0,00"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}

export function formatarPercentual(valor: number): string {
  return valor.toFixed(1).replace(".", ",") + "%"
}

export function parseMoeda(valor: string): number {
  if (!valor) return 0
  // Remove tudo exceto números
  const apenasNumeros = valor.replace(/\D/g, "")
  if (!apenasNumeros) return 0
  // Converte centavos para valor decimal
  const numero = Number.parseFloat(apenasNumeros) / 100
  return numero || 0
}

export function mascaraCNPJ(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export function mascaraCPF(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export function mascaraTelefone(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1")
}

export function padronizarTexto(texto: string): string {
  if (!texto) return ""
  // Converte para minúsculas e capitaliza primeira letra de cada palavra
  return texto
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function padronizarRegime(regime: string): string {
  const regimes: { [key: string]: string } = {
    simples: "Simples Nacional",
    presumido: "Lucro Presumido",
    real: "Lucro Real",
  }
  return regimes[regime] || padronizarTexto(regime)
}

export function padronizarSetor(setor: string): string {
  const setores: { [key: string]: string } = {
    comercio: "Comércio",
    industria: "Indústria",
    servicos: "Serviços",
  }
  return setores[setor] || padronizarTexto(setor)
}
