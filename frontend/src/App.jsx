import { useState } from "react";
import InvoiceList from "./components/InvoiceList.jsx";

const FACTURI_INITIALE = [
  { id: 1, titlu: "Factură electricitate", platita: false, urgenta: "mare" },
  { id: 2, titlu: "Abonament internet", platita: true, urgenta: "medie" },
  { id: 3, titlu: "Factură apă", platita: false, urgenta: "scazuta" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [facturi, setFacturi] = useState(FACTURI_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  function handleToggle(id) {
    setFacturi((prev) =>
      prev.map((factura) =>
        factura.id === id
          ? { ...factura, platita: !factura.platita }
          : factura
      )
    );
  }

  function handleDelete(id) {
    setFacturi((prev) => prev.filter((factura) => factura.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const neplatite = facturi.filter((factura) => !factura.platita).length;

  return (
    <>
      <header className="app-header">
        <div className="app-header-content">
          <button
            className="theme-toggle"
            onClick={handleTema}
            aria-pressed={tema === "dark"}
          >
            {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
          </button>
          <p className="app-eyebrow">Gestiunea facturilor</p>
          <h1>Smart Invoice Payer</h1>
          <p className="app-description">
            Urmărește facturile și vezi rapid ce plăți sunt încă de făcut.
          </p>
          <p className="app-count">
            {facturi.length} facturi, dintre care {neplatite} neplătite
          </p>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Facturile mele</h2>
          <p className="panel-description">
            Plățile tale, organizate după nivelul de urgență.
          </p>
          <InvoiceList
            facturi={facturi}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}
