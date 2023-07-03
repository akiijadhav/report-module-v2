import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import useRequestUtilities from '../../components/hooks/use-request-utilities';
import UserLayout from '../../components/layouts/user-layout';
import { NextPageWithLayout } from '../_app';
import ReportTableSkeleton from '../../components/loading/report-table-skeleton';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/users/page-container';
import { NewReportDetail } from '../../components/new-reports/models/new-report-detail';
import NewReportTable from '../../components/new-reports/new-report-table';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { useSearchParams } from 'next/navigation';

const ReportPageComponent: NextPageWithLayout = function () {
  const {
    fetchWrapper,
    logoutUser,
    nextJsRouter: router,
  } = useRequestUtilities();
  const search = useSearchParams();

  const refetchReports = search.getAll('refetch')[0];

  type viewScreenType =
    | 'loading'
    | 'reportsAbsent'
    | 'reportsPresent'
    | 'responseError';
  const [viewScreen, setViewScreen] = useState<viewScreenType>('loading');
  const [responseErrorMsg, setResponseErrorMsg] = useState('');
  const [data, setData] = useState<NewReportDetail[]>([]);
  const { t } = useTranslation();

  const fetchReports = useCallback(async function (Refetch = false) {
    async function handleResponse(response: Response) {
      const resJson = await response.json();
      if (response.ok) {
        const newReports: NewReportDetail[] = resJson?.reports;
        if (newReports.length) {
          if (Refetch) {
            setData(newReports);
          } else {
            setData((old) => {
              const uniqueNewReports: NewReportDetail[] = [];
              newReports.forEach((newReport) => {
                if (
                  old.find((report) => report.id === newReport.id) === undefined
                ) {
                  uniqueNewReports.push(newReport);
                }
              });
              return [...old, ...uniqueNewReports];
            });
          }
          setViewScreen('reportsPresent');
        } else if (data.length < 1 && newReports.length < 1) {
          setViewScreen('reportsAbsent');
        }
      } else {
        if (response.status === 500) {
          setResponseErrorMsg(t('error.something_went_wrong'));
        } else {
          const errorMsg =
            typeof resJson?.message === 'string'
              ? resJson.message
              : resJson?.message?.at(0);
          setResponseErrorMsg(
            `Error ${response.status}: ${errorMsg || response.statusText}`,
          );
        }
        setViewScreen('responseError');
      }
    }
    function handleError(error: any) {
      setResponseErrorMsg(t('error.something_went_wrong'));
      setViewScreen('responseError');
    }

    fetchWrapper({
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}/reports`,
      includeAuthToken: true,
      handleResponse,
      handleError,
    });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      logoutUser();
      return;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.role !== 'LabEngineer') {
        router.replace('/users');
        return;
      }
      fetchReports(Boolean(refetchReports));
    }
  }, [refetchReports]);

  if (viewScreen === 'loading') {
    return (
      <>
        <div className="py-4 px-6 flex items-center justify-between border-b border-gray-300 font-semibold text-xl text-gray-800">
          <div className="bg-gray-300 rounded-full w-20 h-5 animate-pulse" />
        </div>
        <ReportTableSkeleton />
      </>
    );
  }
  if (viewScreen === 'reportsAbsent') {
    return (
      <>
        <div className="py-4 px-6 flex items-center justify-between border-b border-gray-300 font-semibold text-xl text-gray-800">
          {t('reports.report_list_page_title')}
        </div>
        <div className="text-center w-full mx-auto pt-16">
          <h1 className="font-medium text-2xl leading-6 text-gray-800 mb-4">
            Looks like you haven&apos;t generated any reports yet
          </h1>
        </div>
      </>
    );
  }
  if (viewScreen === 'responseError') {
    return (
      <>
        <div className="py-4 px-6 flex items-center justify-between border-b border-gray-300 font-semibold text-xl text-gray-800">
          {t('reports.report_list_page_title')}
        </div>
        <div className="text-center w-[512px] mx-auto pt-16">
          <h1 className="font-medium text-2xl leading-6 text-gray-800 mb-4">
            {responseErrorMsg}
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="py-4 px-6 flex items-center justify-between border-b border-gray-300 font-semibold text-xl text-gray-800">
        {t('reports.report_list_page_title')}
      </div>
      <NewReportTable data={data} />
    </>
  );
};

ReportPageComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <PageContainer>{page}</PageContainer>
    </UserLayout>
  );
};

export const ReportPage = () => (
  <I18nextProvider i18n={i18n}>
    <ReportPageComponent />
  </I18nextProvider>
);

export default ReportPage;
