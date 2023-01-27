import Layout from '../pages/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';

const router = [
  {
    element: <Layout />,
    loader: () => {
      console.log('loader1');
      return '页面加载了';
    },
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: (
      <main style={{ padding: '1rem' }}>
        <p>There's nothing here!</p>
      </main>
    ),
  },
];

export default router;
