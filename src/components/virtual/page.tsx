import Image from "next/image";
import Images from "../shared";

export default function Vtour() {
    return (
        <div>
            <Image
                src={Images.district1}
                fill
                alt=""
                className="w-full h-auto"
            />
        </div>
    )
}