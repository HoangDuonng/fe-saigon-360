// src/data/foods.ts
import { Food } from "@/app/types"; // Assuming you have a types.ts file

const foods: Food[] = [
    {
      nameVi: "Phở",
      nameEn: "Pho",
      descriptionVi: "Món ăn quốc hồn quốc túy của Việt Nam, với nước dùng đậm đà và bánh phở mềm.",
      descriptionEn: "Vietnam's quintessential dish, with rich broth and soft rice noodles.",
      imageSrc: "/assets/images/introduce/foods/pho.png",
    },
    {
      nameVi: "Bánh mì",
      nameEn: "Banh Mi",
      descriptionVi: "Món sandwich ngon nhất thế giới theo CNN, với nhiều loại nhân khác nhau như thịt nguội, chả lụa, pate.",
      descriptionEn: "The best sandwich in the world according to CNN, with various fillings such as cold cuts, Vietnamese sausage, pate.",
      imageSrc: "/assets/images/introduce/foods/banhmi.png",
    },
    {
      nameVi: "Cơm tấm",
      nameEn: "Com Tam",
      descriptionVi: "Sườn nướng, bì, chả hấp dẫn, thường được ăn kèm với nước mắm pha.",
      descriptionEn: "Delicious grilled ribs, shredded pork skin, steamed meatloaf, usually served with fish sauce.",
      imageSrc: "/assets/images/introduce/foods/comtam.png",
    },
    {
      nameVi: "Ốc",
      nameEn: "Oc (Snails)",
      descriptionVi: "Món ăn vặt được yêu thích, với nhiều loại ốc khác nhau được chế biến theo nhiều cách.",
      descriptionEn: "A popular snack, with many different types of snails prepared in various ways.",
      imageSrc: "/assets/images/introduce/foods/oc.png",
    },
    {
      nameVi: "Các món chè",
      nameEn: "Che (Sweet Soups)",
      descriptionVi: "Đa dạng các loại chè như chè đậu xanh, chè bà ba, chè thái, chè khúc bạch.",
      descriptionEn: "Various types of sweet soups such as green bean sweet soup, Ba Ba sweet soup, Thai sweet soup, Khuc Bach sweet soup.",
      imageSrc: "/assets/images/introduce/foods/che.png",
    },
  ];

  export default foods;