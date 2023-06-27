import Image from 'next/image';
import { ReactElement } from 'react';
import tooltipArrow from '../../public/icons/tooltip-arrow.svg';

export default function RocTooltip(props: {
  children: string | ReactElement | ReactElement[];
  width?: any;
  top?: any;
  bottom?: any;
  left?: any;
  right?: any;
  isLastElement?: boolean;
}) {
  const {
    children,
    width,
    top,
    bottom,
    left,
    right,
    isLastElement = false,
  } = props;
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(
      '--tooltip-width',
      width ?? 'max-content',
    );
    document.documentElement.style.setProperty('--tooltip-top', top ?? 'unset');
    document.documentElement.style.setProperty(
      '--tooltip-bottom',
      bottom ?? 'unset',
    );
    document.documentElement.style.setProperty(
      '--tooltip-left',
      left ?? 'unset',
    );
    document.documentElement.style.setProperty(
      '--tooltip-right',
      right ?? 'unset',
    );
  }
  // MAKE SURE TO ADD CLASSES 'relative' AND 'group' TO PARENT ELEMENT
  return (
    <>
      <div
        className={`invisible opacity-0 group-hover:visible
       group-hover:opacity-100  
      transition-all duration-[0ms]
       group-hover:duration-150 group-hover:delay-500
        flex flex-col items-center absolute custom-tooltip
        ${isLastElement ? 'lastTooltip' : 'tooltip-dimensions'}
        `}
      >
        <p className="bg-gray-800 rounded p-4 text-white text-sm">{children}</p>
        <Image
          src={tooltipArrow}
          alt=""
          className={`${isLastElement ? 'delete-custom-tooltip' : ''} `}
        />
      </div>
    </>
  );
}
