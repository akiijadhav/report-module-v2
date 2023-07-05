import { Dialog } from '@headlessui/react';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import crossIcon from '../../public/icons/cross-icon.svg';
import { NewReportDetail } from './models/new-report-detail';
import useRequestUtilities from '../hooks/use-request-utilities';
import { ReportDetail } from './models/report-details';
import { useRouterContext } from '../routerContext/routerContext';

const notoSansFont = 'noto-sans';

export default function NewDeleteReportModal(props: {
  reportData: NewReportDetail | ReportDetail;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  incomplete?: boolean;
}) {
  const router = useRouterContext();
  const { reportData, show, setShow, incomplete = false } = props;
  const { fetchWrapper } = useRequestUtilities(router);
  const [isDeletingReport, setIsDeletingReport] = useState(false);
  const [responseError, setResponseError] = useState('');

  console.log(router, 'router inside delete component');

  const deleteReport = useCallback(
    function () {
      function initiate() {
        setIsDeletingReport(true);
      }
      async function handleResponse(response: Response) {
        if (response.ok) {
          const randomRefetchToggle = String(Math.random()).slice(0, 5);
          router.replace(`/reports?refetch=${randomRefetchToggle}`, '/reports');
          if (!incomplete) {
            setShow(false);
          }
        } else {
          const resJson = await response.json();
          setResponseError(
            resJson.message ||
              `Error ${response.status}: ${response.statusText}`,
          );
          setIsDeletingReport(false);
        }
      }
      function handleError(error: any) {
        const defaultError = `Failed to ${
          incomplete ? 'discard' : 'delete'
        } report`;
        setResponseError(String(error || defaultError));
        setIsDeletingReport(false);
      }

      fetchWrapper({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}/reports/${reportData.id}`,
        method: 'DELETE',
        includeAuthToken: true,
        initiate,
        handleResponse,
        handleError,
      });
    },
    [
      setIsDeletingReport,
      setShow,
      router.replace,
      setResponseError,
      incomplete,
      fetchWrapper,
      reportData?.id,
    ],
  );

  const headerText = useMemo(
    () => (incomplete ? 'Discard Report' : 'Delete Report'),
    [incomplete],
  );

  const ContentText = useCallback(() => {
    return incomplete ? (
      <>
        Are you sure you want to discard{' '}
        <span className="font-semibold">{reportData.name}</span>?
      </>
    ) : (
      <>
        Are you sure you want to delete{' '}
        <span className="font-semibold">{reportData.name}</span>. You won&apos;t
        be able to restore it?
      </>
    );
  }, [incomplete, reportData?.name]);

  const buttonText = useMemo(() => {
    const text = incomplete
      ? isDeletingReport
        ? 'Discarding'
        : 'Discard'
      : isDeletingReport
      ? 'Deleting'
      : 'Delete';
    return text;
  }, [incomplete, isDeletingReport]);

  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-gray-600/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`${notoSansFont} mx-auto w-[100%] ${
            incomplete ? 'max-w-xl' : 'max-w-3xl'
          } bg-white rounded-lg shadow-md`}
        >
          <div className="custom-modal-header">
            <Dialog.Title>{headerText}</Dialog.Title>
            <div className="close-icon-wrapper" onClick={() => setShow(false)}>
              <Image src={crossIcon} alt="Close delete report modal" />
            </div>
          </div>
          <div className="custom-modal-content">
            <p className="max-w-full break-words">
              <ContentText />
            </p>
            {responseError && (
              <p className="response-error-content">{responseError}</p>
            )}
          </div>
          <div className="custom-modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteReport}
              disabled={isDeletingReport}
              className={`red-btn ${
                isDeletingReport ? 'disabled-red-btn' : ''
              }`}
            >
              {buttonText}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
