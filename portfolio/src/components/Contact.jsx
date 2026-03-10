import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

// Ícones de status
import { FaExclamationCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";

const Contact = ({ language }) => {
  const form = useRef();
  const [status, setStatus] = useState("");

  // Estados para validação de formulário
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const content = {
    pt: {
      tagline: "Vamos conversar",
      title: "Transforme sua ideia em realidade digital.",
      description:
        "Estou disponível para projetos freelance, colaborações ou oportunidades de carreira. Envie uma mensagem e vamos discutir como posso agregar valor ao seu time.",
      nameLabel: "Seu Nome",
      emailLabel: "Seu E-mail",
      messageLabel: "Sua Mensagem",
      buttonText: "Enviar Mensagem",
      loadingText: "Enviando...",
      successMsg: "Mensagem enviada com sucesso!",
      errorMsg: "Erro ao enviar. Tente novamente.",
    },
    en: {
      tagline: "Let's connect",
      title: "Turn your idea into digital reality.",
      description:
        "I am available for freelance projects, collaborations, or career opportunities. Send a message and let's discuss how I can add value to your team.",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      buttonText: "Send Message",
      loadingText: "Sending...",
      successMsg: "Message sent successfully!",
      errorMsg: "Error sending. Please try again.",
    },
  };

  const text = content[language];

  // Validação de formulário
  const validateForm = () => {
    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;
    const newErrors = {};

    if (!name.trim()) newErrors.user_name = "Nome é obrigatório";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.user_email = "E-mail inválido";
    if (!message.trim()) newErrors.message = "Mensagem é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // chamar validação antes de enviar
    if (!validateForm()) {
      return; // Não continua se tiver erros
    }

    setStatus("loading");
    // Lembre-se de colocar suas chaves do EmailJS aqui
    emailjs
      .sendForm(
        "service_wo4vk2b", // ID do serviço
        "template_22mzy1l", // ID do template
        form.current,
        "wx5kVH1zKLNd5FhEP", // Chave pública
      )
      .then(
        () => {
          setStatus("success");
          e.target.reset();
        },
        () => {
          setStatus("error");
        },
      );
  };

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/seu-linkedin",
      label: "LinkedIn",
    },
    { icon: FaGithub, href: "https://github.com/seu-github", label: "GitHub" },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/5531999999999",
      label: "WhatsApp",
    },
    {
      icon: FaEnvelope,
      href: "mailto:contato@luizfernando.dev",
      label: "Email",
    },
  ];

  return (
    <section id="contato" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Coluna da Esquerda: Textos e Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-neon-cyan font-bold tracking-widest uppercase mb-4 block text-sm flex items-center gap-2">
            <div className="w-8 h-px bg-neon-cyan"></div> {text.tagline}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {text.title}
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-lg font-light">
            {text.description}
          </p>

          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 hover:-translate-y-1.5 shadow-lg group"
              >
                <link.icon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Coluna da Direita: Formulário Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-black/40 backdrop-blur-md bg-black/60 border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
          >
            <div className="space-y-6">
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 block tracking-wide">
                  {text.nameLabel}
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className={`w-full bg-white/5 border rounded-xl p-4 text-white placeholder-slate-500 backdrop-blur-sm
                  ${errors.user_name ? "border-red-500" : "border-white/10"}
                  focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 block tracking-wide">
                  {text.emailLabel}
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className={`w-full bg-white/5 border rounded-xl p-4 text-white placeholder-slate-500 backdrop-blur-sm
                  ${errors.user_email ? "border-red-500" : "border-white/10"}
                  focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 block tracking-wide">
                  {text.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className={`w-full bg-white/5 border rounded-xl p-4 text-white placeholder-slate-500 backdrop-blur-sm
                  ${errors.message ? "border-red-500" : "border-white/10"}
                  focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all resize-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white/10 text-white border border-neon-cyan hover:bg-neon-cyan hover:text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 mt-4 shadow-lg flex justify-center items-center"
              >
                {status === "loading" ? <FaSpinner className="animate-spin text-xl" /> : text.buttonText}
              </button>
              
              {/* Feedback States */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 mt-4 bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20 justify-center">
                  <FaCheckCircle /> <span className="text-sm font-semibold">{text.successMsg}</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 mt-4 bg-red-400/10 p-3 rounded-lg border border-red-400/20 justify-center">
                  <FaExclamationCircle /> <span className="text-sm font-semibold">{text.errorMsg}</span>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
