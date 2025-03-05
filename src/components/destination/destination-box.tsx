import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const destinations = [
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
    link: '/panoramas/saigon-notre-dame-cathedral',
    trending: true,
  },
  {
    nameEn: 'Ben Thanh Market',
    nameVi: 'Chợ Bến Thành',
    image: '/assets/images/chobenthanh.png',
    link: '/panoramas/saigon-notre-dame-cathedral',
    trending: true,
  },
];

export default function TrendingDestinations() {
  const locale = useLocale();
  return (
    <div className='mt-5'>
      <span>
        {locale == "en" ?
          <span className="text-2xl text-yellow font-bold">Trending destination 360</span> :
          <span  className="text-2xl text-yellow font-bold">Các địa điểm xu hướng 360</span>
        }
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        {destinations.map((destination, index) => (
          <div key={index} className="relative rounded-2xl overflow-hidden shadow-md group">
            {/* Image */}
            <Link
              href={`/${locale}/${destination.link}`}
              key={index}
              className="cursor-pointer"
            >
              <Image
                src={destination.image}
                alt={destination.nameEn}
                width={400}
                height={300}
                className="w-full object-cover h-[400px] group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay Text */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                {locale == "en" ?
                  <h3 className="text-white font-bold text-2xl">{destination.nameEn}</h3> :
                  <h3 className="text-white font-bold text-2xl">{destination.nameVi}</h3>
                }
              </div>

              {/* Center Image */}
              <div className="absolute inset-0 flex justify-center items-center">
                <Image
                  src="/assets/images/360.png"
                  alt="360 icon"
                  width={50}
                  height={50}
                  className="group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Badge nếu là Trending */}
              {destination.trending && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red text-white px-3 py-1 rounded-full text-sm">
                    🔥 Trending destination
                  </span>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
