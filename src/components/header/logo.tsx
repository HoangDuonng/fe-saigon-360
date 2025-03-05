import Image from "next/image";
import Images from "../shared"; 

export default function Logo() {
    return (
        <div>
            <Image
                src={Images.logo}
                width={150}
                height={150} 
                alt={"logo"}           
            />
        </div>
    )
}