import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SimuladorForm from "@/components/simulador/simulador-form"

export const metadata = {
  title: "Simulador Reforma Tributária CJL - Bumerangue",
  description: "Simule o impacto da reforma tributária CJL na sua empresa com CBS e IBS",
}

export default function SimuladorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <SimuladorForm />
      </div>
      <Footer />
    </main>
  )
}
