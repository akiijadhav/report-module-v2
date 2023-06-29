import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TestPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [delayRouter, setDelayRouter] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout;
    if (router.isReady) {
      timer = setTimeout(() => {
        setDelayRouter(true);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [router.isReady]);

  useEffect(() => {
    if (!delayRouter || !isMounted) return;

    console.log({ isReady: router.isReady });
  }, [delayRouter, isMounted]);

  return (
    <div>
      <h1>Test Page</h1>
      {delayRouter && isMounted && (
        <p>Router is ready: {router.isReady.toString()}</p>
      )}
    </div>
  );
};

export default TestPage;
