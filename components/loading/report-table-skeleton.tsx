import React from 'react';

const ReportTableSkeleton = ({ showHeader = true, numberOfRows = 6 }) => {
  const HeaderSkeleton = () => (
    <div className="bg-gray-100 py-3 px-4 flex justify-start">
      <div className="rounded-full w-[6rem] h-5 bg-gray-300 mr-40" />
      <div className="rounded-full w-[6rem] h-5 bg-gray-300 mr-[27rem]" />
      <div className="rounded-full w-[6rem] h-5 bg-gray-300 mr-32" />
      <div className="rounded-full w-[6rem] h-5 bg-gray-300" />
    </div>
  );

  const RowSkeleton = () => (
    <div className="py-[18px] px-4 flex items-center justify-between border-b border-gray-300">
      <div className="flex gap-4 items-center pl-2">
        <div className="rounded-full w-[10rem] h-4 bg-gray-200" />
      </div>
      <div className="space-y-3 -ml-[2%]">
        <div className="rounded-full w-[14rem] h-4 bg-gray-200" />
        <div className="rounded-full w-[10rem] h-4 bg-gray-200" />
      </div>
      <div className="space-y-3 ml-[15%]">
        <div className="rounded-full w-[8rem] h-4 bg-gray-200" />
        <div className="rounded-full w-[4rem] h-4 bg-gray-200" />
      </div>
      <div className="rounded-full w-[5rem] h-6 bg-gray-200" />
      <div className="rounded-full w-[6rem] h-6 bg-gray-200" />
    </div>
  );

  return (
    <div className="animate-pulse">
      {showHeader && <HeaderSkeleton />}
      {Array(numberOfRows > 10 ? 10 : numberOfRows)
        .fill(null)
        .map((_, index) => (
          <RowSkeleton key={index} />
        ))}
    </div>
  );
};

export default ReportTableSkeleton;
