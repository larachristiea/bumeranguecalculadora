# Calculadora Reforma Tributária Bumerangue

Simulador completo da Reforma Tributária (LC 214/2025) com identidade visual Bumerangue.

## 🎯 Funcionalidades

- **Simulação CBS + IBS**: Calcula o impacto da Reforma Tributária LC 214/2025
- **Comparativo Visual**: Gráficos modernos (barras + donut) mostrando Sistema Atual vs Reforma
- **Relatório PDF**: Geração de relatório profissional em PDF
- **Identidade Bumerangue**: Roxo (#4527A0) + Verde Limão (#9CDD00)
- **Glassmorphism**: Efeitos visuais modernos com backdrop blur
- **Animações**: Framer Motion para transições suaves
- **WhatsApp**: Integração direta com especialista
- **Responsive**: Layout adaptável para desktop e mobile

## 🚀 Tecnologias

- **Next.js 15.5.6** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Chart.js** - Gráficos
- **html2pdf.js** - Geração de PDF
- **Supabase** - Database (opcional)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🎨 Identidade Visual

- **Roxo Bumerangue**: `#4527A0`
- **Verde Limão**: `#9CDD00`
- **Fonte**: Poppins
- **Background**: Preto com grid + floating papers
- **Efeitos**: Glassmorphism, parallax, animações

## 📊 Cálculos

### Sistema Atual
- IRPJ, CSLL, PIS, COFINS, ICMS, ISS
- Regimes: Simples Nacional, Lucro Presumido, Lucro Real

### Sistema Reforma (CBS + IBS)
- **CBS**: 8,8% (Federal)
- **IBS**: 17,7% (Estadual/Municipal)
- **Total padrão**: 26,5%
- Setores beneficiados com redução de até 60%

## 🔧 Configuração

### Supabase (Opcional)
Crie um arquivo `.env.local` com:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### WhatsApp
Número configurado: +5533999160008

## 📄 Estrutura

```
/app                    # Pages Next.js
/components            # React components
  /simulador          # Formulário e resultados
  /ui                 # shadcn/ui components
/lib                   # Utilities
  simulador-calculations.ts  # Cálculos tributários
  simulador-utils.ts         # Formatação e padronização
/public               # Assets estáticos
```

## 🎯 Como Usar

1. Acesse `/simulador`
2. Preencha os dados da empresa
3. Visualize o comparativo com gráficos
4. Gere o PDF do relatório
5. Entre em contato via WhatsApp

## 📱 Responsividade

- Mobile first design
- Breakpoints: sm, md, lg, xl
- Gráficos adaptáveis
- Touch-friendly

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

© 2025 Bumerangue - Todos os direitos reservados

---

Desenvolvido com ❤️ por Bumerangue
