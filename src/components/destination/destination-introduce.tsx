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
      descriptionEn: "Notre-Dame Cathedral Basilica of Saigon is an iconic architectural landmark, symbolizing the rich history and cultural heritage of Ho Chi Minh City. Built in the late 19th century during the French colonial period, the cathedral stands as a masterpiece of neo-Romanesque architecture with its striking red brick facade, twin bell towers, and intricate stained glass windows. Located in the heart of the city, it serves as both a place of worship and a popular tourist attraction. The cathedrals serene ambiance and historical significance make it a must-visit destination for those seeking to explore the citys past and admire its architectural beauty. As one of Saigons most treasured landmarks, it continues to be a testament to the citys blend of history, faith, and timeless elegance.",
      descriptionVi: "Nhà Thờ Đức Bà Sài Gòn là một công trình kiến trúc mang tính biểu tượng, thể hiện bề dày lịch sử và di sản văn hóa của Thành phố Hồ Chí Minh. Được xây dựng vào cuối thế kỷ 19 dưới thời Pháp thuộc, nhà thờ là một kiệt tác của kiến trúc Romanesque với mặt tiền gạch đỏ nổi bật, hai tháp chuông cao vút và những ô cửa kính màu tinh xảo. Nằm ngay trung tâm thành phố, nhà thờ không chỉ là nơi hành lễ mà còn là một điểm đến thu hút đông đảo du khách. Không gian trang nghiêm cùng giá trị lịch sử đặc biệt khiến nơi đây trở thành địa điểm không thể bỏ qua đối với những ai muốn khám phá quá khứ của thành phố và chiêm ngưỡng vẻ đẹp kiến trúc. Là một trong những công trình mang tính biểu tượng nhất của Sài Gòn, nhà thờ Đức Bà vẫn là minh chứng cho sự giao thoa giữa lịch sử, tín ngưỡng và nét đẹp vượt thời gian của thành phố.",
      link: '/destinations/saigon-notre-dame-cathedral',
      trending: true,
    },
    {
      nameEn: 'Ho Chi Minh Book Street',
      nameVi: 'Đường sách Hồ Chí Minh',
      descriptionEn: "Ho Chi Minh City Book Street is a unique cultural space that fosters a love for reading and knowledge. Nestled in the heart of the city, this pedestrian-friendly street is lined with bookstores, cafés, and exhibition areas, creating an inviting atmosphere for book lovers of all ages. Beyond being a place to buy books, it serves as a vibrant community hub where authors, scholars, and readers can connect through book signings, discussions, and literary events. Regular cultural and educational activities are organized, making it a dynamic space that promotes lifelong learning.With its blend of modern and traditional architecture, shaded walkways, and tranquil ambiance, Ho Chi Minh City Book Street offers a peaceful retreat from the citys hustle and bustle. It is not only a destination for book enthusiasts but also a symbol of the citys commitment to intellectual and cultural enrichment.",
      descriptionVi: "Đường Sách Thành phố Hồ Chí Minh là một không gian văn hóa độc đáo, nuôi dưỡng niềm đam mê đọc sách và tri thức. Nằm ngay trung tâm thành phố, con phố đi bộ này được bao quanh bởi các hiệu sách, quán cà phê và khu trưng bày, tạo nên một bầu không khí hấp dẫn dành cho những người yêu sách ở mọi lứa tuổi. Không chỉ là nơi mua sách, phố sách còn là một trung tâm giao lưu sôi động, nơi các tác giả, học giả và độc giả có thể kết nối thông qua các buổi ký tặng sách, tọa đàm và sự kiện văn học. Nhiều hoạt động văn hóa, giáo dục được tổ chức thường xuyên, biến nơi đây thành một không gian đầy sức sống, khuyến khích học tập suốt đời. Với sự kết hợp giữa kiến trúc hiện đại và truyền thống, những lối đi rợp bóng cây và không gian yên bình, Phố Sách Thành phố Hồ Chí Minh mang đến một góc thư giãn giữa nhịp sống sôi động của đô thị. Không chỉ là điểm đến dành cho những người yêu sách, nơi đây còn là biểu tượng cho sự phát triển trí tuệ và văn hóa của thành phố.",
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
      descriptionEn: "The Ben Thanh - Suoi Tien Metro Line is the first urban railway line in Ho Chi Minh City, marking a significant milestone in the citys transportation infrastructure. Designed to ease traffic congestion and provide a modern, efficient public transit system, this metro line connects the bustling downtown area with the rapidly developing eastern districts. Stretching over multiple stations, the metro line enhances connectivity between key commercial, educational, and residential areas, making daily commutes faster and more convenient. With advanced technology and a commitment to sustainability, it aims to revolutionize urban mobility and encourage a shift towards public transportation. Beyond its role as a transit system, the Ben Thanh - Suoi Tien Metro Line represents Ho Chi Minh Citys progress toward becoming a more dynamic and future-ready metropolis. It is a symbol of modernization, promising improved urban living and economic growth for the city and its residents.",
      descriptionVi: "Tuyến Metro Bến Thành - Suối Tiên là tuyến đường sắt đô thị đầu tiên tại Thành phố Hồ Chí Minh, đánh dấu một cột mốc quan trọng trong hệ thống giao thông của thành phố. Được thiết kế nhằm giảm ùn tắc giao thông và cung cấp một hệ thống vận tải công cộng hiện đại, hiệu quả, tuyến metro này kết nối khu trung tâm sầm uất với các quận phía Đông đang phát triển nhanh chóng. Trải dài qua nhiều ga, tuyến metro giúp tăng cường kết nối giữa các khu vực thương mại, giáo dục và dân cư, giúp việc đi lại hàng ngày trở nên nhanh chóng và thuận tiện hơn. Với công nghệ tiên tiến và cam kết phát triển bền vững, tuyến metro này hướng đến việc cách mạng hóa giao thông đô thị và khuyến khích người dân sử dụng phương tiện công cộng. Không chỉ là một hệ thống giao thông, tuyến Metro Bến Thành - Suối Tiên còn thể hiện bước tiến của Thành phố Hồ Chí Minh trên con đường trở thành một đô thị năng động và hiện đại. Đây là biểu tượng của sự đổi mới, hứa hẹn nâng cao chất lượng sống đô thị và thúc đẩy tăng trưởng kinh tế cho thành phố và cư dân.",
      image: '/assets/images/metro-ben-thanh-suoi-tien-about1.png',
      link: '/destinations/metro-ben-thanh-suoi-tien',
      trending: true,
    },
    {
      nameEn: 'Nguyen Hue Walking Street',
      nameVi: 'Phố đi bộ Nguyễn Huệ',
      descriptionEn: "Nguyen Hue Walking Street is a famous public space located in the heart of Ho Chi Minh City. It is a favorite destination for locals and tourists, where they can stroll, shop, dine and participate in entertainment activities. With a length of about 670 meters and a width of 64 meters, Nguyen Hue Walking Street is one of the largest walking streets in Vietnam. The street is decorated with many green trees, flowers and a modern lighting system, creating a beautiful and airy space. On weekends, Nguyen Hue Walking Street becomes especially lively with art performances, street music and cultural events. It is also an ideal destination to admire the citys famous architectural works, such as the City Hall, Rex Hotel and Vincom Center Shopping Mall.",
      descriptionVi: "Phố đi bộ Nguyễn Huệ là một không gian công cộng nổi tiếng nằm ngay trung tâm Thành phố Hồ Chí Minh. Đây là một điểm đến yêu thích của người dân địa phương và du khách, nơi họ có thể đi dạo, mua sắm, ăn uống và tham gia vào các hoạt động giải trí. Với chiều dài khoảng 670 mét và chiều rộng 64 mét, phố đi bộ Nguyễn Huệ là một trong những phố đi bộ lớn nhất Việt Nam. Phố được trang trí với nhiều cây xanh, hoa và hệ thống chiếu sáng hiện đại, tạo nên một không gian đẹp và thoáng đãng. Vào cuối tuần, phố đi bộ Nguyễn Huệ trở nên đặc biệt sôi động với các hoạt động biểu diễn nghệ thuật, âm nhạc đường phố và các sự kiện văn hóa. Nơi đây cũng là một điểm đến lý tưởng để ngắm nhìn các công trình kiến trúc nổi tiếng của thành phố, như Tòa nhà Ủy ban Nhân dân Thành phố, Khách sạn Rex và Trung tâm Thương mại Vincom Center.",
      image: '/assets/images/pho-di-bo-nguyen-hue-about2.png', // Thay thế bằng đường dẫn hình ảnh phù hợp
      link: '/destinations/nguyen-hue-walk-street',
      trending: true,
    },
    {
      nameEn: 'Saigon Central Post Office',
      nameVi: 'Bưu điện Trung tâm Sài Gòn',
      descriptionEn: "Saigon Central Post Office is one of the typical architectural works of Ho Chi Minh City, bearing the strong imprint of ancient French architecture. Built in the late 19th century, the post office is not only a place providing postal services but also an attractive tourist destination, attracting tourists with its unique architectural beauty and long history. With its high arched architecture, large windows and exquisite decorative motifs, Saigon Central Post Office gives visitors the feeling of being lost in an ancient European space. Inside the post office, visitors can admire large murals, solid stone columns and meticulously carved wooden desks. Not only is it a beautiful architectural work, Saigon Central Post Office is also a historical witness of the city. This place has witnessed many important events of Saigon, from the French colonial period to the years of war and peace.",
      descriptionVi: "Bưu điện Trung tâm Sài Gòn là một trong những công trình kiến trúc tiêu biểu của Thành phố Hồ Chí Minh, mang đậm dấu ấn kiến trúc Pháp cổ. Được xây dựng vào cuối thế kỷ 19, bưu điện không chỉ là một địa điểm cung cấp dịch vụ bưu chính mà còn là một điểm đến du lịch hấp dẫn, thu hút du khách bởi vẻ đẹp kiến trúc độc đáo và lịch sử lâu đời. Với kiến trúc mái vòm cao, những ô cửa sổ lớn và những họa tiết trang trí tinh xảo, Bưu điện Trung tâm Sài Gòn mang đến cho du khách cảm giác như đang lạc vào một không gian châu Âu cổ kính. Bên trong bưu điện, du khách có thể chiêm ngưỡng những bức tranh tường lớn, những chiếc cột đá vững chãi và những chiếc bàn làm việc bằng gỗ được chạm khắc tỉ mỉ. Không chỉ là một công trình kiến trúc đẹp, Bưu điện Trung tâm Sài Gòn còn là một chứng nhân lịch sử của thành phố. Nơi đây đã chứng kiến nhiều sự kiện quan trọng của Sài Gòn, từ thời kỳ Pháp thuộc đến những năm tháng chiến tranh và hòa bình.",
      image: '/assets/images/buu-dien-sai-gon-about1.png', 
      link: '/destinations/saigon-central-post-office',
      trending: true,
    },
  ]
};
interface DestinationCardProps {
  destination: Destination;
  locale: string;
}

