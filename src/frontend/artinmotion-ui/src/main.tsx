import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Studio } from './pages/Studio';
import { Viewer } from './pages/Viewer';
import './styles/globals.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="viewer" element={<Viewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
