import InvoiceCard from "./InvoiceCard.jsx";
import styles from "./InvoiceList.module.css";

export default function InvoiceList({ facturi, onToggle, onDelete }) {
  if (facturi.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu există nicio factură.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {facturi.map((factura) => (
        <InvoiceCard
          key={factura.id}
          factura={factura}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
