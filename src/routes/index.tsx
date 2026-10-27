import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  MapPin,
  Zap,
  ShieldCheck,
  BadgeDollarSign,
  Spool,
  Menu,
  X,
  Replace,
  FoldHorizontal,
  ScissorsLineDashed,
  Combine,
  WandSparkles,
} from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import logo from "@/assets/logo-ms-costuras.webp";
import logoNav from "@/assets/logo-ms-costuras-nav.webp";

const NOME = "Ms Costuras";
const WHATS = "5521973250376";
const MSG = encodeURIComponent("Olá! Vim pelo site e gostaria de fazer um orçamento de costura.");
const WA = `https://wa.me/${WHATS}?text=${MSG}`;
const INSTA = "https://instagram.com/ms_costuras65";
const MAPA =
  "https://www.google.com/maps?q=Avenida+Recife,+20,+Nova+Igua%C3%A7u,+Rio+de+Janeiro&output=embed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${NOME} — Costura e ajustes em Nova Iguaçu` },
      {
        name: "description",
        content:
          "Ajustes, bainhas, troca de zíper e pences em Nova Iguaçu - RJ. Preço justo, rapidez e confiança.",
      },
      { property: "og:title", content: `${NOME} — Costura em Nova Iguaçu` },
      {
        property: "og:description",
        content: "Ajustes de roupa com preço justo e rapidez. Chame no WhatsApp!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const servicos = [
  { nome: "Troca de zíper", preco: "R$ 20", icon: Replace },
  { nome: "Ajuste para apertar", preco: "R$ 20", icon: FoldHorizontal },
  { nome: "Bainha", preco: "R$ 20", icon: ScissorsLineDashed },
  { nome: "Pence", preco: "R$ 10", icon: Spool },
  { nome: "Bainha + pence", preco: "R$ 30", icon: Combine },
  { nome: "Outros serviços", preco: "Sob consulta", icon: WandSparkles },
];

const difs = [
  { t: "Preço justo", d: "Valores claros e honestos.", icon: BadgeDollarSign },
  { t: "Rapidez", d: "Sua peça pronta sem demora.", icon: Zap },
  { t: "Confiabilidade", d: "Cuidado com cada detalhe.", icon: ShieldCheck },
];

function WaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-whatsapp-foreground bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground shadow-lg transition motion-safe:hover:scale-105"
    >
      <WhatsAppIcon className="h-5 w-5" /> {children}
    </a>
  );
}

function Titulo({ children, claro }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <h2
      className={`mb-8 text-3xl font-semibold after:mt-3 after:block after:w-14 after:border-b-2 after:border-dashed after:border-current after:opacity-50 after:content-[''] ${claro ? "text-wine-foreground" : "text-primary"}`}
    >
      {children}
    </h2>
  );
}

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#horario", label: "Horário" },
  { href: "#contato", label: "Contato" },
];

