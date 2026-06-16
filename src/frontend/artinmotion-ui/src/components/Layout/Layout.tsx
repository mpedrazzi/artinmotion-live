import { Link, Outlet } from 'react-router-dom';
import './Layout.scss';

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/" className="layout__brand">ArtInMotion.Live</Link>
        <nav className="layout__nav">
          <Link to="/">Home</Link>
          <Link to="/studio">Studio</Link>
          <Link to="/viewer">Viewer</Link>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
