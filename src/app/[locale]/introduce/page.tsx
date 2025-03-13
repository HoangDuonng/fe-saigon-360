"use client";
import Image from "next/image";
import HomeBanner from "@/components/banner/home-banner";
import Header from "@/components/header/header";
import { useLocale } from "next-intl";
import { useState } from "react";
import placesData from "@/data/places";
import foodsData from "@/data/foods";
import eventsData from "@/data/events";
import { Place, Food, Event } from "@/app/types";
import Footer from "@/components/footer/footer";

export default function HCMCTourism() {
  const locale = useLocale();
  const [generalInfo, setGeneralInfo] = useState({
    title: "Tổng Quan về TP. Hồ Chí Minh",
    paragraphs: [
      "Thành phố Hồ Chí Minh (TP.HCM), còn được gọi là Sài Gòn, là thành phố lớn nhất Việt Nam, đồng thời là trung tâm kinh tế, văn hóa, giáo dục và du lịch quan trọng. Nằm bên bờ sông Sài Gòn, TP.HCM có vị trí chiến lược trong khu vực Đông Nam Á.",
      "Với diện tích khoảng 2.095 km² và dân số hơn 9 triệu người (năm 2024), TP.HCM là một đô thị năng động và đa dạng, kết hợp giữa nét đẹp truyền thống và sự hiện đại.",
    ],
    imageSrc: "/assets/images/hochiminh.png",
    altText: "Tổng quan TP.HCM",
  });

  const [districtsInfo, setDistrictsInfo] = useState({
    title: "Các Quận Chính và Vùng Lân Cận",
    description:
      "TP. Hồ Chí Minh bao gồm 16 quận nội thành, 5 huyện ngoại thành và 1 thành phố trực thuộc (Thành phố Thủ Đức):",
    districtList: [
      "Quận 1: Trung tâm tài chính, hành chính, giải trí với nhiều công trình kiến trúc lịch sử và hiện đại.",
      "Quận 3: Khu vực yên tĩnh với nhiều biệt thự cổ, quán cà phê và nhà hàng.",
      "Quận 5: Khu Chợ Lớn, trung tâm văn hóa và thương mại của cộng đồng người Hoa.",
      "Quận 7: Khu đô thị Phú Mỹ Hưng, khu vực hiện đại với nhiều tiện ích cao cấp.",
      "Quận 9 (nay thuộc Thành phố Thủ Đức): Khu công nghệ cao, tập trung nhiều trường đại học và viện nghiên cứu.",
      "Quận 10: Khu vực sầm uất với nhiều bệnh viện, trường học và chợ.",
      "Quận Bình Thạnh: Khu vực dân cư đông đúc với nhiều chợ truyền thống và khu du lịch Văn Thánh.",
      "Thành phố Thủ Đức: Trung tâm kinh tế, khoa học công nghệ và giáo dục mới của TP.HCM, bao gồm Quận 2, Quận 9 và Quận Thủ Đức cũ.",
      "Các huyện ngoại thành (Củ Chi, Hóc Môn, Bình Chánh, Nhà Bè, Cần Giờ): Vùng nông thôn với nhiều di tích lịch sử, khu du lịch sinh thái và làng nghề truyền thống.",
    ],
    imageSrc: "/assets/images/introduce/ban-do-tphcm.jpg",
    altText: "Các Quận TP.HCM",
  });

  const [places, setPlaces] = useState<Place[]>(placesData);
  const [foods, setFoods] = useState<Food[]>(foodsData);
  const [events, setEvents] = useState<Event[]>(eventsData);

  return (
    <div>
      <Header />
      <HomeBanner />
      <div className="container mx-auto px-6 md:px-20 py-12">
        <h3 className="text-2xl md:text-3xl font-semibold text-yellow border-b pb-3">
          {locale === "vi" ? "Khám Phá Thành Phố Hồ Chí Minh" : "Explore Ho Chi Minh City"}
        </h3>
        {/* Tổng Quan */}
        <Section
          title={generalInfo.title}
          paragraphs={generalInfo.paragraphs}
          imageSrc={generalInfo.imageSrc}
          altText={generalInfo.altText}
        />

        {/* Các Quận */}
        <DistrictsSection
          title={districtsInfo.title}
          description={districtsInfo.description}
          districtList={districtsInfo.districtList}
          imageSrc={districtsInfo.imageSrc}
          altText={districtsInfo.altText}
        />

        {/* Địa điểm nổi bật */}
        <FeaturedPlacesSection places={places} locale={locale} />

        {/* Văn hóa & Ẩm thực */}
        <CultureAndFoodSection foods={foods} locale={locale} />

        {/* Sự kiện & Lễ hội */}
        <EventsSection events={events} locale={locale} />
      </div>

      <Footer />
    </div>
  );
}

