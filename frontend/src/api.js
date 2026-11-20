// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Trimite JSON și aruncă eroare dacă răspunsul nu este 2xx.
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers }
  });

  if (!response.ok) {
    throw new Error(`Eroare server: ${response.status}`);
  }

  // 204 No Content nu are corp.
  return response.status === 204 ? null : response.json();
}

export function fetchFacturi() {
  return request("/facturi");
}

export function createFactura(factura) {
  return request("/facturi", {
    method: "POST",
    body: JSON.stringify(factura)
  });
}

export function updateFactura(id, changes) {
  return request(`/facturi/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes)
  });
}

export function deleteFactura(id) {
  return request(`/facturi/${id}`, { method: "DELETE" });
}
