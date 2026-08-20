import ContactForm from "./ContactForm";


const socials = [
  {
    icon: "fab fa-github",
    label: "GitHub",
    handle: "@Zaid7700S",
    href: "https://github.com/Zaid7700S",
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    handle: "Zaid Arshad",
    href: "https://www.linkedin.com/in/zaid-arshad-dev/",
  },
  {
    icon: "fas fa-file-arrow-down",
    label: "Resume / CV",
    handle: "Download PDF",
    href: "/resume.pdf",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-24 md:py-36 z-10"
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative">
        <div className="flex items-center justify-center gap-3 font-mono text-xs text-[var(--muted)] mb-10 reveal">
          <span className="section-num">06 / CONTACT</span>
          <span className="w-10 h-px bg-[var(--border)]" />
          <span>LET&apos;S TALK</span>
        </div>

        <h2 className="text-5xl md:text-8xl font-bold leading-[0.9] mb-8 reveal reveal-d1">
          Let&apos;s build
          <br />
          <span className="font-serif italic text-[var(--accent)] glow-text">
            something intelligent.
          </span>
        </h2>

        <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-12 reveal reveal-d2 leading-relaxed">
          I&apos;m currently open to internships, part-time roles, and
          collaborations on Agentic AI workflows. If you&apos;re working on
          something exciting, I&apos;d love to hear about it.
        </p>

        <div className="reveal reveal-d3">
          <a
            href="mailto:zaid3055540@gmail.com"
            className="magnetic group inline-flex items-center gap-4 px-8 md:px-10 py-5 md:py-6 bg-[var(--accent)] text-[var(--bg)] rounded-full font-semibold text-lg md:text-xl hover:bg-[var(--fg)] transition-colors"
          >
            <span>zaid3055540@gmail.com</span>
            <i className="fas fa-arrow-right group-hover:rotate-[-45deg] transition-transform" />
          </a>
        </div>

        <div className="max-w-3xl mx-auto mt-12 reveal reveal-d4">
        <ContactForm />
      </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto reveal reveal-d4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              className="group border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)] hover:bg-[var(--bg-2)] transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <i className={`${s.icon} text-2xl text-[var(--accent)]`} />
                <i className="fas fa-arrow-up-right-from-square text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <div className="font-medium">{s.label}</div>
              <div className="text-sm text-[var(--muted)] font-mono mt-1">
                {s.handle}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
