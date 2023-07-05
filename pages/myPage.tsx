import React, { useEffect } from 'react';
import UserLayout from '../components/layouts/user-layout';
import PageContainer from '../components/users/page-container';
import { NextRouter } from 'next/router';
import { NextPageWithLayout } from './_app';

interface MyPageProps {
  router: NextRouter;
  app: string;
}

const MyPage: NextPageWithLayout<MyPageProps> = ({ router, app }) => {
  console.log(`router is coming from app: ${app}, ${router}`);

  return (
    <div>
      <h1>My Page</h1>
      <p>This is a standalone page with its own router instance.</p>
    </div>
  );
};

MyPage.getLayout = function getLayout(page) {
  return (
    <UserLayout>
      <PageContainer>{page}</PageContainer>
    </UserLayout>
  );
};

export default MyPage;
