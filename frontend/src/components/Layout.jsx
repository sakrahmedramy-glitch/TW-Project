import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// NavLink transmite isActive, adevărat pentru pagina curentă.
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <>
      <header className={styles.header}>
        <button
          className={styles.themeToggle}
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Gestiunea facturilor</p>
          <h1 className={styles.logo}>Smart Invoice Payer</h1>
          <p className={styles.description}>
            Urmărește facturile și vezi rapid ce plăți sunt încă de făcut.
          </p>
          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              Facturi
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              Despre
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>Proiect Tehnologii Web</footer>
    </>
  );
}
