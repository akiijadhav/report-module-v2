import Image from 'next/image';
import successIcon from '../../public/icons/success-icon.svg';
import failureIcon from '../../public/icons/failure-icon.svg';
import loaderIcon from '../../public/icons/loader.svg';
import crossIcon from '../../public/icons/cross-icon.svg';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export type responseMsgType =
  | {
      isError: boolean;
      isProcessing?: boolean;
      msg: string;
      entityName: string;
    }
  | Record<string, never>;

export default function Notification(props: {
  entityUpdateMsg: responseMsgType;
  setEntityUpdateMsg: Dispatch<SetStateAction<responseMsgType>>;
}) {
  const { entityUpdateMsg, setEntityUpdateMsg } = props;
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (entityUpdateMsg.msg && !entityUpdateMsg.isProcessing) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      const notificationTimer = setTimeout(() => {
        setEntityUpdateMsg({
          entityName: '',
          isError: false,
          msg: '',
          isProcessing: false,
        });
        clearTimeout(notificationTimer);
      }, 4000);
      timerRef.current = notificationTimer;
    }
  }, [entityUpdateMsg]);

  return (
    <>
      <div className="z-10 fixed bottom-4 left-4 px-4 py-2 bg-white shadow-lg rounded flex items-center gap-3 text-center font-normal text-sm leading-7 text-gray-800">
        {entityUpdateMsg.isProcessing ? (
          <Image src={loaderIcon} alt="Processing" className="animate-spin" />
        ) : (
          <Image
            src={entityUpdateMsg.isError ? failureIcon : successIcon}
            alt={entityUpdateMsg.isError ? 'Failure icon' : 'Success icon'}
          />
        )}
        <p>
          <span className="font-semibold">{entityUpdateMsg.entityName}</span>
          {entityUpdateMsg.msg}
        </p>
        <Image
          src={crossIcon}
          alt="Close edit profile form"
          width={16}
          height={16}
          className="w-4 h-4 cursor-pointer rounded hover:bg-gray-100"
          onClick={() =>
            setEntityUpdateMsg({ isError: false, msg: '', entityName: '' })
          }
        />
      </div>
    </>
  );
}
