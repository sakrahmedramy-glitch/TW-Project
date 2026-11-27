const URGENTE = ["scazuta", "medie", "mare"];
const TITLU_MAX = 100;

export function valideazaFactura(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { erori: ["Corpul cererii trebuie să fie un obiect JSON"], date };
  }

  const { titlu, urgenta, platita } = body;

  if (!partial || titlu !== undefined) {
    const titluCurat = typeof titlu === "string" ? titlu.trim() : "";
    if (!titluCurat) {
      erori.push("titlu este obligatoriu");
    } else if (titluCurat.length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = titluCurat;
    }
  }

  if (urgenta !== undefined) {
    if (URGENTE.includes(urgenta)) {
      date.urgenta = urgenta;
    } else {
      erori.push(`urgenta trebuie să fie una dintre: ${URGENTE.join(", ")}`);
    }
  } else if (!partial) {
    date.urgenta = "medie";
  }

  if (platita !== undefined) {
    if (typeof platita === "boolean") {
      date.platita = platita;
    } else {
      erori.push("platita trebuie să fie true sau false");
    }
  } else if (!partial) {
    date.platita = false;
  }

  return { erori, date };
}

export function parseId(value) {
  const id = Number(value);
  return /^\d+$/.test(value) && Number.isSafeInteger(id) && id > 0 ? id : null;
}
