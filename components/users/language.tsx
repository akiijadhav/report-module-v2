import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import translateIcon from '../../public/icons/translate.png';
import dropdownArrow from '../../public/icons/arrow-drop-down-fill.svg';
import dropDownArrowBlack from '../../public/icons/dropDown_black.png';

export default function Language() {
  const router = useRouter();
  const [showLanguageChoices, setShowLanguageChoices] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  const languageChoices = [
    {
      displayText: 'English',
      value: 'en',
      onClick: () => {
        router.push(router.route, router.asPath, {
          locale: 'en',
        });
        localStorage.setItem('language', 'en');
        setShowLanguageChoices((showLanguageChoices) => !showLanguageChoices);
      },
    },
    {
      displayText: 'Japanese',
      value: 'ja',
      onClick: () => {
        router.push(router.route, router.asPath, {
          locale: 'ja',
        });
        localStorage.setItem('language', 'ja');
        setShowLanguageChoices((showLanguageChoices) => !showLanguageChoices);
      },
    },
  ];
  return (
    <>
      <div className="relative">
        <div
          className="flex items-center gap-1"
          onClick={() => {
            setShowLanguageChoices(
              (showLanguageChoices) => !showLanguageChoices,
            );
          }}
        >
          <Image src={translateIcon} alt="" height={15} width={15} />
          <div
            className={`font-medium text-base leading-[22px] ${
              !isLogin ? 'text-white-600' : ''
            }`}
          >
            {t(`header.${router.locale}`)}
          </div>
          {isLogin ? (
            <Image
              src={dropdownArrow}
              className={`transition-all duration-200 ${
                showLanguageChoices && '-rotate-180'
              }`}
              alt="Dropdown arrow"
            />
          ) : (
            <Image
              src={dropDownArrowBlack}
              className={`transition-all duration-200 ${
                showLanguageChoices && '-rotate-180'
              }`}
              height={10}
              width={10}
              alt="Dropdown arrow"
            />
          )}
        </div>
        {showLanguageChoices && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full z-10 cursor-default"
              id="overlay"
              onClick={(e) => {
                e.stopPropagation();
                setShowLanguageChoices(false);
              }}
            />
            <div className="w-full absolute top-[calc(100%_+_0.5rem)] z-20 flex flex-col items-start py-2 bg-white rounded shadow-md font-normal text-sm leading-[19px] text-gray-600 cursor-default">
              {languageChoices?.map((item) => (
                <div
                  key={item.displayText}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {item.displayText}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
