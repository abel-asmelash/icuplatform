import React from "react";
import UserAvatar from "../UserAvatar";
 
 

interface UserCardProps {
  _id: string;
  name: string;
  username: string;
  image?: string | null;
}

const UserCard = ({ _id, name, image, username }: UserCardProps) => {
  return (
    <div className="shadow-light100_darknone w-full sm:w-57.5">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <UserAvatar
          id={_id}
          name={name}
          imageUrl={image}
          className="`size-25` rounded-full object-cover"
          fallbackClassName="text-3xl tracking-wides"
        />
 
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{username}
            </p>
          </div>
     
      </article>
    </div>
  );
};

export default UserCard;
