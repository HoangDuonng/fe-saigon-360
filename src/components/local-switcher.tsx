'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Images from './shared';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';

export default function LocalSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = lang;
    router.replace(`/${segments.join('/')}`);
    setIsOpen(false);
  };

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: Images.vietnam },
    { code: 'en', name: 'English', flag: Images.england },
  ];

  return (
    <div className='relative'>
      <div
        className='flex items-center space-x-2 cursor-pointer font-bold'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{locale === 'vi' ? 'Tiếng Việt' : 'English'}</span>
        <Image
          src={locale === 'vi' ? Images.vietnam : Images.england}
          width={20}
          height={20}
          alt='flag'
          className='object-cover'
        />
        <IoIosArrowDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className='absolute top-full mt-2 w-40 bg-white shadow-md rounded-lg border z-50'>
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center p-2 hover:bg-blue-100 cursor-pointer space-x-2 ${
                locale === lang.code ? 'bg-blue-50' : ''
              }`}
            >
              <span>{lang.name}</span>
              <Image
                src={lang.flag}
                width={20}
                height={20}
                alt={lang.name}
                className='object-cover mr-2'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
