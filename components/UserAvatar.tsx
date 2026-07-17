 
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
 
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
  fallbackClassName?:string
}

const UserAvatar = ({
 
  name,
  imageUrl,
  className = "h-9 w-9",
}: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
   
      <Avatar className={cn("relative", className)}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-full"
           fill
            quality={100}
          />
        ) : (
          <AvatarFallback className={cn("primary-gradient font-space-grotesk font-bold tracking-wider text-white")}>
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
 
  );
};

export default UserAvatar;