function Navbar() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAberto(false);
      botao.current?.focus();
    };
    document.addEventListener("keydown", fechar);
    return () => document.removeEventListener("keydown", fechar);
  }, [aberto]);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5">
        <a href="#inicio" className="flex min-h-11 items-center gap-2 font-semibold text-primary">
          <img
            src={logoNav}
            alt=""
            width={93}
            height={64}
            loading="eager"
            decoding="async"
            className="h-8 w-auto rounded-lg"
          />{" "}
          {NOME}
        </a>
        <nav aria-label="Menu principal" className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          ref={botao}
          type="button"
          aria-controls="menu-celular"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full text-primary sm:hidden"
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {aberto && (
        <nav
          id="menu-celular"
          aria-label="Menu celular"
          className="border-t border-border bg-background px-5 py-3 sm:hidden"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 font-medium text-muted-foreground transition hover:bg-secondary hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <section
          id="inicio"
          className="fabric-texture relative overflow-hidden px-5 pb-16 pt-28 text-center"
        >
          <h1 className="sr-only">{NOME} — Costura e ajustes em Nova Iguaçu - RJ</h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Clock className="h-4 w-4" /> Atendimento de seg a sáb
          </span>
          <img
            src={logo}
            alt={`Logo ${NOME}`}
            width={560}
            height={560}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="mx-auto mt-6 h-[200px] w-[200px] rounded-full object-cover shadow-xl sm:h-[280px] sm:w-[280px]"
          />
          <p className="mx-auto mt-8 max-w-md font-display text-2xl font-semibold text-primary sm:text-3xl">
            Sua roupa do jeitinho certo
          </p>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground">
            Costura e ajustes com carinho em Nova Iguaçu - RJ
          </p>
          <div className="mt-8">
            <WaButton>Chamar no WhatsApp</WaButton>
          </div>
        </section>

        <section id="servicos" className="scroll-mt-16 px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <Titulo>Serviços e preços</Titulo>
            <div className="stitch overflow-hidden rounded-2xl bg-card shadow-sm">
              <div aria-hidden="true" className="fita-metrica h-4 border-b border-border" />
              <ul className="px-4 py-3 sm:px-8 sm:py-5">
                {servicos.map(({ nome, preco, icon: I }) => (
                  <li key={nome} className="flex items-baseline gap-2 py-3 sm:gap-3">
                    <I aria-hidden="true" className="h-5 w-5 shrink-0 self-center text-primary" />
                    <span className="min-w-0 font-semibold sm:text-lg">{nome}</span>
                    <span
                      aria-hidden="true"
                      className="min-w-4 flex-1 border-b-2 border-dashed border-stitch"
                    />
                    <span className="shrink-0 font-display text-2xl font-semibold leading-none text-primary sm:text-3xl">
                      {preco}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="diferenciais"
          className="on-dark scroll-mt-16 bg-wine px-5 py-16 text-wine-foreground"
        >
          <div className="mx-auto max-w-4xl">
            <Titulo claro>Nossos diferenciais</Titulo>
            <ul className="grid rounded-2xl border-2 border-dashed border-wine-muted/40 bg-white/5 sm:grid-cols-3">
              {difs.map(({ t, d, icon: I }) => (
                <li
                  key={t}
                  className="border-wine-muted/40 p-6 not-first:border-t-2 not-first:border-dashed sm:border-t-0 sm:not-first:border-l-2 sm:not-first:border-t-0 sm:not-first:border-dashed"
                >
                  <I aria-hidden="true" className="h-9 w-9 text-linen" />
                  <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                  <p className="mt-1 text-wine-muted">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="horario" className="scroll-mt-16 bg-linen px-5 py-16">
          <div className="mx-auto max-w-4xl">
            <Titulo>Horário e localização</Titulo>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="stitch relative z-10 flex flex-col gap-4 rounded-2xl bg-card p-6 pb-9 shadow-sm md:w-72 md:shrink-0 md:pb-6 md:pr-9">
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-stitch bg-linen md:bottom-auto md:left-auto md:right-3 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
                />
                <p className="flex gap-3">
                  <Clock className="h-6 w-6 shrink-0 text-primary" />
                  <span>
                    <b>Segunda a sábado</b>
                    <br />
                    9h às 12h e 14h às 17h
                  </span>
                </p>
                <p className="flex gap-3">
                  <MapPin className="h-6 w-6 shrink-0 text-primary" />
                  <span>Nova Iguaçu - RJ</span>
                </p>
              </div>
              <span
                aria-hidden="true"
                className="mx-auto h-8 border-l-2 border-dashed border-stitch md:mx-0 md:h-0 md:w-10 md:border-l-0 md:border-t-2"
              />
              <iframe
                title="Mapa"
                src={MAPA}
                loading="lazy"
                className="stitch h-72 w-full rounded-2xl bg-card shadow-sm md:h-96 md:flex-1"
              />
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="on-dark scroll-mt-16 bg-primary px-5 py-16 text-primary-foreground"
        >
          <div className="mx-auto max-w-4xl">
            <Titulo claro>Fale com a gente</Titulo>
            <p className="max-w-md text-lg">Mande uma mensagem e faça seu orçamento.</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <WaButton>Enviar mensagem</WaButton>
              <a
                href={INSTA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-primary-foreground px-6 py-3 font-bold transition hover:bg-primary-foreground hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-wine px-5 pb-24 pt-14 text-wine-foreground sm:pb-14">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="flex items-center gap-3 font-display text-2xl font-semibold">
                <img
                  src={logoNav}
                  alt=""
                  width={93}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto rounded-lg"
                />{" "}
                {NOME}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Endereço</h2>
              <address className="mt-2 not-italic text-wine-muted">
                Avenida Recife, 20 — Nova Iguaçu - RJ
              </address>
              <h2 className="mt-6 text-lg font-semibold">Horário</h2>
              <p className="mt-2 text-wine-muted">
                <b className="font-semibold text-wine-foreground">Segunda a sábado</b>
                <br />
                9h às 12h e 14h às 17h
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Redes</h2>
              <ul className="mt-2">
                <li>
                  <a
                    href={INSTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram @ms_costuras65, abre em nova aba"
                    className="flex min-h-11 items-center gap-2 rounded-lg text-wine-muted underline-offset-4 transition hover:text-wine-foreground hover:underline"
                  >
                    <InstagramIcon className="h-5 w-5" /> @ms_costuras65
                  </a>
                </li>
                <li>
                  <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chamar no WhatsApp, abre em nova aba"
                    className="flex min-h-11 items-center gap-2 rounded-lg text-wine-muted underline-offset-4 transition hover:text-wine-foreground hover:underline"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Chamar no WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-10 border-t-2 border-dashed border-wine-muted/30 pt-6 text-sm text-wine-muted">
            © {NOME} · Nova Iguaçu - RJ
          </p>
        </div>
      </footer>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border-2 border-whatsapp-foreground bg-whatsapp text-whatsapp-foreground shadow-xl transition motion-safe:hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
