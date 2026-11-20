const ETICHETE_URGENTA = {
  scazuta: "scăzută",
  medie: "medie",
  mare: "mare"
};

export default function InvoiceCard({ factura, onToggle, onDelete }) {
  const stareClass = factura.platita ? "paid" : "unpaid";

  return (
    <li
      className={`item-card${factura.platita ? " done" : ""}`}
      data-testid="item"
      data-id={factura.id}
    >
      <label className="invoice-main">
        <input
          type="checkbox"
          checked={factura.platita}
          onChange={() => onToggle(factura.id)}
          data-testid="item-toggle"
        />
        <div>
          <h3 data-testid="item-title">{factura.titlu}</h3>
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
        data-testid="item-delete"
      >
        Șterge
      </button>
    </li>
  );
}
