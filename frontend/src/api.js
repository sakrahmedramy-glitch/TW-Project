export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchFacturi() {
  const response = await fetch(`${API_URL}/facturi`);

  if (!response.ok) {
    throw new Error(`Eroare server: ${response.status}`);
  }

  return response.json();
}