// Các components nhỏ hơn
function Section({
  title,
  paragraphs,
  imageSrc,
  altText,
}: {
  title: string;
  paragraphs: string[];
  imageSrc: string;
  altText: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 items-center">
        <div>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base text-gray-700 mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <Image
            src={imageSrc}
            alt={altText}
            width={600}
            height={400}
            style={{ objectFit: "cover" }}
            priority
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

function DistrictsSection({
  title,
  description,
  districtList,
  imageSrc,
  altText,
}: {
  title: string;
  description: string;
  districtList: string[];
  imageSrc: string;
  altText: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 items-center">
        <div>
          <p className="text-base text-gray-700 mt-4 leading-relaxed">
            {description}
          </p>
          <ul className="list-disc pl-6 mt-4 text-base text-gray-700">
            {districtList.map((district, index) => (
              <li key={index}>
                <strong>{district.split(":")[0]}:</strong>{" "}
                {district.split(":")[1]}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <Image
            src={imageSrc}
            alt={altText}
            width={600}
            height={400}
            style={{ objectFit: "cover" }}
            priority
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedPlacesSection({ places, locale }: { places: Place[]; locale: string }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">
        {locale === "vi" ? "Các Điểm Du Lịch Nổi Bật" : "Featured Places"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {places.map((place) => (
          <div
            key={locale === "vi" ? place.nameVi : place.nameEn}
            className="relative overflow-hidden"
          >
            <Image
              src={place.imageSrc}
              alt={locale === "vi" ? place.nameVi : place.nameEn}
              width={600}
              height={400}
              className="rounded-xl w-[500px] h-auto"
            />
             <p className="text-sm text-gray-700 mt-4 leading-relaxed text-center">
               {locale === "vi" ? place.descriptionVi : place.descriptionEn}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CultureAndFoodSection({ foods, locale }: { foods: Food[]; locale: string }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">
        {locale === "vi" ? "Văn Hóa và Ẩm Thực" : "Culture and Cuisine"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-2 items-start">
        <div>
          <p className="text-base text-gray-700 mt-4 leading-relaxed">
            {locale === "vi"
              ? "Ẩm thực Sài Gòn là sự giao thoa tinh tế giữa các vùng miền, mang đậm nét đặc trưng của ba miền Bắc - Trung - Nam. Những món ăn tại đây không chỉ phản ánh hương vị truyền thống mà còn có sự biến tấu linh hoạt để phù hợp với khẩu vị đa dạng của người dân và du khách."
              : "Saigon cuisine is a delicate blend of regions, with the unique characteristics of the three regions of North - Central - South. The dishes here not only reflect traditional flavors but also have flexible variations to suit the diverse tastes of locals and tourists."}
            <br />
            {locale === "vi"
              ? "Với nền văn hóa ẩm thực phong phú, Sài Gòn là thiên đường của những tín đồ yêu thích ăn uống. Bạn có thể dễ dàng tìm thấy từ những món ăn dân dã như cơm tấm, hủ tiếu, bánh mì cho đến các món đặc sản miền Trung như bún bò Huế, mì Quảng hay hương vị đậm đà của phở Hà Nội."
              : "With a rich culinary culture, Saigon is a paradise for food lovers. You can easily find from rustic dishes such as broken rice, hu tieu, banh mi to Central specialties such as beef noodle soup, Quang noodles or the rich flavor of Hanoi pho."}
            <br />
            {locale === "vi"
              ? "Không chỉ dừng lại ở ẩm thực Việt Nam, Sài Gòn còn chịu ảnh hưởng của nhiều nền ẩm thực quốc tế, từ Trung Hoa, Hàn Quốc, Nhật Bản cho đến Pháp và Mỹ. Những con phố ăn uống, khu chợ đêm nhộn nhịp hay các nhà hàng sang trọng đều mang đến vô vàn lựa chọn hấp dẫn, làm hài lòng mọi thực khách."
              : "Not only stopping at Vietnamese cuisine, Saigon is also influenced by many international cuisines, from Chinese, Korean, Japanese to French and American. The bustling food streets, night markets or luxurious restaurants all offer countless attractive options, satisfying every diner."}
            <br />
            {locale === "vi"
              ? "Sự pha trộn độc đáo này đã giúp ẩm thực Sài Gòn trở thành một điểm nhấn quan trọng, không chỉ thỏa mãn vị giác mà còn thể hiện nét đặc trưng trong văn hóa và lối sống của người dân nơi đây."
              : "This unique blend has made Saigon cuisine an important highlight, not only satisfying the taste buds but also reflecting the unique features in the culture and lifestyle of the people here."}
          </p>
          <ul className="list-none mt-4 text-base text-gray-700 flex flex-col items-center justify-center space-y-20">
            {foods.map((food) => (
              <li
                key={locale === "vi" ? food.nameVi : food.nameEn}
                className="flex flex-col items-center space-y-4 text-base font-light text-center"
              >
                <Image
                  src={food.imageSrc}
                  alt={locale === "vi" ? food.nameVi : food.nameEn}
                  width={900}
                  height={900}
                  className="w-[900px] h-[400px]"
                />
                <span className="font-light">
                  {locale === "vi" ? food.nameVi : food.nameEn}: {locale === "vi" ? food.descriptionVi : food.descriptionEn}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EventsSection({ events, locale }: { events: Event[]; locale: string }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">
        {locale === "vi" ? "Sự Kiện và Lễ Hội" : "Events and Festivals"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-2 items-start">
        <div>
          <p className="text-base text-gray-700 mt-4 leading-relaxed">
            {locale === "vi"
              ? "TP.HCM là nơi diễn ra nhiều sự kiện văn hóa, thể thao và lễ hội lớn trong năm."
              : "HCMC is home to many major cultural, sporting, and festive events throughout the year."}
          </p>
          <ul className="list-none mt-4 text-base text-gray-700 flex flex-col items-center justify-center space-y-20">
            {events.map((event) => (
              <li
                key={locale === "vi" ? event.nameVi : event.nameEn}
                className="flex flex-col items-center space-y-4 text-base font-light text-center"
              >
                <Image
                  src={event.imageSrc}
                  alt={locale === "vi" ? event.nameVi : event.nameEn}
                  width={900}
                  height={900}
                  className="w-[900px] h-[400px]"
                />
                <span className="font-light">
                  {locale === "vi" ? event.nameVi : event.nameEn}: {locale === "vi" ? event.descriptionVi : event.descriptionEn}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
