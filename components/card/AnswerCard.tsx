import React from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { auth } from "@/auth";
import { Preview } from "../editor/Preview";
import AnswerBody from "@/components/answers/AnswerBody";

const AnswerCard = async ({
  _id,
  author,
  content,
  createdAt,
  helpfulBy,
}: Answer) => {
  const session = await auth();
  const userId = session?.user?.id;
  const isHelpful = userId ? helpfulBy.includes(userId) : false;
  const isAuthor = userId === author._id;

  return (
    <article className="light-border border-b py-10">
      <span id={JSON.stringify(_id)} className="hash-span">
        <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mb-5">
          <div className="flex flex-1 items-start gap-1 sm:items-center">
            <UserAvatar
              id={author._id}
              name={author.name}
              imageUrl={author.image}
              className="size-5 rounded-full object-cover max-sm:mt-2"
            />
            <Link
              href={ROUTES.PROFILE(author._id)}
              className="flex flex-col sm:flex-row sm:items-center max-sm:ml-1"
            >
              <p className="body-semibold text-dark300_light700">
                {author.name ?? "Anonymous"}
              </p>
              <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                <span className="max-sm:hidden">&nbsp;-&nbsp;</span>
                answered {getTimeStamp(new Date(createdAt))}
              </p>
            </Link>
          </div>
        </div>

        <AnswerBody
          answerId={_id}
          content={content}
          isHelpful={isHelpful}
          helpfulCount={helpfulBy.length}
          isAuthor={isAuthor}
          preview={<Preview content={content} />}
        />
      </span>
    </article>
  );
};

export default AnswerCard;
