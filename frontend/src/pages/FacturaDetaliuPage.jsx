import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFactura } from "../api.js";
import { ETICHETE_URGENTA } from "../constants.js";
import styles from "./FacturaDetaliuPage.module.css";

export default function FacturaDetaliuPage() {
  const { id } = useParams(); // text din adresă, de exemplu "3"
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă.
  useEffect(() => {
    let ignore = false;

    fetchFactura(id)
      .then((data) => {
        if (!ignore) {
          setFactura(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="panel">
        <p className="info" role="status" data-testid="loading">
          Se încarcă...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p
          className={`error ${styles.message}`}
          role="alert"
          data-testid="error"
        >
          Factura nu a putut fi încărcată: {error}
        </p>
        <Link to="/">Înapoi la facturi</Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la facturi
      </Link>
      <h2
        className={
          factura.platita ? `${styles.title} ${styles.done}` : styles.title
        }
        data-testid="detail-title"
      >
        {factura.titlu}
      </h2>
      <dl className={styles.fields}>
        <dt>Urgență</dt>
        <dd>
          <span className={`badge badge-${factura.urgenta}`}>
            {ETICHETE_URGENTA[factura.urgenta]}
          </span>
        </dd>
        <dt>Status</dt>
        <dd>
          <span
            className={`status ${
              factura.platita ? "status-paid" : "status-unpaid"
            }`}
          >
            {factura.platita ? "Plătită" : "Neplătită"}
          </span>
        </dd>
        <dt>ID</dt>
        <dd>{factura.id}</dd>
      </dl>
    </section>
  );
}
