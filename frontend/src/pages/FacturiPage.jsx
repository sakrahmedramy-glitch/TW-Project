import { useEffect, useState } from "react";
import {
  createFactura,
  deleteFactura,
  fetchFacturi,
  updateFactura
} from "../api.js";
import InvoiceForm from "../components/InvoiceForm.jsx";
import InvoiceList from "../components/InvoiceList.jsx";
import styles from "./FacturiPage.module.css";

export default function FacturiPage() {
  const [facturi, setFacturi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchFacturi();
        if (!ignore) setFacturi(data);
      } catch (err) {
        if (!ignore) {
          setError(
            `Nu am putut încărca facturile: ${err.message}. Pornește API-ul din backend cu npm run dev.`
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

  const neplatite = facturi.filter((factura) => !factura.platita).length;

  return (
    <div className={styles.grid}>
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
        <p className={styles.summary}>
          {facturi.length} facturi, dintre care {neplatite} neplătite
        </p>
        {loading && (
          <p className={`info ${styles.status}`} role="status" data-testid="loading">
            Se încarcă...
          </p>
        )}
        {error && (
          <p className={`error ${styles.status}`} role="alert" data-testid="error">
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
    </div>
  );
}
