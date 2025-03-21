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
}

const destinations: { trending: Destination[]; new: Destination[] } = {
  trending: [
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
    },
    // {
    //   nameEn: 'Nguyen Hue Walking Street',
    //   nameVi: 'Phố đi bộ Nguyễn Huệ',
    //   image: '/assets/images/nguyen-hue-walk-street/pho-di-bo-nguyen-hue1.png',
    //   link: '/panoramas/nguyen-hue-walk-street',
    //   trending: true,
    // },
    // {
    //   nameEn: 'Saigon Central Post Office',
    //   nameVi: 'Bưu điện Trung tâm Sài Gòn',
    //   image: '/assets/images/saigon-central-post-office/buu-dien-sai-gon1.png',
    //   link: '/panoramas/saigon-central-post-office',
    //   trending: true,
    // }
  ],
  new: [
    {
      nameEn: 'Metro Ben Thanh - Suoi Tien',
      nameVi: 'Tàu điện Metro Bến Thành - Suối Tiên',
      image: '/assets/images/metro-ben-thanh-suoi-tien/metro-ben-thanh-suoi-tien1.png',
      link: '/panoramas/metro-ben-thanh-suoi-tien',
      new: true,
    },
    {
      nameEn: 'Nguyen Hue Walking Street',
      nameVi: 'Phố đi bộ Nguyễn Huệ',
      image: '/assets/images/nguyen-hue-walk-street/pho-di-bo-nguyen-hue1.png',
      link: '/panoramas/nguyen-hue-walk-street',
      new: true,
    },
    {
      nameEn: 'Saigon Central Post Office',
      nameVi: 'Bưu điện Trung tâm Sài Gòn',
      image: '/assets/images/saigon-central-post-office/buu-dien-sai-gon1.png',
      link: '/panoramas/saigon-central-post-office',
      new: true,
    },
  ]
};

interface DestinationCardProps {
  destination: Destination;
  locale: string;
}

const DestinationCard = ({ destination, locale }: DestinationCardProps) => (
  <div className="relative rounded-3xl overflow-hidden shadow-lg group hover:scale-105 transition-all duration-700">
    <Link href={`/${locale}/${destination.link}`}>
      <Image
        src={destination.image}
        alt={destination.nameEn}
        width={400}
        height={300}
        className="w-full h-[400px] object-cover group-hover:brightness-75 transition-all duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
        <h3 className="text-white text-2xl font-bold group-hover:translate-y-[-10px] transition-all duration-500">
          {locale === 'en' ? destination.nameEn : destination.nameVi}
        </h3>
      </div>

      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Image src="/assets/images/360.png" alt="360 icon" width={60} height={60} />
      </div>

      {destination.trending && (
        <div className="absolute top-4 left-4 bg-red text-white px-4 py-1 rounded-full text-sm shadow-md">
          {locale === 'en' ? 'Trending Destination' : 'Điểm du lịch nổi bật'}
        </div>
      )}

      {destination.new && (
        <div className="absolute top-4 left-4 bg-[#26ABE2] text-white px-4 py-1 rounded-full text-sm shadow-md">
          {locale === 'en' ? 'New Destination' : 'Điểm đến mới'}
        </div>
      )}
    </Link>
  </div>
);

export default function TrendingDestinations() {
  const locale = useLocale();

  return (
    <div className="space-y-24">
      {Object.entries(destinations).map(([key, list]) => (
        <div key={key} className="mt-10">
          <h2 className="text-xl font-extrabold text-yellow uppercase">
            {locale === 'en' ? (key === 'trending' ? 'Trending Virtual Destinations' : 'New Virtual Destinations') : (key === 'trending' ? 'Điểm du lịch nổi bật' : 'Điểm du lịch mới gần đây')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            {list.map((destination, index) => (
              <DestinationCard key={index} destination={destination} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}