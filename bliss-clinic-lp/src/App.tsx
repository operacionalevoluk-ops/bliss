import { useEffect } from "react";
import markup from "./landing/markup.html?raw";
import "./landing/landing.css";
import { initLanding } from "./landing/initLanding";

// Landing page Bliss Clinic.
// Conteúdo (textos, links e imagens): src/landing/markup.html
// Estilos: src/landing/landing.css | Interações: src/landing/initLanding.ts
export default function App() {
  useEffect(() => {
    const w = window as unknown as { __blissInit?: boolean };
    if (w.__blissInit) return;
    w.__blissInit = true;
    initLanding();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
