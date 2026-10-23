const ETICHETE_URGENTA = {
  scazuta: "scăzută",
  medie: "medie",
  mare: "mare"
};

export default function InvoiceCard({ factura }) {
  const stareClass = factura.platita ? "paid" : "unpaid";

  return (
    <li className={`item-card${factura.platita ? " done" : ""}`}>
      <div>
        <h3>{factura.titlu}</h3>
        <span className={`badge badge-${factura.urgenta}`}>
          Urgență {ETICHETE_URGENTA[factura.urgenta]}
        </span>
      </div>
      <span className={`status status-${stareClass}`}>
        {factura.platita ? "Plătită" : "Neplătită"}
      </span>
    </li>
  );
}
