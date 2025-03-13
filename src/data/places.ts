// src/data/places.ts
import { Place } from "@/app/types"; // Assuming you have a types.ts file

const places: Place[] = [
    {
      nameVi: "Landmark 81",
      nameEn: "Landmark 81",
      descriptionVi: "Tòa nhà cao nhất Việt Nam, biểu tượng của sự phát triển hiện đại.",
      descriptionEn: "The highest building in Vietnam, a symbol of modern development.",
      imageSrc: "/assets/images/introduce/places/landmark81.png",
    },
    {
      nameVi: "Chợ Bến Thành",
      nameEn: "Ben Thanh Market",
      descriptionVi: "Chợ truyền thống lớn nhất TP.HCM, nơi du khách có thể tìm thấy nhiều sản phẩm địa phương và quà lưu niệm.",
      descriptionEn: "The largest traditional market in HCMC, where visitors can find many local products and souvenirs.",
      imageSrc: "/assets/images/introduce/places/chobenthanh.png",
    },
    {
      nameVi: "Nhà thờ Đức Bà Sài Gòn",
      nameEn: "Notre-Dame Cathedral Basilica of Saigon",
      descriptionVi: "Công trình kiến trúc Pháp cổ kính, biểu tượng tôn giáo của thành phố.",
      descriptionEn: "A classic French architectural structure, a religious symbol of the city.",
      imageSrc: "/assets/images/introduce/places/nhathoducba.png",
    },
  ];

  export default places;