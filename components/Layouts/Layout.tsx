import React, { ReactElement } from 'react';
import Image from 'next/image';
import Language from '../users/language';

const notoSansFont = 'noto-sans';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <header className="p-6 flex flex-row items-center justify-between gap-3">
        <div className="flex items-center justify-between gap-3">
          <Image
            src={'/images/roche-logo.svg'}
            alt="Roche logo"
            width={77.5}
            height={40.22}
          />
          <div
            className={`${notoSansFont} font-medium text-xl leading-[27px] text-gray-600`}
          >
            RDKK EP Evaluator
          </div>
        </div>
        <div>
          <Language />
        </div>
      </header>
      <main className={notoSansFont}>{children}</main>
    </>
  );
}
