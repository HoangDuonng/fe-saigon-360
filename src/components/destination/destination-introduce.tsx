"use client"
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Destination {
  nameEn: string;
  nameVi: string;
  image: string;
  descriptionEn?: string;
  descriptionVi?: string;
  link: string;
  trending?: boolean;
  new?: boolean;
}

const destinations: { trending: Destination[] } = {
  trending: [
    {
      nameEn: 'Saigon Notre Dame Cathedral',
      nameVi: 'Nhà thờ Đức Bà',
      image: '/assets/images/nhathoducba.png',
      descriptionEn: "Notre-Dame Cathedral Basilica of Saigon is an iconic architectural landmark, embodying a rich blend of history and culture. Built in 1880 during the French colonial period, the cathedral stands as both a religious and artistic masterpiece in the heart of Saigon. Features neo-Romanesque architecture with its striking red brick facade and twin bell towers.",
      descriptionVi: "Nhà thờ Đức Bà Sài Gòn (Notre-Dame Cathedral Basilica of Saigon) là một trong những công trình kiến trúc tiêu biểu nhất của Việt Nam, mang đậm dấu ấn lịch sử và văn hóa. Được xây dựng từ năm 1880 dưới thời Pháp thuộc, nhà thờ là một biểu tượng tôn giáo và nghệ thuật kiến trúc giữa lòng Sài Gòn. Tháp chuông cao 60m.",
      link: '/destinations/saigon-notre-dame-cathedral',
      trending: true,
    },
    {
      nameEn: 'Ho Chi Minh Book Street',
      nameVi: 'Đường sách Hồ Chí Minh',
      descriptionEn: "Ho Chi Minh City Book Street is a unique cultural space that fosters a love for reading and knowledge.  This pedestrian-friendly street is lined with bookstores, cafes, and exhibition areas, creating an inviting atmosphere for book lovers of all ages.",
      descriptionVi: "Đường Sách Thành phố Hồ Chí Minh là một không gian văn hóa độc đáo, nuôi dưỡng niềm đam mê đọc sách và tri thức. Nằm ngay trung tâm thành phố và có chiều dài 144 mét.",
      image: '/assets/images/duongsach.png',
      link: '/destinations/book-street',
      trending: true,
    },
    {
      nameEn: 'Ben Thanh Market',
      nameVi: 'Chợ Bến Thành',
      descriptionEn: "Ben Thanh Market is one of Saigons oldest and most famous landmarks. Located in the heart of the city, it has been a bustling hub of commerce and culture for over a century. The market offers a vibrant atmosphere where visitors can explore a wide variety of goods, from local handicrafts and souvenirs to fresh produce and traditional Vietnamese cuisine. Beyond being a shopping destination, Ben Thanh Market is a cultural icon that reflects the spirit of Saigon. Its historic architecture, lively stalls, and diverse range of products make it a must-visit spot for both locals and tourists. Whether experiencing the flavors of authentic street food or bargaining for unique items, a visit to this market provides a glimpse into the citys rich heritage and dynamic lifestyle.",
      descriptionVi: "Chợ Bến Thành là một trong những địa danh lâu đời và nổi tiếng nhất của Sài Gòn. Nằm ngay trung tâm thành phố, chợ đã là một trung tâm thương mại và văn hóa sôi động suốt hơn một thế kỷ. Tại đây, du khách có thể khám phá vô số mặt hàng, từ đồ thủ công mỹ nghệ và quà lưu niệm địa phương đến nông sản tươi sống và ẩm thực truyền thống Việt Nam. Không chỉ là một điểm mua sắm, Chợ Bến Thành còn là biểu tượng văn hóa phản ánh tinh thần của Sài Gòn. Kiến trúc mang dấu ấn lịch sử, những gian hàng nhộn nhịp và sự đa dạng của các sản phẩm khiến nơi đây trở thành điểm đến không thể bỏ qua đối với cả người dân địa phương và du khách. Dù là để thưởng thức hương vị ẩm thực đường phố chính gốc hay tìm kiếm những món hàng độc đáo, một chuyến ghé thăm chợ sẽ mang đến cái nhìn chân thực về di sản phong phú và nhịp sống sôi động của thành phố.",
      image: '/assets/images/chobenthanh.png',
      link: '/destinations/ben-thanh-market',
      trending: true,
    },
    {
      nameEn: 'Ben Thanh - Suoi Tien Metro Line',
      nameVi: 'Tuyến Metro Bến Thành - Suối Tiên',
      descriptionEn: "TThe Ben Thanh - Suoi Tien Metro Line is the first urban railway line in Ho Chi Minh City, marking a significant milestone in the citys transportation infrastructure. Designed to ease traffic congestion and provide a modern, efficient public transit system, this metro line connects the bustling downtown area with the rapidly developing eastern districts. Stretching over multiple stations, the metro line enhances connectivity between key commercial, educational, and residential areas, making daily commutes faster and more convenient. With advanced technology and a commitment to sustainability, it aims to revolutionize urban mobility and encourage a shift towards public transportation. Beyond its role as a transit system, the Ben Thanh - Suoi Tien Metro Line represents Ho Chi Minh Citys progress toward becoming a more dynamic and future-ready metropolis. It is a symbol of modernization, promising improved urban living and economic growth for the city and its residents.",
      descriptionVi: "Tuyến Metro Bến Thành - Suối Tiên là tuyến đường sắt đô thị đầu tiên tại Thành phố Hồ Chí Minh, đánh dấu một cột mốc quan trọng trong hệ thống giao thông của thành phố. Được thiết kế nhằm giảm ùn tắc giao thông và cung cấp một hệ thống vận tải công cộng hiện đại, hiệu quả, tuyến metro này kết nối khu trung tâm sầm uất với các quận phía Đông đang phát triển nhanh chóng. Trải dài qua nhiều ga, tuyến metro giúp tăng cường kết nối giữa các khu vực thương mại, giáo dục và dân cư, giúp việc đi lại hàng ngày trở nên nhanh chóng và thuận tiện hơn. Với công nghệ tiên tiến và cam kết phát triển bền vững, tuyến metro này hướng đến việc cách mạng hóa giao thông đô thị và khuyến khích người dân sử dụng phương tiện công cộng. Không chỉ là một hệ thống giao thông, tuyến Metro Bến Thành - Suối Tiên còn thể hiện bước tiến của Thành phố Hồ Chí Minh trên con đường trở thành một đô thị năng động và hiện đại. Đây là biểu tượng của sự đổi mới, hứa hẹn nâng cao chất lượng sống đô thị và thúc đẩy tăng trưởng kinh tế cho thành phố và cư dân.",
      image: '/assets/images/metro-ben-thanh-suoi-tien/metro-ben-thanh-suoi-tien1.png',
      link: '/destinations/metro-ben-thanh-suoi-tien',
      trending: true,
    }
  ]
};
interface DestinationCardProps {
  destination: Destination;
  locale: string;
}

