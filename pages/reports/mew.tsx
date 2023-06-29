'use client';
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

const TestPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [delayRouter, setDelayRouter] = useState(false);

  useEffect(() => {
    console.log({ router }, 'only check this');

    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout;
    if (router) {
      timer = setTimeout(() => {
        setDelayRouter(true);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  useEffect(() => {
    if (!delayRouter || !isMounted) return;

    console.log({ isReady: router });
  }, [delayRouter, isMounted]);

  return (
    <div>
      <h1>Test Page</h1>
      {delayRouter && isMounted && <p>Router is ready: {router.toString()}</p>}
    </div>
  );
};

export default TestPage;