const DestinationCard = ({ destination, locale }: DestinationCardProps) => (
  <div className="flex flex-col md:flex-row overflow-hidden transition-transform duration-700 bg-white group">
    {/* Hình ảnh */}
    <div className="relative md:w-1/2 w-full">
      <Image
        src={destination.image}
        alt={destination.nameEn}
        width={400}
        height={300}
        className="w-full h-48 md:h-[400px] object-cover group-hover:brightness-75 transition-all duration-700"
      />
    </div>

    {/* Nội dung */}
    <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
      <h3 className="text-black text-xl md:text-xl font-semibold group-hover:text-yellow-500 transition-all duration-500">
        {locale === 'en' ? destination.nameEn : destination.nameVi}
      </h3>

      {/* Mô tả */}
      {destination.descriptionEn && (
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {locale === 'en' ? destination.descriptionEn : destination.descriptionVi}
        </p>
      )}

      {/* Nút "Xem chi tiết" */}
      <Link
        href={`/${locale}/${destination.link}`}
        className="text-black text-center mt-4 w-max px-4 py-2 text-sm font-medium text-yellow-600 border-2 border-yellow-600 rounded-lg hover:text-yellow transition-all duration-500"
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
          const visibleDestinations = showAll ? list : list.slice(0, 3);
  
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
                  className="text-black mt-6 px-6 w-max text-sm font-medium text-yellow-600 border-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-yellow transition-all duration-500 underline"
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