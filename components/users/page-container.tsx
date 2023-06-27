import React, { ReactElement } from 'react';
import PageContent from './page-content';

export default function PageContainer({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div>
      <PageContent>{children}</PageContent>
    </div>
  );
}
