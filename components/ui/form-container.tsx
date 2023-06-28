import React from 'react';

const RocFormContainer = ({ children }) => {
  return (
    <div className="flex flex-col items-start gap-6 p-8 w-full max-w-[610px] mx-auto rounded-2xl bg-white shadow-lg">
      {children}
    </div>
  );
};
export default RocFormContainer;
