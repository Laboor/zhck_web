import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import defaultRouter from './config/router';



function App() {
  const [routerCfg, setRouterCfg] = useState(defaultRouter);
  const router = createBrowserRouter(routerCfg);

  useEffect(() => {
    setRouterCfg(routerCfg);
  }, [routerCfg]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
