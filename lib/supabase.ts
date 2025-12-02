import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criar cliente apenas se as credenciais existirem
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Tipos para o banco
export interface Cliente {
  id?: string
  created_at?: string
  nome_empresa: string
  cnpj?: string
  cpf_responsavel?: string
  telefone?: string
  email?: string
  estado: string
  regime_tributario: string
  setor: string
  receita_bruta_anual: number // em centavos
  custos_operacionais: number // em centavos
  setor_especifico: string
  percentual_creditos: number
  aliquota_cbs: number
  aliquota_ibs: number
}

export interface ResultadoSimulacao {
  id?: string
  cliente_id: string
  created_at?: string

  // Sistema Atual
  sistema_atual_base: number
  sistema_atual_irpj: number
  sistema_atual_csll: number
  sistema_atual_pis: number
  sistema_atual_cofins: number
  sistema_atual_icms: number
  sistema_atual_iss: number
  sistema_atual_total: number

  // Sistema Novo
  sistema_novo_base: number
  sistema_novo_creditos: number
  sistema_novo_cbs: number
  sistema_novo_ibs: number
  sistema_novo_total: number

  // Configuração
  setor_especifico_aplicado: string
  aliquota_efetiva: number
  reducao_percentual: number

  // Comparação
  economia_valor: number
  economia_percentual: number
}

// Função para salvar simulação completa
export async function salvarSimulacao(
  dadosCliente: Omit<Cliente, 'id' | 'created_at'>,
  dadosResultado: Omit<ResultadoSimulacao, 'id' | 'created_at' | 'cliente_id'>
) {
  // Se o Supabase não estiver configurado, retorna sucesso sem salvar
  if (!supabase) {
    console.warn('Supabase não configurado. Dados não foram salvos.')
    return { sucesso: true, aviso: 'Supabase não configurado' }
  }

  try {
    // 1. Salvar cliente
    const { data: cliente, error: erroCliente } = await supabase
      .from('clientes')
      .insert([dadosCliente])
      .select()
      .single()

    if (erroCliente) {
      console.error('Erro ao salvar cliente:', erroCliente)
      return { sucesso: false, erro: erroCliente.message }
    }

    // 2. Salvar resultado
    const { data: resultado, error: erroResultado } = await supabase
      .from('resultados_simulacao')
      .insert([{
        ...dadosResultado,
        cliente_id: cliente.id
      }])
      .select()
      .single()

    if (erroResultado) {
      console.error('Erro ao salvar resultado:', erroResultado)
      return { sucesso: false, erro: erroResultado.message }
    }

    return {
      sucesso: true,
      clienteId: cliente.id,
      resultadoId: resultado.id
    }
  } catch (error) {
    console.error('Erro ao salvar simulação:', error)
    return { sucesso: false, erro: 'Erro desconhecido' }
  }
}
