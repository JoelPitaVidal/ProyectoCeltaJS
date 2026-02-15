import { Link, Outlet,useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
           Inicio
          </Link>
          
          <div className="nav-links">
            <Link to="./parte1" className={location.pathname === './parte1/parte1.jsx' ? 'active' : ''}>
              Parte 1 Partido del celta
            </Link>
            <Link to="./parte2" className={location.pathname === './parte2/parte2.jsx' ? 'active' : ''}>
              Parte 2 Formulario de registro
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

