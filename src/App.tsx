import { useState, useEffect } from 'react';
import { ThemeStudio } from './components/ThemeStudio';
import { Home } from './components/Home';
import './App.css';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

function App() {
  const hash = useHashRoute();

  // Studio 路由
  if (hash === '#/studio') {
    return <ThemeStudio />;
  }

  // 首页
  return <Home />;
}

export default App;
