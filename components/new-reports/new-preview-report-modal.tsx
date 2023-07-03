import { Dialog } from '@headlessui/react';
import React, { Dispatch, SetStateAction, useState, Fragment } from 'react';
import { NewReportDetail } from './models/new-report-detail';
import crossIcon from '../../public/icons/cross-icon.svg';
import Image from 'next/image';
import { NextRouter } from 'next/router';
// import { Document, Page } from 'react-pdf';
// import BubbleLoader from '../loading/bubble-loader';
// import DisplayPdfError from '../reports/common/display-pdf-error';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const notoSansFont = 'noto-sans';

export default function PreviewReportModal(props: {
  showPreviewReportModal: {
    show: boolean;
    fileUrl: string;
  };
  setShowPreviewReportModal: Dispatch<
    SetStateAction<{
      show: boolean;
      fileUrl: string;
    }>
  >;
  reportData: NewReportDetail;
  router: NextRouter
}) {
  const { showPreviewReportModal, setShowPreviewReportModal, reportData } =
    props;

  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Dialog
      open={showPreviewReportModal.show}
      onClose={() => setShowPreviewReportModal({ show: false, fileUrl: '' })}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-gray-600/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`${notoSansFont} min-w-[70vw] max-w-[85vw] bg-white rounded-lg shadow-md`}
        >
          <div className="custom-modal-header">
            <Dialog.Title>{reportData.name}</Dialog.Title>
            <div
              className="close-icon-wrapper"
              onClick={() =>
                setShowPreviewReportModal({ show: false, fileUrl: '' })
              }
            >
              <Image src={crossIcon} alt="Close view report modal" />
            </div>
          </div>
          <div className="custom-modal-content h-[80vh] overflow-y-auto">
            {showPreviewReportModal.fileUrl && (
              <iframe
                src={`/api/pdf?filePath=${encodeURIComponent(
                  showPreviewReportModal.fileUrl,
                )}`}
                title="PDF Viewer"
                style={{ width: '100%', height: '100%', border: 'none' }}
              ></iframe>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
