import { useLocale } from "next-intl";
import { GoHeart } from "react-icons/go";

export default function Favourite() {
    const locale = useLocale();

    return (
        <div className="flex items-center gap-2 text-base font-bold hover:text-red-700 hover:cursor-pointer">
            {locale == "en" ?
                <p>Dating</p> :
                <p>Hẹn hò</p>
            }
            <GoHeart className="w-5 h-5" />
        </div>
    )
}