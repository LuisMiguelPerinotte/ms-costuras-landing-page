import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Zap, ShieldCheck, BadgeDollarSign, Spool, Menu, X, Replace, FoldHorizontal, ScissorsLineDashed, Combine, WandSparkles } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import logo from "@/assets/logo-ms-costuras.jpg";

const NOME = "Ms Costuras";
const WHATS = "5521973250376";
const MSG = encodeURIComponent("Olá! Vim pelo site e gostaria de fazer um orçamento de costura.");
const WA = `https://wa.me/${WHATS}?text=${MSG}`;
const INSTA = "https://instagram.com/ms_costuras65";
const MAPA = "https://www.google.com/maps?q=Avenida+Recife,+20,+Nova+Igua%C3%A7u,+Rio+de+Janeiro&output=embed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${NOME} — Costura e ajustes em Nova Iguaçu` },
      { name: "description", content: "Ajustes, bainhas, troca de zíper e pences em Nova Iguaçu - RJ. Preço justo, rapidez e confiança." },
      { property: "og:title", content: `${NOME} — Costura em Nova Iguaçu` },
      { property: "og:description", content: "Ajustes de roupa com preço justo e rapidez. Chame no WhatsApp!" },
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
    <a href={WA} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground shadow-lg transition hover:scale-105">
      <WhatsAppIcon className="h-5 w-5" /> {children}
    </a>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-8 text-center text-3xl font-semibold text-primary">{children}</h2>;
}

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#horario", label: "Horário" },
  { href: "#contato", label: "Contato" },
];

function Navbar() {
  const [aberto, setAberto] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5">
        <a href="#inicio" className="flex items-center gap-2 font-semibold text-primary">
          <img src={logo} alt="" className="h-8 w-auto rounded-lg" /> {NOME}
        </a>
        <nav aria-label="Menu principal" className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="text-sm font-medium text-muted-foreground transition hover:text-primary">
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-primary sm:hidden"
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {aberto && (
        <nav aria-label="Menu celular" className="border-t border-border bg-background px-5 py-3 sm:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setAberto(false)}
                  className="block rounded-lg px-3 py-2 font-medium text-muted-foreground transition hover:bg-secondary hover:text-primary"
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
    <main className="overflow-x-hidden">
      <Navbar />
      <section id="inicio" className="fabric-texture relative overflow-hidden px-5 pb-16 pt-28 text-center">
        <h1 className="sr-only">{NOME} — Costura e ajustes em Nova Iguaçu - RJ</h1>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
          <Clock className="h-4 w-4" /> Atendimento de seg a sáb
        </span>
        <img src={logo} alt={`Logo ${NOME}`} className="mx-auto mt-6 h-[200px] w-[200px] rounded-full object-cover shadow-xl sm:h-[280px] sm:w-[280px]" />
        <p className="mx-auto mt-8 max-w-md font-display text-2xl font-semibold text-primary sm:text-3xl">Sua roupa do jeitinho certo</p>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground">Costura e ajustes com carinho em Nova Iguaçu - RJ</p>
        <div className="mt-8"><WaButton>Chamar no WhatsApp</WaButton></div>
      </section>

      <section id="servicos" className="mx-auto max-w-4xl scroll-mt-16 px-5 py-16">
        <Titulo>Serviços e preços</Titulo>
        <ul className="grid gap-4 sm:grid-cols-2">
          {servicos.map(({ nome, preco, icon: I }) => (
            <li key={nome} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-primary"><I className="h-6 w-6" /></span>
              <span className="min-w-0 flex-1 font-semibold">{nome}</span>
              <span className="shrink-0 font-bold text-primary">{preco}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="diferenciais" className="scroll-mt-16 bg-muted px-5 py-16">
        <Titulo>Nossos diferenciais</Titulo>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {difs.map(({ t, d, icon: I }) => (
            <div key={t} className="stitch rounded-2xl bg-card p-6 text-center">
              <I className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="horario" className="mx-auto max-w-4xl scroll-mt-16 px-5 py-16">
        <Titulo>Horário e localização</Titulo>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl border bg-card p-6">
            <p className="flex gap-3"><Clock className="h-6 w-6 shrink-0 text-primary" /><span><b>Segunda a sábado</b><br />9h às 12h e 14h às 17h</span></p>
            <p className="flex gap-3"><MapPin className="h-6 w-6 shrink-0 text-primary" /><span>Nova Iguaçu - RJ</span></p>
          </div>
          <iframe title="Mapa" src={MAPA} loading="lazy" className="h-64 w-full rounded-2xl border md:h-full" />
        </div>
      </section>

      <section id="contato" className="scroll-mt-16 bg-primary px-5 py-16 text-center text-primary-foreground">
        <h2 className="text-3xl font-semibold">Fale com a gente</h2>
        <p className="mt-2 opacity-90">Mande uma mensagem e faça seu orçamento.</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <WaButton>Enviar mensagem</WaButton>
          <a href={INSTA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground px-6 py-3 font-bold transition hover:bg-primary-foreground hover:text-primary">
            <InstagramIcon className="h-5 w-5" /> Instagram
          </a>
        </div>
        <p className="mt-12 text-sm opacity-75">© {NOME} · Nova Iguaçu - RJ</p>
      </section>

      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl transition hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </main>
  );
}
