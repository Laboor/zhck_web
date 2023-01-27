import { useState, useEffect } from 'react';
import { Outlet, useLoaderData,useNavigate } from 'react-router-dom';



function Layout() {
  let navigate = useNavigate();
  let data = useLoaderData();
  let [flag, setFlag] = useState(99);
  console.log('flag', flag);
  useEffect(() => {
    console.log(flag);
    let timer = setTimeout(() => {
      console.log('执行', flag);
      setFlag(1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [flag]);
  
  return (
    <div style={{background: 'green', height: '800px'}}>
      <button onClick={() => {
        // setFlag('456');
      }}>btn</button>
      <Outlet />
    </div>
  )
}

export default Layout;