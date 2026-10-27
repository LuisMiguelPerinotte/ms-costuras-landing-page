import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useReveal } from "@/hooks/use-reveal";

const raiz = document.documentElement;
const observados: Element[] = [];

function montar(reduzido: boolean) {
  window.matchMedia = ((query: string) => ({ matches: reduzido, media: query })) as never;
  document.body.innerHTML = `<h2 id="a" data-costura></h2><div id="b" data-reveal></div>`;
  // jsdom não faz layout: o primeiro alvo fica na tela, o segundo abaixo dela
  const topo = { top: 100, bottom: 150 } as DOMRect;
  const fora = { top: 5000, bottom: 5100 } as DOMRect;
  document.getElementById("a")!.getBoundingClientRect = () => topo;
  document.getElementById("b")!.getBoundingClientRect = () => fora;
}

describe("useReveal", () => {
  beforeEach(() => {
    observados.length = 0;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = (el: Element) => observados.push(el);
        unobserve = () => {};
        disconnect = () => {};
      },
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    raiz.classList.remove("reveal-ready");
  });

  it("marca o que já está na tela e observa o resto", () => {
    montar(false);
    const { unmount } = renderHook(() => useReveal());

    expect(document.getElementById("a")).toHaveClass("is-visible");
    expect(document.getElementById("b")).not.toHaveClass("is-visible");
    expect(observados).toEqual([document.getElementById("b")]);
    expect(raiz).toHaveClass("reveal-ready");

    unmount();
    expect(raiz).not.toHaveClass("reveal-ready");
  });

  it("não faz nada com movimento reduzido", () => {
    montar(true);
    renderHook(() => useReveal());

    expect(raiz).not.toHaveClass("reveal-ready");
    expect(observados).toHaveLength(0);
  });
});
