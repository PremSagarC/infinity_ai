import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export const BotAvatar = () => {
    return (
        <Avatar className="h-12 w-12">
            <Image src={'/eyeicon.png'} alt="logo" width={50} height={50}/>
        </Avatar>
    );
};