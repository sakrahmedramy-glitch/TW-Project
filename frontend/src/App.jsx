const facturi = [
  { id: 1, titlu: "Factură electricitate", platita: false, urgenta: "mare" },
  { id: 2, titlu: "Abonament internet", platita: true, urgenta: "medie" },
  { id: 3, titlu: "Factură apă", platita: false, urgenta: "scazuta" }
];

export default function App() {
  const neplatite = facturi.filter((factura) => !factura.platita).length;

  return (
    <>
      <header className="app-header">
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
          <pre>{JSON.stringify(facturi, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
