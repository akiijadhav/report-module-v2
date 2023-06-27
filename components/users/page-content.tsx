import React, { ReactElement } from 'react';
export default function PageContent({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return <>{children}</>;
}
