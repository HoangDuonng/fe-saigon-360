'use client';

import Image from 'next/image';
import Link from 'next/link';
import Images from '../shared';
import { useLocale } from 'next-intl';

const places = [
  { 
    name: '30/4 Park', 
    x: 32, y: 58,  
    image: '/assets/images/connguoi.png',
    url: '/30-4-park'
  },
  { 
    name: 'Saigon Notre Dame Cathedral', 
    x: 40, y: 45, 
    image: '/assets/images/saigon-notre-dame-cathedral/saigon-notre-dame-cathedral1.png',
    url: '/saigon-notre-dame-cathedral'
  },
  { 
    name: 'Ho Chi Minh Book Street', 
    x: 48, y: 47,  
    image: '/assets/images/book-street/duongsach1.png',
    url: '/book-street'
  },
  { 
    name: 'Saigon Central Post Office', 
    x: 55, y: 43,  
    image: '/assets/images/buudienthanhpho.png',
    url: '/saigon-central-post-office'
  },
  { 
    name: 'Nguyen Hue Walk Street', 
    x: 75, y: 75,  
    image: '/assets/images/pho-di-bo.jpg',
    url: '/nguyen-hue-walk-street'
  },
];

export default function Distric1() {
  const locale = useLocale();
  
  return (
    <div className="relative w-full h-[100vh]">
      {/* Hình nền bản đồ */}
      <Image src={Images.map_custom} alt="Custom Map" fill className="object-cover" />

      {/* Các điểm đánh dấu */}
      {places.map((place, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center text-center"
          style={{
            top: `${place.y}%`,
            left: `${place.x}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Link href={`/${locale}/panoramas${place.url}`} className="relative">
            <div className="relative">
              <div className="absolute inset-0 w-full h-full rounded-full opacity-50 animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg animate-wiggle">
                <Image src={place.image} alt={place.name} width={112} height={112} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </Link>
          <div className="mt-2 px-4 py-2 text-yellow text-sm font-semibold rounded opacity-80 hover:cursor-pointer">
            {place.name}
          </div>
        </div>
      ))}

      {/* Nút "Xem tất cả" */}
      <Link 
        href={`/${locale}/panoramas/toancanh`}
        className="absolute bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Xem tất cả
      </Link>
    </div>
  );
}
