import { Router } from "express";
import { parseId, valideazaFactura } from "../validation.js";

const router = Router();

// Etapa 9 păstrează datele în memorie până la repornirea procesului.
const facturi = [
  { id: 1, titlu: "Factură electricitate", platita: false, urgenta: "mare" },
  { id: 2, titlu: "Abonament internet", platita: true, urgenta: "medie" },
  { id: 3, titlu: "Factură apă", platita: false, urgenta: "scazuta" },
  { id: 4, titlu: "Chirie", platita: false, urgenta: "mare" },
  { id: 5, titlu: "Abonament telefon", platita: true, urgenta: "scazuta" },
  { id: 6, titlu: "Factura Internet", platita: true, urgenta: "mare" },
];
let nextId = 7;

router.param("id", (req, res, next, value) => {
  const id = parseId(value);
  if (id === null) {
    return res.status(400).json({ error: "Id invalid" });
  }

  const index = facturi.findIndex((factura) => factura.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Factura nu există" });
  }

  req.facturaIndex = index;
  next();
});

router.get("/", (_req, res) => {
  res.json(facturi);
});

router.get("/:id", (req, res) => {
  res.json(facturi[req.facturaIndex]);
});

router.post("/", (req, res) => {
  const { erori, date } = valideazaFactura(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }

  const factura = { id: nextId++, ...date };
  facturi.push(factura);
  res.status(201).json(factura);
});

router.patch("/:id", (req, res) => {
  const { erori, date } = valideazaFactura(req.body, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }

  const index = req.facturaIndex;
  facturi[index] = { ...facturi[index], ...date };
  res.json(facturi[index]);
});

router.delete("/:id", (req, res) => {
  facturi.splice(req.facturaIndex, 1);
  res.status(204).end();
});

export default router;
