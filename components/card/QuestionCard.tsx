import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import {
  faThumbsUp,
  faMessage,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HelpfulQuestionButton from "@/components/card/HelpfulQuestionButton";

import { deleteQuestion } from "@/lib/action/question.action";
import QuestionActions from "@/components/QuestionActions";
interface Props {
  question: {
    _id: string;
    title: string;
    tags: { _id: string; name: string }[];
    author: { _id: string; name: string; image: string };
    upvotes: number;
    views: number;
    answers: number;
    createdAt: Date;
    helpfulBy: string[];
  };
  currentUserId?: string;
}

const QuestionCard = ({ question, currentUserId }: Props) => {
  const { _id, title, tags, author, views, answers, createdAt, helpfulBy } =
    question;
  const isHelpful =
    !!currentUserId && (helpfulBy ?? []).includes(currentUserId);
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex  flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={ROUTES.TAGS(tag._id.toString())}
            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase"
          >
            {tag.name}
          </Link>
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div>
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="body-medium text-dark400_light700 hover:text-primary"
          >
            {author.name}
          </Link>
          <span className="text-dark400_light700">
            · {getTimeStamp(createdAt)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <HelpfulQuestionButton
              questionId={_id}
              initialIsHelpful={isHelpful}
              initialCount={helpfulBy?.length ?? 0}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon
              icon={faMessage}
              className="text-primary-500 w-4 h-4"
            />
            <span className="small-medium text-dark400_light700">
              {answers} Antwoorden
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon
              icon={faEye}
              className="text-primary-500 w-4 h-4"
            />
            <span className="small-medium text-dark400_light700">
              {views} Weergaven
            </span>
          </div>
          <div className="flex items-center ml-0 sm:ml-2 pl-0 sm:pl-3 border-l-0 `sm:border` border-light-700 dark:border-dark-400">
            <QuestionActions questionId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
