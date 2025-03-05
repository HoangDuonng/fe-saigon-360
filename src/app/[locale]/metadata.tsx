import type { Metadata } from "next";

const titles = {
  en: "Saigon Travel - Explore Vietnam",
  vi: "Du Lịch Sài Gòn - Khám Phá Việt Nam",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const title = titles[locale as keyof typeof titles] || "Saigon Travel";

  return {
    title,
    description: "Discover the best destinations in Saigon and Vietnam.",
  };
}
