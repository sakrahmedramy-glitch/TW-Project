import { useEffect, useState } from "react";
import { fetchFacturi } from "./api.js";
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
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

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
          <h2>Facturile mele</h2>
          <p className="panel-description">
            Plățile tale, organizate după nivelul de urgență.
          </p>
          {loading && (
            <p className="info" role="status">
              Se încarcă...
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              Nu am putut încărca facturile: {error}. Rulează{" "}
              <code>npm run api</code>.
            </p>
          )}
          {!loading && !error && (
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
