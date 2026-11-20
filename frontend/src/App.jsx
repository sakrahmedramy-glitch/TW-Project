import { useEffect, useState } from "react";
import {
  createFactura,
  deleteFactura,
  fetchFacturi,
  updateFactura
} from "./api.js";
import InvoiceForm from "./components/InvoiceForm.jsx";
import InvoiceList from "./components/InvoiceList.jsx";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [facturi, setFacturi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchFacturi();
        if (!ignore) setFacturi(data);
      } catch (err) {
        if (!ignore) {
          setError(
            `Nu am putut încărca facturile: ${err.message}. Rulează npm run api.`
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Eroarea nu este prinsă aici, ca formularul să o poată afișa.
  async function handleAdd(factura) {
    const creata = await createFactura(factura);
    setFacturi((prev) => [...prev, creata]);
  }

  async function handleToggle(id) {
    const factura = facturi.find((f) => f.id === id);
    if (!factura) return;

    try {
      const actualizata = await updateFactura(id, {
        platita: !factura.platita
      });
      setFacturi((prev) => prev.map((f) => (f.id === id ? actualizata : f)));
      setError(null);
    } catch (err) {
      setError(`Nu am putut actualiza factura: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteFactura(id);
      setFacturi((prev) => prev.filter((f) => f.id !== id));
      setError(null);
    } catch (err) {
      setError(`Nu am putut șterge factura: ${err.message}`);
    }
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
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <div className="app-header-content">
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
          <h2>Adaugă factură</h2>
          <p className="panel-description">
            Completează titlul și nivelul de urgență.
          </p>
          <InvoiceForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <h2>Facturile mele</h2>
          <p className="panel-description">
            Plățile tale, organizate după nivelul de urgență.
          </p>
          {loading && (
            <p className="info" role="status" data-testid="loading">
              Se încarcă...
            </p>
          )}
          {error && (
            <p className="error" role="alert" data-testid="error">
              {error}
            </p>
          )}
          {!loading && (
            <InvoiceList
              facturi={facturi}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </>
  );
}
