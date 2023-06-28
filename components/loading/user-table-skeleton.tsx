import React from "react";

export default function UserTableSkeleton({
  showHeader = true,
  numberOfRows = 6,
}) {
  const HeaderSkeleton = () => (
    <div className="bg-gray-100 py-3 px-4 flex justify-start">
      <div className="rounded-full w-[6rem] h-5 bg-gray-300 mr-[29.5%]" />
      <div className="rounded-full w-[6rem] h-5 bg-gray-300" />
    </div>
  );

  const RowSkeleton = () => (
    <div className="py-[18px] px-4 flex items-center justify-between border-b border-gray-300">
      <div className="flex gap-4 items-center pl-2 mr-[12%]">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="space-y-3">
          <div className="rounded-full w-[6rem] h-4 bg-gray-200" />
          <div className="rounded-full w-[14rem] h-4 bg-gray-200" />
        </div>
      </div>
      <div className="space-y-3 mr-[20%]">
        <div className="rounded-full w-[14rem] h-4 bg-gray-200" />
        <div className="rounded-full w-[10rem] h-4 bg-gray-200" />
      </div>
      <div className="rounded-full w-6 h-6 bg-gray-200 mr-[14%]" />
      <div className="rounded-full w-[3rem] h-6 bg-gray-200" />
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
}
