import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react';
import { NextRouter } from 'next/router';

export const RouterContext = createContext<NextRouter | null>(null);

export const RouterProvider = ({ children }) => {
  const router = useRouter();

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export const useRouterContext = () => useContext(RouterContext);
