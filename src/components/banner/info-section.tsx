import { useLocale } from "next-intl";
import Image from "next/image";

interface InfoSectionProps {
    title: string;
    openTime: string;
    subtitle: string;
    content: string; // Modified: Content is now a single string
    images: string[];
    id: string;
}

export default function InfoSection({ title, openTime, subtitle, content, images, id }: InfoSectionProps) {
    const locale = useLocale();
    const paragraphs = content.split("\n"); // Split content into paragraphs

    return (
        <div className="py-10 px-4">
            <h2 className="text-xl md:text-2xl font-roboto font-bold text-black border-b pb-2">{title}</h2>
            <p className="text-xs md:text-sm font-roboto font-normal">{openTime}</p>
            <p className="text-sm mt-2 md:text-base font-semibold text-black">{subtitle}</p>

            {/* Hiển thị nội dung và ảnh xen kẽ */}
            <div className="mt-4 space-y-10">
                {paragraphs.map((paragraph, index) => { // Iterate over paragraphs
                    const hasImage = index < images.length; // Kiểm tra ảnh có tồn tại không

                    return (
                        <div key={index} className="space-y-4">
                            {/* Nếu có ảnh, hiển thị full width */}
                            {hasImage && (
                                <div className="w-full h-auto">
                                    <Image
                                        src={images[index]}
                                        alt={`Hình ảnh ${index + 1}`}
                                        width={1200} // Đảm bảo ảnh chất lượng cao
                                        height={600}
                                        layout="responsive"
                                        className="rounded-lg shadow-lg"
                                    />
                                    {/* Đặt caption giữa ảnh và văn bản */}
                                    <p className="italic text-sm font-light mt-2 text-center">
                                        {locale == "en" ? 
                                            `Image ${id}_${index + 1}.png` : 
                                            `Hình ảnh ${id}_${index + 1}.png`}
                                    </p>
                                </div>
                            )}
                            {/* Văn bản hiển thị bên dưới ảnh */}
                            <p className="text-sm md:text-base text-black">{paragraph}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}