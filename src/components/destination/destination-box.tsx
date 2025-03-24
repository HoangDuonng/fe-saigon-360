import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface Destination {
  nameEn: string;
  nameVi: string;
  image: string;
  link: string;
  trending?: boolean;
  new?: boolean;
  vr?: boolean;
}

const destinations: { new: Destination[] } = {
  new: [
    {
      nameEn: 'Explore Virtual Tour',
      nameVi: 'Khám phá tham quan ảo',
      image: '/assets/images/VR.png',
      link: '/vtour-travel',
      vr: true,
    },
    {
      nameEn: 'Metro Ben Thanh - Suoi Tien',
      nameVi: 'Tàu điện Metro Bến Thành - Suối Tiên',
      image: '/assets/images/metro-ben-thanh-suoi-tien-about1.png',
      link: '/panoramas/metro-ben-thanh-suoi-tien',
      new: true,
    },
    {
      nameEn: 'Nguyen Hue Walking Street',
      nameVi: 'Phố đi bộ Nguyễn Huệ',
      image: '/assets/images/pho-di-bo-nguyen-hue-about2.png',
      link: '/panoramas/nguyen-hue-walk-street',
      new: true,
    },
    {
      nameEn: 'Saigon Notre Dame Cathedral',
      nameVi: 'Nhà thờ Đức Bà',
      image: '/assets/images/nhathoducba.png',
      link: '/panoramas/saigon-notre-dame-cathedral',
      trending: true,
    },
    {
      nameEn: 'Ho Chi Minh Book Street',
      nameVi: 'Đường sách Hồ Chí Minh',
      image: '/assets/images/duongsach.png',
      link: '/panoramas/book-street',
      trending: true,
    },
    {
      nameEn: 'Ben Thanh Market',
      nameVi: 'Chợ Bến Thành',
      image: '/assets/images/chobenthanh.png',
      link: '/panoramas/ben-thanh-market',
      trending: true,
    }
  ],
};

interface DestinationCardProps {
  destination: Destination;
  locale: string;
}

const DestinationCard = ({ destination, locale }: DestinationCardProps) => (
  <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-500">
    <Link href={`/${locale}/${destination.link}`}>
      <Image
        src={destination.image}
        alt={destination.nameEn}
        width={400}
        height={300}
        className="w-full h-56 md:h-80 object-cover group-hover:brightness-75 transition duration-500"
      />

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
        <h3 className="text-white text-lg md:text-xl font-semibold">
          {locale === 'en' ? destination.nameEn : destination.nameVi}
        </h3>
      </div>

      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Image src="/assets/images/360.png" alt="360 icon" width={50} height={50} />
      </div>

      {destination.trending && (
        <div className="absolute top-4 left-4 bg-red text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          {locale === 'en' ? 'Trending' : 'Nổi bật'}
        </div>
      )}

      {destination.new && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          {locale === 'en' ? 'New' : 'Mới'}
        </div>
      )}

      {destination.vr && (
        <div className="absolute bottom-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          VR 360
        </div>
      )}
    </Link>
  </div>
);

export default function TrendingDestinations() {
  const locale = useLocale();

  return (
    <div className="space-y-16 p-4 md:p-8">
      {Object.entries(destinations).map(([key, list]) => (
        <div key={key} className="mt-8">
          <h2 className="text-2xl font-bold text-yellow mb-6">
            {locale === 'en'
              ? (key === 'trending' ? 'Trending Virtual Destinations' : 'Virtual Destinations')
              : (key === 'trending' ? 'Điểm du lịch nổi bật' : 'Điểm du lịch thực tế ảo')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((destination, index) => (
              <DestinationCard key={index} destination={destination} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
