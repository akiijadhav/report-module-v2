import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import i18n from '../../i18n';

const useLocale = () => {
  const router = useRouter();
  
  useEffect(() => {
    if (router.isReady) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.isReady, router.locale]);
}

export default useLocale;