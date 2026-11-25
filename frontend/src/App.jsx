import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import FacturaDetaliuPage from "./pages/FacturaDetaliuPage.jsx";
import FacturiPage from "./pages/FacturiPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină.
// Ruta de detaliu folosește resursa din tw.json: /facturi/:id.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FacturiPage />} />
        <Route path="/facturi/:id" element={<FacturaDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