const DestinationCard = ({ destination, locale }: DestinationCardProps) => (
    <div className="flex overflow-hidden transition-transform duration-700 bg-white group">
      {/* Hình ảnh (nửa trái) */}
      <div className="w-1/2 relative">
        <Image
          src={destination.image}
          alt={destination.nameEn}
          width={400}
          height={300}
          className="w-full h-[400px] object-cover group-hover:brightness-75 transition-all duration-700"
        />
      </div>
  
      {/* Nội dung (nửa phải) */}
      <div className="w-1/2 p-6 flex flex-col justify-between">
        <h3 className="text-black text-2xl font-semibold group-hover:text-yellow-500 transition-all duration-500">
          {locale === 'en' ? destination.nameEn : destination.nameVi}
        </h3>
  
        {/* Mô tả */}
        {destination.descriptionEn && (
          <p className="text-gray-600 mt-2 text-sm">
            {locale === 'en' ? destination.descriptionEn : destination.descriptionVi}
          </p>
        )}
  
        {/* Nút "Xem chi tiết" */}
        <Link
          href={`/${locale}/${destination.link}`}
          className="mt-4 w-max px-4 py-2 text-sm font-medium text-yellow-600 border-2 border-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-yellow transition-all duration-500"
        >
          {locale === 'en' ? 'See details' : 'Xem chi tiết'}
        </Link>
      </div>
    </div>
  );
  

  export default function TrendingDestinations() {
    const locale = useLocale();
    const [showAll, setShowAll] = useState(false);
  
    return (
      <div className="space-y-24">
        {Object.entries(destinations).map(([key, list]) => {
          const visibleDestinations = showAll ? list : list.slice(0, 2);
  
          return (
            <div key={key} className="text-center">
              <div className="flex flex-col gap-12 mt-8">
                {visibleDestinations.map((destination, index) => (
                  <DestinationCard key={index} destination={destination} locale={locale} />
                ))}
              </div>
  
              {/* Nút "Xem thêm" */}
              {list.length > 2 && !showAll && (
                <button
                  className="mt-6 px-6 w-max text-sm font-medium text-yellow-600 border-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-yellow transition-all duration-500 underline"
                  onClick={() => setShowAll(true)}
                >
                  {locale === 'en' ? 'Show more' : 'Xem thêm'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }