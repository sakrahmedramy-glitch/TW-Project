const facturi = [
  { id: 1, titlu: "Factură electricitate", platita: false, urgenta: "mare" },
  { id: 2, titlu: "Abonament internet", platita: true, urgenta: "medie" },
  { id: 3, titlu: "Factură apă", platita: false, urgenta: "scazuta" }
];

const URGENTE = ["scazuta", "medie", "mare"];
let ultimulIdAlocat = facturi.reduce(
  (max, factura) => Math.max(max, factura.id),
  0
);

function listeazaTitluri(lista) {
  return lista.map((factura) => factura.titlu);
}

function numaraNeplatite(lista) {
  return lista.filter((factura) => !factura.platita).length;
}

function cautaDupaTitlu(lista, text) {
  const cautare = text.trim().toLowerCase();

  if (!cautare) {
    return [];
  }

  return lista.filter((factura) =>
    factura.titlu.toLowerCase().includes(cautare)
  );
}

function nextId(lista) {
  const maxIdDinLista = lista.reduce(
    (max, factura) => Math.max(max, factura.id),
    0
  );
  ultimulIdAlocat = Math.max(ultimulIdAlocat, maxIdDinLista) + 1;
  return ultimulIdAlocat;
}

function adaugaFactura(lista, titlu, urgenta = "medie") {
  const titluValid = titlu.trim();

  if (!titluValid) {
    console.log("Date invalide: titlul nu poate fi gol.");
    return lista;
  }

  if (titluValid.length > 100) {
    console.log("Date invalide: titlul nu poate depăși 100 de caractere.");
    return lista;
  }

  if (!URGENTE.includes(urgenta)) {
    console.log(`Date invalide: urgența "${urgenta}" nu este permisă.`);
    return lista;
  }

  const facturaNoua = {
    id: nextId(lista),
    titlu: titluValid,
    platita: false,
    urgenta
  };

  return [...lista, facturaNoua];
}

function comutaStare(lista, id) {
  if (!lista.find((factura) => factura.id === id)) {
    return lista;
  }

  return lista.map((factura) =>
    factura.id === id ? { ...factura, platita: !factura.platita } : factura
  );
}

function stergeFactura(lista, id) {
  return lista.filter((factura) => factura.id !== id);
}

console.group("Facturi: listare și căutare");
console.log("Titluri:", listeazaTitluri(facturi).join(", "));
console.log("Număr facturi neplătite:", numaraNeplatite(facturi));
console.log("Căutare după 'factură':", cautaDupaTitlu(facturi, "factură"));
console.groupEnd();

console.group("Adăugare și validare");
const listaCuFacturaNoua = adaugaFactura(facturi, "Factura telefon");
console.log("Lista nouă după adăugare:", listaCuFacturaNoua);
console.log("Urgența implicită:", listaCuFacturaNoua[3].urgenta);
console.log("Array-ul original a rămas cu:", facturi.length, "facturi");
console.assert(listaCuFacturaNoua.length === 4, "Factura validă trebuia adăugată.");
console.assert(facturi.length === 3, "Array-ul original nu trebuia modificat.");
console.assert(listaCuFacturaNoua[3].id === 4, "ID-ul nou trebuia să fie 4.");
console.log("Adăugare invalidă (titlu gol):", adaugaFactura(facturi, "   ", "mare"));
console.log("Adăugare invalidă (titlu peste 100 de caractere):", adaugaFactura(facturi, "x".repeat(101), "mare"));
console.log("Adăugare invalidă (urgență invalidă):", adaugaFactura(facturi, "Factură internet", "foarte mare"));
const dupaStergere = stergeFactura(facturi, 3);
const dupaAdaugareSiStergere = adaugaFactura(dupaStergere, "Factura gaz");
console.log("ID după ștergerea facturii cu ID 3:", dupaAdaugareSiStergere[2].id);
console.assert(dupaAdaugareSiStergere[2].id === 5, "ID-ul nu trebuie să fie reutilizat după ștergere.");
console.groupEnd();

console.group("Comutare stare și ștergere");
const listaCuStareComutata = comutaStare(facturi, 1);
console.log("Comutare stare pentru factura 1:", listaCuStareComutata);
console.log("Array-ul original, factura 1 neplătită:", facturi[0].platita === false);
console.assert(listaCuStareComutata[0].platita === true, "Starea facturii trebuia comutată.");
console.assert(facturi[0].platita === false, "Comutarea nu trebuia să modifice array-ul original.");
console.log("Șterge factura 2:", stergeFactura(facturi, 2));
console.groupEnd();
