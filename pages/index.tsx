import React, { ReactElement, useEffect } from 'react';
import useRequestUtilities from '../components/hooks/use-request-utilities';
import UserLayout from '../components/layouts/user-layout';
import PageHeaderSkeleton from '../components/loading/page-header-skeleton';
import UserTableSkeleton from '../components/loading/user-table-skeleton';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';

const HomePage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { logoutUser } = useRequestUtilities(router);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      logoutUser();
    } else {
      router.push('/reports');
    }
  }, []);

  return (
    <>
      <PageHeaderSkeleton />
      <UserTableSkeleton />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  return <UserLayout router={router}>{page}</UserLayout>;
};

export default HomePage;
