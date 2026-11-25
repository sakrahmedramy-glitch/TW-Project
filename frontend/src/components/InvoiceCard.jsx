import { Link } from "react-router-dom";
import { ETICHETE_URGENTA } from "../constants.js";
import styles from "./InvoiceCard.module.css";

export default function InvoiceCard({ factura, onToggle, onDelete }) {
  const stareClass = factura.platita ? "paid" : "unpaid";

  return (
    <li
      className={factura.platita ? `${styles.card} ${styles.done}` : styles.card}
      data-testid="item"
      data-id={factura.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={factura.platita}
          onChange={() => onToggle(factura.id)}
          aria-label={`Marchează ca plătită: ${factura.titlu}`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/facturi/${factura.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {factura.titlu}
          </Link>
          <span className={`badge badge-${factura.urgenta}`}>
            Urgență {ETICHETE_URGENTA[factura.urgenta]?.toLowerCase()}
          </span>
        </div>
      </div>
      <span className={`status status-${stareClass}`}>
        {factura.platita ? "Plătită" : "Neplătită"}
      </span>
      <button
        className="btn-danger"
        onClick={() => onDelete(factura.id)}
        aria-label={`Șterge ${factura.titlu}`}
        data-testid="item-delete"
      >
        Șterge
      </button>
    </li>
  );
}
