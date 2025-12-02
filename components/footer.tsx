export default function Footer() {
  return (
    <footer className="py-8 md:py-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-poppins">
          Se o seu dinheiro foi, fazemos ele voltar.
        </h3>
        <p className="text-gray-400 font-poppins">
          <span className="text-lime-400 font-bold">Bumerangue</span> - O que é seu, de volta para você.
        </p>
        <p className="text-gray-500 text-xs md:text-sm mt-6 font-poppins">
          © {new Date().getFullYear()} Bumerangue. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
