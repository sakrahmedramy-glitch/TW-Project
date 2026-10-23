import InvoiceCard from "./InvoiceCard.jsx";

export default function InvoiceList({ facturi }) {
  if (facturi.length === 0) {
    return <p className="empty">Nu există nicio factură.</p>;
  }

  return (
    <ul className="item-list">
      {facturi.map((factura) => (
        <InvoiceCard key={factura.id} factura={factura} />
      ))}
    </ul>
  );
}
