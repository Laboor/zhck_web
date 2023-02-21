import styles from './App.module.less';
import React, { Suspense, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { message } from 'antd';
import defaultRoute from './config/defaultRoute';
import { convertToMenu } from '@/utils';
import ErrorBoundary from '@/components/ErrorBoundary';

const { app } = styles;

export const MenuContext = React.createContext(
  convertToMenu(getRootRouteChildren(defaultRoute))
);
export const GlobalMessageContext = React.createContext();

function getRootRouteChildren(routes) {
  return routes.find((item) => item.isRoot).children;
}

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  let authRoute = useSelector((state) => state.userInfo.authRoute);

  // 初次先加载localStorage中的路由
  if (!authRoute.length) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.authRoute.length) {
      authRoute = userInfo.authRoute;
    }
  }
  const routerCfg = defaultRoute.appendRoute(authRoute);
  const router = createBrowserRouter(routerCfg);
  const menu = convertToMenu(getRootRouteChildren(routerCfg));

  return (
    <div className={app}>
      {contextHolder}
      <ErrorBoundary>
        <GlobalMessageContext.Provider value={messageApi}>
          <Suspense fallback={<div>Loading...</div>}>
            <MenuContext.Provider value={menu}>
              <RouterProvider router={router} />
            </MenuContext.Provider>
          </Suspense>
        </GlobalMessageContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
