import { Heart } from "lucide-react";
import carretel from "@/assets/carretel-logo.webp";

// Logo em camadas (disco, anel, carretel, "Ms", "Costuras", frase). Toda medida interna é
// múltiplo de --d (diâmetro do disco), então escala de 200px para 280px sem container query.
export function LogoHero() {
  return (
    <div
      role="img"
      aria-label="Logo Ms Costuras"
      className="hero-entra relative mx-auto mt-6 h-[var(--d)] w-[var(--d)] [--d:200px] sm:[--d:280px]"
      style={{ "--i": 1 } as React.CSSProperties}
    >
      <div aria-hidden="true" className="absolute inset-0 rounded-full bg-logo-creme shadow-xl" />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {/* Máscara revela o tracejado a partir do topo, no sentido horário (o anel fica no final). */}
        <mask id="logo-anel-mascara">
          <circle
            className="logo-anel-mascara"
            cx="50"
            cy="50"
            r="40.5"
            pathLength="100"
            stroke="white"
            strokeWidth="6"
            strokeDasharray="100"
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
        </mask>
        <circle
          cx="50"
          cy="50"
          r="40.5"
          pathLength="360"
          className="stroke-logo-anel"
          strokeWidth="0.7"
          strokeDasharray="3.7 2.3"
          strokeLinecap="round"
          mask="url(#logo-anel-mascara)"
        />
      </svg>
      <div
        aria-hidden="true"
        className="logo-carretel absolute left-[calc(var(--d)*0.4)] top-[calc(var(--d)*0.04)] h-[calc(var(--d)*0.21)] w-[calc(var(--d)*0.21)] rounded-full bg-logo-creme"
      >
        <div className="logo-carretel-oscila h-full w-full">
          <img
            src={carretel}
            alt=""
            width={240}
            height={240}
            loading="eager"
            decoding="async"
            className="h-full w-full"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(var(--d)*0.235)] text-center leading-none"
      >
        <span className="inline-block whitespace-nowrap font-logo-ms text-[calc(var(--d)*0.28)] font-bold tracking-[0.06em] text-logo-rosa">
          Ms
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(var(--d)*0.43)] text-center leading-none"
      >
        <span className="inline-block whitespace-nowrap font-script text-[calc(var(--d)*0.215)] font-normal text-logo-marrom">
          Costuras
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(var(--d)*0.67)] text-center font-script text-[calc(var(--d)*0.066)] font-normal leading-[1.15] text-logo-frase"
      >
        <span className="block whitespace-nowrap">Costurar é mais que ofício,</span>
        <span className="inline-flex items-center gap-[calc(var(--d)*0.01)] whitespace-nowrap">
          é cuidar de histórias!
          <Heart className="h-[calc(var(--d)*0.06)] w-[calc(var(--d)*0.06)]" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}
