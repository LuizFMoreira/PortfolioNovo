const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black/60 backdrop-blur-md py-8 text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-slate-300 font-medium mb-2 tracking-wide text-sm">
          &copy; {currentYear} Luiz Fernando Batista Moreira.
        </p>
        <p className="text-slate-500 text-xs tracking-widest uppercase">
          Desenvolvido com React, Vite e precisão algorítmica.
        </p>
      </div>
    </footer>
  );
};

export default Footer;