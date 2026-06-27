import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import Metric from "@/components/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import TagCard from "@/components/cards/TagCard";
import Link from "next/link";
import type { RouteParams } from "@/types/actions";
import { Preview } from "../../../../components/editor/Preview";
 
 
import { getQuestion } from "@/lib/action/question.action";
 import { notFound } from "next/navigation";



const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: question } =  await getQuestion({
    questionId: id,
  });
  if(!success || !question)  return notFound()
const { author, createdAt, answers, views, tags, content, title} = question ;
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              className="size-5.5"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <p>Vote</p>
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>

        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Metric
            imageUrl="/assets/icons/clock.svg"
            alt="clock icon"
            value={`asked ${getTimeStamp(new Date(createdAt))}`}
            title=""
            textStyle="small-regular text-dark400_light700"
          />

          <Metric
            imageUrl="/assets/icons/message.svg"
            alt="answers icon"
            value={answers}
            title="Answers"
            textStyle="small-regular text-dark400_light700"
          />

          <Metric
            imageUrl="/assets/icons/eye.svg"
            alt="eye icon"
            value={formatNumber(views)}
            title="Views"
            textStyle="small-regular text-dark400_light700"
          />
        </div>
          <Preview content={content}/>

        <div className="mt-8 flex-wrap gap-2">
          {tags.map((tag) =>(
            <TagCard 
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionDetails;
