import React from 'react';
import Image from 'next/image';

// TODO: Remove this component, Use circle icon image directly
const RocCircularImage = (props: {
  sideLength: string | number;
  bgColour?: string;
  imgSrc: any;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
}) => {
  const { sideLength, bgColour, imgSrc, imgAlt, imgWidth, imgHeight } = props;
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(
      '--circular-img-side-length',
      typeof sideLength === 'string' ? sideLength : sideLength + 'px',
    );
    document.documentElement.style.setProperty(
      '--circular-img-background-color',
      bgColour ?? 'transparent',
    );
  }
  const isImgStatic = imgWidth === undefined && imgHeight === undefined;
  return (
    <div className="roc-circular-img rounded-full flex justify-center items-center">
      {isImgStatic ? (
        <Image src={imgSrc} alt={imgAlt || ''} />
      ) : (
        <Image
          src={imgSrc}
          alt={imgAlt || ''}
          width={imgWidth}
          height={imgHeight}
        />
      )}
    </div>
  );
};
export default RocCircularImage;
