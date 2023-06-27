import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import Layout from '../../components/Layouts/Layout';
import PageContainer from '../../components/Layouts/page-container';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';

const ReportPage = () => {
  const [countries, setCountries] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => res.data.slice(0, 10))
      .then((data) => setCountries(data))
      .catch((error) => console.error(error));

    router.locale = 'ja';
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
    columnHelper.accessor('name.common', { header: t('country_name') }),
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
      <p className="my-8">This is the reports page!</p>
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

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PageContainer>{page}</PageContainer>
    </Layout>
  );
};

export default ReportPage;
