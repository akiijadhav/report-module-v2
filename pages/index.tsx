import React, { ReactElement } from 'react';
import Link from 'next/link';
import Layout from '../components/Layouts/Layout';
import PageContainer from '../components/Layouts/page-container';

const HomePage = () => {
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
          Reports
        </Link>
      </p>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PageContainer>{page}</PageContainer>
    </Layout>
  );
};

export default HomePage;
