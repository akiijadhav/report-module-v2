import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import UserLayout from '../../components/layouts/user-layout';
import Link from 'next/link';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';

const ReportPageComponent = () => {
  const [countries, setCountries] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => res.data.slice(0, 10))
      .then((data) => setCountries(data))
      .catch((error) => console.error(error));
  }, []);

  type Country = {
    unMember: boolean;
    region: string;
    name: {
      common: string;
    };
  };

  const columnHelper = createColumnHelper<Country>();
  const defaultData: Country[] = [...countries];

  const columns = [
    columnHelper.accessor('name.common', { header: t('table.country_name') }),
    columnHelper.accessor('unMember', { header: 'UN Member' }),
    columnHelper.accessor('region', { header: 'Region' }), // Specify the header for the column and access the name using dot notation
  ];

  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <p className="my-8">This is the {t('home.reports')} page!</p>
      <p>
        Go to &nbsp;
        <Link
          className="bg-emerald-300
          button
          hover:bg-emerald-500 w-24 h-[20px] px-4 py-0"
          href={'/'}
        >
          Home
        </Link>
      </p>
      <div className="bg-blue-300 w-[100px] h-100 p-4 my-8">
        <Button text={'Click Me'} />
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReportPageComponent.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  return <UserLayout router={router}>{page}</UserLayout>;
};

export const ReportPage = () => (
  <I18nextProvider i18n={i18n}>
    <ReportPageComponent />
  </I18nextProvider>
);

export default ReportPage;
