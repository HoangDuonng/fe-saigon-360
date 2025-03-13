// src/data/events.ts
import { Event } from "@/app/types"; // Assuming you have a types.ts file

const events: Event[] = [
    {
      nameVi: "Lễ hội Tết Nguyên Đán",
      nameEn: "Tet Nguyen Dan Festival",
      descriptionVi: "Lễ hội truyền thống lớn nhất của Việt Nam, với nhiều hoạt động văn hóa, nghệ thuật và ẩm thực.",
      descriptionEn: "The largest traditional festival in Vietnam, with many cultural, artistic, and culinary activities.",
      imageSrc: "/assets/images/introduce/events/tetnguyendan.png",
    },
    {
      nameVi: "Lễ hội Đường Sách TP.HCM",
      nameEn: "HCMC Book Street Festival",
      descriptionVi: "Sự kiện văn hóa thường niên thu hút đông đảo người yêu sách.",
      descriptionEn: "An annual cultural event that attracts many book lovers.",
      imageSrc: "/assets/images/introduce/events/duongsach.png",
    },
    {
      nameVi: "Lễ hội Áo dài TP.HCM",
      nameEn: "HCMC Ao Dai Festival",
      descriptionVi: "Sự kiện tôn vinh vẻ đẹp của áo dài Việt Nam.",
      descriptionEn: "An event that celebrates the beauty of Vietnamese Ao Dai.",
      imageSrc: "/assets/images/introduce/events/aodai.png",
    },

    {
      nameVi: "Countdown Party",
      nameEn: "Countdown Party",
      descriptionVi: "Sự kiện đếm ngược chào năm mới diễn ra tại nhiều địa điểm trung tâm thành phố, thu hút hàng ngàn người tham gia.",
      descriptionEn: "A New Year's Eve countdown event taking place in many central locations, attracting thousands of participants.",
      imageSrc: "/assets/images/introduce/events/countdown.png",
    },
  ];

  export default events;