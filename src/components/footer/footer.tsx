import Images from "@/components/shared";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Footer() {
    const locale = useLocale();

    return (
        <div>
            <footer className="flex flex-wrap bg-[#F2F2F2] text-center mt-20 md:justify-center md:p-12">
                <div className="w-full sm:w-1/5 p-2 text-[#1D4ED8] md:p-4">
                    <Link href='/' passHref>
                        <div className="flex justify-center hover:cursor-pointer">
                            <div className="flex flex-col sm:flex-row justify-center sm:space-x-2 ml-1">
                                <span className="text-xl md:text-2xl font-bold text-red">SAIGON</span>
                                <span className="text-xl md:text-2xl font-bold text-yellow">360</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col w-full md:w-1/5 text-sm p-4 md:text-[16px] space-y-4">
                    <span className="text-black py-2 font-bold">{locale === "en" ? "Panoramas" : "Toàn cảnh"}</span>
                    {[
                        locale === "en" ? "Saigon Notre Dame Cathedral" : "Nhà thờ Đức Bà Sài Gòn",
                        locale === "en" ? "Ho Chi Minh Book Street" : "Đường sách Hồ Chí Minh",
                        locale === "en" ? "Ben Thanh Market" : "Chợ Bến Thành"
                    ].map((item, index) => (
                        <span key={index} className="text-[#374151] py-1 hover:text-[#3B82F6] cursor-pointer transition-all">{item}</span>
                    ))}
                </div>

                <div className="flex flex-col w-full md:w-1/5 text-sm p-4 md:text-[16px] space-y-4">
                    <span className="text-black py-2 font-bold">{locale === "en" ? "University" : "Trường đại học"}</span>
                    {[
                        locale === "en" ? "About Us" : "Về chúng tôi",
                        locale === "en" ? "Contact" : "Liên hệ"
                    ].map((item, index) => (
                        <span key={index} className="text-[#374151] py-1 hover:text-[#3B82F6] cursor-pointer transition-all">{item}</span>
                    ))}
                </div>

                <div className="flex flex-col w-full md:w-1/5 text-sm p-4 md:text-[16px] space-y-4">
                    <span className="text-black py-2 font-bold">{locale === "en" ? "Info" : "Thông tin"}</span>
                    {[
                        locale === "en" ?
                            <Link href="https://portfolio-howlanh.vercel.app/">Portfolio</Link>
                            :
                            <Link href="https://portfolio-howlanh.vercel.app/">Thông tin @howlanh</Link>,
                        locale === "en" ? "Join us" : "Tham gia cùng chúng tôi",
                        locale === "en" ? "Privacy and Policy" : "Chính sách bảo mật",

                    ].map((item, index) => (
                        <span key={index} className="text-[#374151] py-1 hover:text-[#3B82F6] cursor-pointer transition-all">{item}</span>
                    ))}
                </div>

                <div className="flex flex-col w-full md:w-1/5 text-sm p-4 md:text-[16px] space-y-4">
                    <span className="text-black py-2 font-bold">{locale === "en" ? "Have a question?" : "Có câu hỏi nào?"}</span>
                    <span className="text-[#374151] py-1 hover:text-[#3B82F6] cursor-pointer transition-all">
                        {locale === "en" ? "2 Truong Sa, Ward 17, Binh Thanh District, HCM" : "2 Trường Sa, Phường 17, Quận Bình Thạnh, HCM"}
                    </span>
                </div>

                <div className="w-full px-6 md:px-24 pb-10 py-6">
                    <hr className="border-t border-[#D1D5DB] mb-6" />
                    <span className="text-xs md:text-sm text-[#374151] text-center block">
                        {locale === "en" ? "Copyright © 2024 Saigon360. All rights reserved" : "Bản quyền © 2024 Saigon360. Đã đăng ký bản quyền"}
                    </span>
                </div>
            </footer>
        </div>
    );
}
