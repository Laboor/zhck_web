import { useState, useEffect, useTransition, memo, useCallback } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAsyncRoute } from '../../store/modules/asyncRoute';
import Home from '../Home';

function Layout() {
  console.log('父组件刷新了');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const fun = useCallback(() => console.log('传入子组件的函数'), []);


  return (
    <div style={{ background: 'green', height: '800px' }}>
      <button
        onClick={() => {
          dispatch(
            setAsyncRoute([
              {
                path: '/about',
                element: './pages/About',
              },
            ])
          );
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          // navigate('/about');
          setFlag(!flag);
        }}
      >
        decrement
      </button>
      <Child flag={fun} />
    </div>
  );
}

const Child = memo((prop) => <Home flag={prop.flag}/>);

export default Layout;
