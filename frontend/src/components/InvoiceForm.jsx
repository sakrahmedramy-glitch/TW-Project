import { useState } from "react";
import { URGENTE } from "../constants.js";
import styles from "./InvoiceForm.module.css";

const TITLU_MAX = 100;
const URGENTA_IMPLICITA = "medie";

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri.
export default function InvoiceForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [urgenta, setUrgenta] = useState(URGENTA_IMPLICITA);
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul facturii este obligatoriu.";
    if (t.length > TITLU_MAX) {
      return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    }
    if (!URGENTE.some((u) => u.value === urgenta)) {
      return "Alege o urgență validă.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);
    try {
      await onAdd({ titlu: titlu.trim(), urgenta, platita: false });
      setTitlu("");
      setUrgenta(URGENTA_IMPLICITA);
    } catch (err) {
      setEroare(`Nu am putut salva factura: ${err.message}`);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      data-testid="form"
    >
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Factură gaze"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>
      <label>
        Urgență
        <select
          value={urgenta}
          onChange={(e) => setUrgenta(e.target.value)}
          data-testid="form-urgenta"
        >
          {URGENTE.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label}
            </option>
          ))}
        </select>
      </label>
      {eroare && (
        <p className="error" role="alert" data-testid="form-error">
          {eroare}
        </p>
      )}
      <button
        type="submit"
        className={`btn ${styles.submit}`}
        disabled={trimite}
        data-testid="form-submit"
      >
        {trimite ? "Se salvează..." : "Adaugă factura"}
      </button>
    </form>
  );
}
