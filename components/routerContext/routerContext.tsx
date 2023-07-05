import React, { createContext, useContext } from 'react';
import { NextRouter } from 'next/router';

export const RouterContext = createContext<NextRouter | null>(null);
interface RouterProviderProps {
  children: React.ReactNode;
  router: NextRouter;
}

export const RouterProvider = ({ children, router }: RouterProviderProps) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export const useRouterContext = () => useContext(RouterContext);
