import Image from 'next/image';
import { useEffect, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const RocPasswordInput = (props: {
  className: string;
  required: boolean;
  value: string;
  onChange: any;
  onBlur: any;
  name: string;
  error: boolean;
  read_only?: boolean;
  label?: string;
  onInput?: any;
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
    label = 'Access Key', //Password
    onInput,
  } = props;
  const [isShowingPassword, setIsShowingPassword] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowingPassword(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="relative w-full flex flex-col group">
        {onInput === undefined ? (
          <input
            type={isShowingPassword ? 'text' : 'password'}
            name={name}
            className={`${className} ${error && 'border-red-500'}`}
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={read_only}
          />
        ) : (
          <input
            type={isShowingPassword ? 'text' : 'password'}
            name={name}
            className={`${className} ${error && 'border-red-500'}`}
            required={required}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onInput}
            readOnly={read_only}
          />
        )}
        <Image
          src="/icons/password-icon.svg"
          alt="Password icon"
          width={24}
          height={24}
          className="absolute top-3 left-4 pointer-events-none"
        />
        <label
          className={`font-normal text-base leading-6 text-gray-600 absolute top-3 left-12 pointer-events-none origin-top-left transition-all duration-200 group-focus-within:shrunk-label ${
            value ? 'shrunk-label' : ''
          } ${error && 'text-red-500'}`}
        >
          {/* {t('login.password')} */}
          {label}
        </label>
        <Image
          src="/icons/show-password-icon.svg"
          alt="Show password icon"
          width={24}
          height={24}
          className={`absolute top-3 right-3 cursor-pointer ${
            isShowingPassword ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() =>
            setIsShowingPassword((isShowingPassword) => !isShowingPassword)
          }
        />
      </div>
    </>
  );
};
export default RocPasswordInput;
