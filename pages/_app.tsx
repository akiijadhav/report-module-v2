import '../styles/globals.css';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  
  useEffect(() => {
    i18n.changeLanguage(router.locale);
  }, [router.locale]);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>,
  );
}
