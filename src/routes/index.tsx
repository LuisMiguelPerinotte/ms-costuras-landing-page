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
import { useReveal } from "@/hooks/use-reveal";
import logo from "@/assets/logo-ms-costuras.webp";
import logoNav from "@/assets/logo-ms-costuras-nav.webp";

// shortcut: domínio de produção desconhecido, preencher com a URL do site (ex.: https://seu-dominio.com.br) para a prévia do WhatsApp funcionar
const SITE_URL = "";
const NOME = "Ms Costuras";
const WHATS = "5521973250376";
const MSG = encodeURIComponent("Olá! Vim pelo site e gostaria de fazer um orçamento de costura.");
const WA = `https://wa.me/${WHATS}?text=${MSG}`;
const INSTA = "https://instagram.com/ms_costuras65";
const MAPA =
  "https://www.google.com/maps?q=Avenida+Recife,+20,+Nova+Igua%C3%A7u,+Rio+de+Janeiro&output=embed";

const OG_TITULO = `${NOME} — Costura em Nova Iguaçu`;
const OG_DESC = "Ajustes de roupa com preço justo e rapidez. Chame no WhatsApp!";
const OG_IMAGEM = `${SITE_URL}/og-image.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${NOME} — Costura e ajustes em Nova Iguaçu` },
      {
        name: "description",
        content:
          "Ajustes, bainhas, troca de zíper e pences em Nova Iguaçu - RJ. Preço justo, rapidez e confiança.",
      },
      { property: "og:title", content: OG_TITULO },
      { property: "og:description", content: OG_DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGEM },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `Logo ${NOME}` },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: NOME },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITULO },
      { name: "twitter:description", content: OG_DESC },
      { name: "twitter:image", content: OG_IMAGEM },
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

const passos = ["Traga a peça", "Combine o ajuste", "Retire na loja"];

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

// Botão de costura: aro, quatro furinhos e o número como texto real.
function BotaoCostura({ n }: { n: number }) {
  return (
    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-linen font-display text-2xl font-semibold leading-none text-primary">
      <svg
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        className="absolute inset-0"
      >
        <circle cx="28" cy="28" r="26" strokeWidth="2" />
        <circle cx="28" cy="28" r="21" strokeWidth="1.5" opacity=".5" />
        <circle cx="16" cy="16" r="2.5" strokeWidth="1.5" />
        <circle cx="40" cy="16" r="2.5" strokeWidth="1.5" />
        <circle cx="16" cy="40" r="2.5" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="2.5" strokeWidth="1.5" />
      </svg>
      {n}
    </span>
  );
}

