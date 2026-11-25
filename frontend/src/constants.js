// Valorile fixe ale câmpului urgenta și etichetele lor, într-un singur loc.
export const URGENTE = [
  { value: "scazuta", label: "Scăzută" },
  { value: "medie", label: "Medie" },
  { value: "mare", label: "Mare" }
];

export const ETICHETE_URGENTA = Object.fromEntries(
  URGENTE.map((u) => [u.value, u.label])
);
