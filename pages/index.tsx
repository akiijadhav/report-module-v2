import React, { ReactElement, useEffect } from 'react';
import Link from 'next/link';
import UserLayout from '../components/layouts/user-layout';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
const HomePage = () => {
  const router = useRouter()
  const { t } = useTranslation();
  useEffect(() => {
    router.push('/login')
  }, [])
  
  return (
    <div>
      <p>Hello Next.js This is a Home page!</p>
      <p className="my-8">
        Go to &nbsp;
        <Link
          className="bg-emerald-300
          button
      hover:bg-emerald-500 w-24 h-[20px] px-4 py-0"
          href={'/reports'}
        >
          {t('home.reports')}
        </Link>
      </p>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default HomePage;
