import React, { useCallback, useState } from 'react';
import { NewReportDetail } from './models/new-report-detail';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import RocTooltip from '../ui/tooltip';
import Image from 'next/image';
import viewReportIcon from '../../public/icons/view-report.svg';
import downloadReportIcon from '../../public/icons/download-report.svg';
import deleteReportIcon from '../../public/icons/delete-report.svg';
import useRequestUtilities from '../hooks/use-request-utilities';
import { responseMsgType } from '../ui/notification';
import NewDeleteReportModal from './new-delete-report-modal';
import NewPreviewReportModal from './new-preview-report-modal';
import Notification from '../ui/notification';
import { useTranslation } from 'react-i18next';
import { NextRouter } from 'next/router';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function NewReportTable({
  data,
  router,
}: {
  data: NewReportDetail[];
  router: NextRouter;
}) {
  const { fetchWrapper } = useRequestUtilities(router);
  const [showDeleteReportModal, setShowDeleteReportModal] = useState(false);
  const [selectedReportData, setSelectedReportData] =
    useState<NewReportDetail>();
  const [reportUpdateMsg, setReportUpdateMsg] = useState<responseMsgType>({});
  const [isGettingReport, setIsGettingReport] = useState(false);
  const [showPreviewReportModal, setShowPreviewReportModal] = useState({
    show: false,
    fileUrl: '',
  });
  const { t } = useTranslation();

  const downloadThroughBlob = useCallback(function (
    fileUrl: RequestInfo | URL,
    report: NewReportDetail,
  ) {
    function initiate() {
      setIsGettingReport(true);
      setReportUpdateMsg({
        isError: false,
        isProcessing: true,
        entityName: report.name,
        msg: t('error.downloading_report'),
      });
    }
    async function handleResponse(response: Response) {
      if (response.ok) {
        const resBlob = await response.blob();
        const blobUrl = window.URL.createObjectURL(new Blob([resBlob]));
        const downloadButton = document.createElement('a');
        downloadButton.href = blobUrl;
        downloadButton.download = report.name.replaceAll(' ', '_') + '.pdf';
        downloadButton.click();
        setReportUpdateMsg({
          entityName: '',
          isError: false,
          isProcessing: false,
          msg: '',
        });
      } else {
        setReportUpdateMsg({
          entityName: report.name,
          isError: true,
          isProcessing: false,
          msg: ` Error ${response.status} ${response.statusText}`,
        });
      }
    }
    function handleError(_error: any) {
      setReportUpdateMsg({
        isError: true,
        entityName: report.name,
        isProcessing: false,
        msg: t('error.something_went_wrong'),
      });
    }
    function handleFinally() {
      setIsGettingReport(false);
    }

    fetchWrapper({
      url: fileUrl,
      includeAuthToken: false,
      initiate,
      handleResponse,
      handleError,
      handleFinally,
    });
  },
  []);

  const getReportFile = useCallback(function (
    report: NewReportDetail,
    shouldDownload = false,
  ) {
    function initiate() {
      setIsGettingReport(true);
      if (shouldDownload) {
        setReportUpdateMsg({
          isError: false,
          isProcessing: true,
          entityName: report.name,
          msg: t('error.downloading_report'),
        });
      }
    }
    async function handleResponse(response: Response) {
      const resJson = await response.json();
      if (response.ok) {
        const fileUrl = resJson.url;

        if (shouldDownload) {
          downloadThroughBlob(fileUrl, report);
        } else {
          setShowPreviewReportModal({
            show: true,
            fileUrl,
          });
        }
      } else {
        setReportUpdateMsg({
          entityName: report.name,
          isError: true,
          isProcessing: false,
          msg: resJson?.message
            ? ` ${resJson.message}`
            : ` Error ${response.status} ${response.statusText}`,
        });
      }
    }
    function handleError(_error: any) {
      setReportUpdateMsg({
        isError: true,
        entityName: report.name,
        isProcessing: false,
        msg: t('error.something_went_wrong'),
      });
    }
    function handleFinally() {
      setIsGettingReport(false);
    }

    fetchWrapper({
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}/reports/${report.id}/download-url`,
      includeAuthToken: true,
      initiate,
      handleResponse,
      handleError,
      handleFinally,
    });
  },
  []);

  const columnHelper = createColumnHelper<NewReportDetail>();
  const columns: ColumnDef<NewReportDetail, string>[] = [
    columnHelper.accessor('name', {
      header: `${t('reports.report_name')} (${data.length})`,
      cell(props) {
        return (
          <div className="table-cell-report-name">
            <p>{props.renderValue()}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor('dataSource.name', {
      header: t(`reports.data_Source`),
      cell(props) {
        return (
          <div className="table-cell-default">
            <p className="text-gray-800">{props.renderValue()}</p>
          </div>
        );
      },
    }),
    {
      id: 'Customer',
      header: t(`reports.customer`),
      cell(props) {
        const dataRow = props.row.original;
        return (
          <div className="table-cell-default">
            <p className="text-gray-800">
              {dataRow?.dataSource?.hospitalName || '-'}
            </p>
            <p>{dataRow?.dataSource?.labName || '-'}</p>
          </div>
        );
      },
    },
    columnHelper.accessor('updatedAt', {
      header: t(`reports.date_time`),
      cell(props) {
        const dateTime = new Date(props.getValue());
        const reportDate = `${dateTime.getDate()} ${
          monthNames[dateTime.getMonth()]
        } ${dateTime.getFullYear()}`;
        return (
          <div className="table-cell-default">
            <p className="text-gray-800">{reportDate || '-'}</p>
            <p>{dateTime.toLocaleTimeString() || '-'}</p>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'Actions',
      cell(props) {
        const disableDownload =
          selectedReportData?.id === props.row.original.id && isGettingReport;
        return (
          <div className="table-cell-actions">
            <div
              className="actions-icon-wrapper group"
              onClick={() => {
                setSelectedReportData(props.row.original);
                getReportFile(props.row.original);
              }}
            >
              <Image
                src={viewReportIcon}
                width={24}
                height={24}
                alt="View Report"
                className={`w-6 h-6`}
              />
              <RocTooltip bottom="100%">{t(`reports.view_report`)}</RocTooltip>
            </div>
            <div
              className={`actions-icon-wrapper group ${
                disableDownload ? 'disabled-action-btn' : ''
              }`}
              onClick={() => {
                if (disableDownload) return;
                setSelectedReportData(props.row.original);
                getReportFile(props.row.original, true);
              }}
            >
              <Image
                src={downloadReportIcon}
                width={24}
                height={24}
                alt="Download Report"
                className={`w-6 h-6`}
              />
              <RocTooltip bottom="100%">
                {t(`reports.download_report`)}
              </RocTooltip>
            </div>
            <div
              className="actions-icon-wrapper group"
              onClick={() => {
                setSelectedReportData(props.row.original);
                setShowDeleteReportModal(true);
              }}
            >
              <Image
                src={deleteReportIcon}
                width={24}
                height={24}
                alt="Delete Report"
                className={`w-6 h-6`}
              />
              <RocTooltip bottom="100%">
                {t(`reports.delete_report`)}
              </RocTooltip>
            </div>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="custom-table">
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
      {showDeleteReportModal && (
        <NewDeleteReportModal
          show={showDeleteReportModal}
          setShow={setShowDeleteReportModal}
          reportData={selectedReportData}
          router={router}
        />
      )}
      {reportUpdateMsg?.msg ? (
        <Notification
          entityUpdateMsg={reportUpdateMsg}
          setEntityUpdateMsg={setReportUpdateMsg}
        />
      ) : null}
      {showPreviewReportModal.show && (
        <NewPreviewReportModal
          reportData={selectedReportData}
          showPreviewReportModal={showPreviewReportModal}
          setShowPreviewReportModal={setShowPreviewReportModal}
        />
      )}
    </>
  );
}
