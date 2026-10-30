const ETICHETE_URGENTA = {
  scazuta: "scăzută",
  medie: "medie",
  mare: "mare"
};

export default function InvoiceCard({ factura, onToggle, onDelete }) {
  const stareClass = factura.platita ? "paid" : "unpaid";

  return (
    <li className={`item-card${factura.platita ? " done" : ""}`}>
      <label className="invoice-main">
        <input
          type="checkbox"
          checked={factura.platita}
          onChange={() => onToggle(factura.id)}
        />
        <div>
          <h3>{factura.titlu}</h3>
          <span className={`badge badge-${factura.urgenta}`}>
            Urgență {ETICHETE_URGENTA[factura.urgenta]}
          </span>
        </div>
      </label>
      <span className={`status status-${stareClass}`}>
        {factura.platita ? "Plătită" : "Neplătită"}
      </span>
      <button
        className="btn-danger"
        onClick={() => onDelete(factura.id)}
        aria-label={`Șterge ${factura.titlu}`}
      >
        Șterge
      </button>
    </li>
  );
}
