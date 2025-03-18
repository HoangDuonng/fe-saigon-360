import Images from "@/components/shared";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function VtourTravel() {
    const locale = useLocale();


    return (
        <div className="relative w-full h-screen">
            <Image
                src={Images.district1}
                layout="fill"
                objectFit="cover"
                alt="Ho Chi Minh Travel"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                {/* Text */}
                {locale === "en" ?
                    (
                        <div>
                            <h1 className="text-4xl font-bold">Welcome to</h1>
                            <h2 className="text-5xl font-extrabold mt-2"> Ho Chi Minh City</h2>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-4xl font-bold">Chào mừng tới</h1>
                            <h2 className="text-5xl font-extrabold mt-2">Thành phố Hồ Chí Minh</h2>
                        </div>
                    )
                }
                {locale === "en" ?
                    (
                        <Link href={`/${locale}/vtour-travel/panorama`}>
                            <button className="mt-6 bg-yellow text-white px-6 py-2 rounded-full flex items-center uppercase">
                                continue →
                            </button>
                        </Link>
                    ) : (
                        <Link href={`/${locale}/vtour-travel/district`}>
                            <button className="mt-6 bg-yellow text-white px-6 py-2 rounded-full flex items-center uppercase">
                                tiếp tục →
                            </button>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}
