import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaExclamationCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const inputBase = "w-full rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none transition-all text-sm";
const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
};
const inputFocus = {
  borderColor: 'rgba(124,58,237,0.6)',
  background: 'rgba(124,58,237,0.06)',
  boxShadow: '0 0 20px rgba(124,58,237,0.15)',
};

const Contact = ({ language }) => {
  const form   = useRef();
  const [status, setStatus]   = useState("");
  const [errors, setErrors]   = useState({});
  const [focused, setFocused] = useState({});

  const content = {
    pt: {
      tagline: "Vamos conversar",
      title: "Transforme sua ideia em realidade digital.",
      description: "Estou disponível para projetos freelance, colaborações ou oportunidades de carreira. Envie uma mensagem e vamos discutir como posso agregar valor ao seu time.",
      nameLabel: "Seu Nome", emailLabel: "Seu E-mail", messageLabel: "Sua Mensagem",
      buttonText: "Enviar Mensagem", loadingText: "Enviando...",
      successMsg: "Mensagem enviada com sucesso!", errorMsg: "Erro ao enviar. Tente novamente.",
    },
    en: {
      tagline: "Let's connect",
      title: "Turn your idea into digital reality.",
      description: "I am available for freelance projects, collaborations, or career opportunities. Send a message and let's discuss how I can add value to your team.",
      nameLabel: "Your Name", emailLabel: "Your Email", messageLabel: "Your Message",
      buttonText: "Send Message", loadingText: "Sending...",
      successMsg: "Message sent successfully!", errorMsg: "Error sending. Please try again.",
    },
  };
  const text = content[language];

  const validateForm = () => {
    const name    = form.current.user_name.value;
    const email   = form.current.user_email.value;
    const message = form.current.message.value;
    const newErrors = {};
    if (!name.trim())    newErrors.user_name  = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.user_email = true;
    if (!message.trim()) newErrors.message    = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("loading");
    emailjs.sendForm("service_wo4vk2b", "template_22mzy1l", form.current, "wx5kVH1zKLNd5FhEP")
      .then(() => { setStatus("success"); e.target.reset(); }, () => setStatus("error"));
  };

  const socialLinks = [
    { icon: FaLinkedin,  href: "https://linkedin.com/in/seu-linkedin", label: "LinkedIn"  },
    { icon: FaGithub,    href: "https://github.com/seu-github",        label: "GitHub"    },
    { icon: FaWhatsapp,  href: "https://wa.me/5531999999999",          label: "WhatsApp"  },
    { icon: FaEnvelope,  href: "mailto:contato@luizfernando.dev",      label: "Email"     },
  ];

  const getFieldStyle = (name) => ({
    ...inputStyle,
    ...(focused[name] ? inputFocus : {}),
    ...(errors[name]  ? { borderColor: 'rgba(239,68,68,0.6)' } : {}),
  });

  return (
    <section id="contato" className="py-28 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* ── Left: Text + social ── */}
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase mb-4 flex items-center gap-3"
              style={{ color: 'var(--accent-violet)' }}>
              <span className="h-px w-8 flex-shrink-0" style={{ background: 'var(--grad-bar)' }} />
              {text.tagline}
            </p>

            <h2 className="font-extrabold text-white leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              {text.title}
            </h2>

            <span className="accent-bar mb-6 block" />

            <p className="text-base font-light leading-relaxed mb-10 max-w-md" style={{ color: 'var(--color-text-2)' }}>
              {text.description}
            </p>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl text-white transition-colors group"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                  aria-label={link.label}
                >
                  <link.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div variants={fadeUp}>
            <form
              ref={form}
              onSubmit={sendEmail}
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(13,10,30,0.70)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>
                    {text.nameLabel}
                  </label>
                  <input type="text" name="user_name" required className={inputBase} style={getFieldStyle('user_name')}
                    onFocus={() => setFocused(f => ({ ...f, user_name: true  }))}
                    onBlur ={() => setFocused(f => ({ ...f, user_name: false }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>
                    {text.emailLabel}
                  </label>
                  <input type="email" name="user_email" required className={inputBase} style={getFieldStyle('user_email')}
                    onFocus={() => setFocused(f => ({ ...f, user_email: true  }))}
                    onBlur ={() => setFocused(f => ({ ...f, user_email: false }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>
                    {text.messageLabel}
                  </label>
                  <textarea name="message" rows="5" required className={`${inputBase} resize-none`} style={getFieldStyle('message')}
                    onFocus={() => setFocused(f => ({ ...f, message: true  }))}
                    onBlur ={() => setFocused(f => ({ ...f, message: false }))} />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(124,58,237,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 px-8 rounded-xl font-bold text-sm text-white transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50"
                  style={{ background: 'var(--accent-violet)', boxShadow: '0 0 0 0 rgba(124,58,237,0)' }}
                >
                  {status === "loading"
                    ? <><FaSpinner className="animate-spin" /> {text.loadingText}</>
                    : text.buttonText}
                </motion.button>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-3 rounded-xl border border-emerald-400/20 justify-center text-sm font-semibold">
                    <FaCheckCircle /> {text.successMsg}
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 justify-center text-sm font-semibold">
                    <FaExclamationCircle /> {text.errorMsg}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