function Titulo({ children, claro }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <h2
      data-costura
      className={`mb-8 text-3xl font-semibold ${claro ? "text-wine-foreground" : "text-primary"}`}
    >
      {children}
      <svg
        viewBox="0 0 56 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className="mt-3 block h-1 w-14 opacity-60"
      >
        <path pathLength="100" d="M2 2h6m5 0h6m5 0h6m5 0h6m5 0h6" />
      </svg>
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
              className="flex min-h-11 items-center rounded-lg px-3 font-medium text-muted-foreground transition hover:text-primary"
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
  useReveal();
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <section
          id="inicio"
          className="fabric-texture relative overflow-hidden px-5 pb-16 pt-28 text-center"
        >
          <h1 className="sr-only">{NOME} — Costura e ajustes em Nova Iguaçu - RJ</h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-semibold text-primary shadow-sm">
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
          <div data-reveal className="mx-auto max-w-4xl">
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
                    <span className="shrink-0 font-display text-xl font-semibold leading-none text-primary sm:text-3xl">
                      {preco}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-16 bg-linen px-5 py-16">
          <div data-reveal className="mx-auto max-w-4xl">
            <Titulo>Como funciona</Titulo>
            <ol className="md:grid md:grid-cols-3">
              {passos.map((passo, i) => (
                <li
                  key={passo}
                  className="relative flex items-center gap-5 pb-10 last:pb-0 md:flex-col md:gap-4 md:pb-0 md:text-center not-last:before:absolute not-last:before:left-7 not-last:before:top-7 not-last:before:h-full not-last:before:border-l-2 not-last:before:border-dashed not-last:before:border-stitch not-last:before:content-[''] md:not-last:before:left-1/2 md:not-last:before:h-0 md:not-last:before:w-full md:not-last:before:border-l-0 md:not-last:before:border-t-2"
                >
                  <BotaoCostura n={i + 1} />
                  <h3 className="text-xl font-semibold">{passo}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="diferenciais"
          className="scroll-mt-16 bg-background px-5 py-16 text-foreground"
        >
          <div data-reveal className="mx-auto max-w-4xl">
            <Titulo>Nossos diferenciais</Titulo>
            <ul className="grid rounded-2xl border-2 border-dashed border-stitch bg-card sm:grid-cols-3">
              {difs.map(({ t, d, icon: I }) => (
                <li
                  key={t}
                  className="border-stitch p-6 not-first:border-t-2 not-first:border-dashed sm:border-t-0 sm:not-first:border-l-2 sm:not-first:border-t-0 sm:not-first:border-dashed"
                >
                  <I aria-hidden="true" className="h-9 w-9 text-primary" />
                  <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                  <p className="mt-1 text-lg text-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="horario" className="scroll-mt-16 bg-linen px-5 py-16">
          <div data-reveal className="mx-auto max-w-4xl">
            <Titulo>Horário e localização</Titulo>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <div className="stitch relative flex flex-col justify-center gap-6 rounded-2xl bg-card p-5 pb-10 shadow-sm md:p-8 md:pr-12">
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-stitch bg-linen md:bottom-auto md:left-auto md:right-3 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-full h-8 -translate-x-1/2 border-l-2 border-dashed border-stitch md:left-full md:top-1/2 md:h-0 md:w-10 md:-translate-y-1/2 md:translate-x-0 md:border-l-0 md:border-t-2"
                />
                <p className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
                  <Clock className="h-9 w-9 shrink-0 text-primary md:h-10 md:w-10" />
                  <span>
                    <b className="block font-display text-2xl font-semibold text-primary md:text-3xl">
                      Segunda a sábado
                    </b>
                    <span className="mt-1 block text-xl font-semibold">9h às 12h e 14h às 17h</span>
                  </span>
                </p>
                <p className="flex items-center gap-4">
                  <MapPin className="h-9 w-9 shrink-0 text-primary md:h-10 md:w-10" />
                  <span className="text-lg">Nova Iguaçu - RJ</span>
                </p>
              </div>
              <iframe
                title="Mapa"
                src={MAPA}
                loading="lazy"
                className="stitch h-80 w-full rounded-2xl bg-card shadow-sm md:h-auto md:min-h-[24rem]"
              />
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="on-dark scroll-mt-16 bg-wine px-5 py-16 text-wine-foreground"
        >
          <div data-reveal className="mx-auto max-w-4xl">
            <Titulo claro>Fale com a gente</Titulo>
            <p className="max-w-md text-lg">Mande uma mensagem e faça seu orçamento.</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <WaButton>Enviar mensagem</WaButton>
              <a
                href={INSTA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-wine-foreground px-6 py-3 font-bold transition hover:bg-wine-foreground hover:text-wine"
              >
                <InstagramIcon className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-wine px-5 pb-24 text-wine-foreground sm:pb-14">
        <div
          data-reveal
          className="mx-auto max-w-4xl border-t-2 border-dashed border-wine-muted/40 pt-14"
        >
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
              <address className="mt-2 text-lg not-italic text-wine-muted">
                Avenida Recife, 20 — Nova Iguaçu - RJ
              </address>
              <h2 className="mt-6 text-lg font-semibold">Horário</h2>
              <p className="mt-2 text-lg text-wine-muted">
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
          <p className="mt-10 border-t-2 border-dashed border-wine-muted/30 pt-6 text-wine-muted">
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
