import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const RocEmailInput = (props: {
  className: string;
  required: boolean;
  value: string;
  onChange: any;
  onBlur: any;
  name: string;
  error: boolean;
  read_only?: boolean;
}) => {
  const {
    className,
    required = false,
    value,
    onChange,
    onBlur,
    name,
    error,
    read_only = false,
  } = props;

  const { t } = useTranslation();
  return (
    <>
      <div className="relative w-full flex flex-col group">
        <input
          type={'email'}
          name={name}
          className={`${className} ${error && 'border-red-500'}`}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={read_only}
        />
        <Image
          src="/icons/email-icon.svg"
          alt="Email icon"
          width={24}
          height={24}
          className="absolute top-3 left-4 pointer-events-none"
        />
        {!read_only && (
          <label
            className={`font-normal text-base leading-6 text-gray-600 absolute top-3 left-12 pointer-events-none origin-top-left transition-all duration-200 group-focus-within:shrunk-label ${
              value ? 'shrunk-label' : ''
            } ${error && 'text-red-500'}`}
          >
            {t('login.email_id')}
          </label>
        )}
      </div>
    </>
  );
};
export default RocEmailInput;
