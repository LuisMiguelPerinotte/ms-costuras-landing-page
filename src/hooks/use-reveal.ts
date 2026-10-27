import { useEffect } from "react";

const ALVOS = "[data-costura], [data-reveal]";

// Marca `is-visible` nos alvos conforme entram na tela. O CSS só esconde sob `.reveal-ready`,
// então sem JS ou com movimento reduzido tudo aparece direto, no estado final.
// shortcut: elementos mais altos que 5x a tela nunca chegam a 20% visível, trocar o threshold se surgir um assim.
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const limite = window.innerHeight * 0.9;
    const restantes: Element[] = [];
    document.querySelectorAll(ALVOS).forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < limite && bottom > 0) el.classList.add("is-visible");
      else restantes.push(el);
    });
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }),
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    restantes.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);
}
