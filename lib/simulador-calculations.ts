export const icmsPorEstado: { [key: string]: number } = {
  AC: 17,
  AL: 17,
  AP: 17,
  AM: 17,
  BA: 17,
  CE: 17,
  DF: 20,
  ES: 17,
  GO: 17,
  MA: 17,
  MT: 17,
  MS: 17,
  MG: 18,
  PA: 17,
  PB: 17,
  PR: 18,
  PE: 17,
  PI: 17,
  RJ: 20,
  RN: 17,
  RS: 17,
  RO: 17,
  RR: 17,
  SC: 17,
  SP: 18,
  SE: 17,
  TO: 17,
}

export const configuracaoSetoresEspecificos: { [key: string]: any } = {
  nenhum: { nome: "Alíquota Padrão", aliquota: 26.5, reducao: 0 },
  saude: { nome: "Saúde", aliquota: 10.6, reducao: 60 },
  educacao: { nome: "Educação", aliquota: 10.6, reducao: 60 },
  transporte: { nome: "Transporte Público", aliquota: 10.6, reducao: 60 },
  cesta_basica: { nome: "Cesta Básica", aliquota: 0, reducao: 100 },
  medicamentos: { nome: "Medicamentos", aliquota: 10.6, reducao: 60 },
  dispositivos: { nome: "Dispositivos Médicos", aliquota: 10.6, reducao: 60 },
  profissionais: { nome: "Serviços Profissionais", aliquota: 18.55, reducao: 30 },
  combustiveis: { nome: "Combustíveis", aliquota: 15.9, reducao: 40 },
}

export function calcularSistemaAtual(receita: number, regime: string, estado: string, setor: string) {
  let irpj = 0,
    csll = 0,
    pis = 0,
    cofins = 0,
    icms = 0,
    iss = 0

  if (regime === "simples") {
    const aliquotaSimples = 0.065
    const totalSimples = receita * aliquotaSimples
    irpj = totalSimples * 0.2
    csll = totalSimples * 0.1
    pis = totalSimples * 0.04
    cofins = totalSimples * 0.15
    icms = setor === "comercio" || setor === "industria" ? totalSimples * 0.4 : 0
    iss = setor === "servicos" ? totalSimples * 0.11 : 0
  } else if (regime === "presumido") {
    const lucroPresumido = receita * 0.32
    irpj = lucroPresumido * 0.15
    csll = lucroPresumido * 0.09
    pis = receita * 0.0065
    cofins = receita * 0.03
    const aliquotaICMS = icmsPorEstado[estado] || 17
    icms = setor === "comercio" || setor === "industria" ? receita * (aliquotaICMS / 100) : 0
    iss = setor === "servicos" ? receita * 0.05 : 0
  } else {
    const lucroReal = receita * 0.2
    irpj = lucroReal * 0.15
    csll = lucroReal * 0.09
    pis = receita * 0.0165
    cofins = receita * 0.076
    const aliquotaICMS = icmsPorEstado[estado] || 17
    icms = setor === "comercio" || setor === "industria" ? receita * (aliquotaICMS / 100) : 0
    iss = setor === "servicos" ? receita * 0.05 : 0
  }

  const total = irpj + csll + pis + cofins + icms + iss

  return { irpj, csll, pis, cofins, icms, iss, total }
}

export function calcularNovoSistema(
  receita: number,
  custos: number,
  setorEspecifico: string,
  percentualCreditos: number,
  aliquotaCBS: number,
  aliquotaIBS: number,
) {
  const config = configuracaoSetoresEspecificos[setorEspecifico]
  const reducao = config.reducao

  const custosComCredito = custos * (percentualCreditos / 100)
  const baseTributavel = receita - custosComCredito

  if (setorEspecifico === "cesta_basica") {
    return {
      baseTributavel,
      cbs: 0,
      ibs: 0,
      creditos: custosComCredito,
      total: 0,
      config,
    }
  }

  const proporcaoCBS = aliquotaCBS / (aliquotaCBS + aliquotaIBS)
  const proporcaoIBS = aliquotaIBS / (aliquotaCBS + aliquotaIBS)

  const aliquotaCBSEfetiva = config.aliquota * proporcaoCBS
  const aliquotaIBSEfetiva = config.aliquota * proporcaoIBS

  const cbs = baseTributavel * (aliquotaCBSEfetiva / 100)
  const ibs = baseTributavel * (aliquotaIBSEfetiva / 100)

  const total = cbs + ibs

  return {
    baseTributavel,
    cbs,
    ibs,
    creditos: custosComCredito,
    total,
    config,
  }
}
