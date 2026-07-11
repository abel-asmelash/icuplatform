import Link from "next/link";
import ROUTES from "@/constants/routes";
import { ChevronRight } from "lucide-react";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/action/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/action/tag.action";
import {  ITagDoc } from "@/database/tag.model";
const RightSideBar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const { success:tagSuccess,  data:tags, error:tagError } = await getTopTags();
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Populairste Vragen</h3>
        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          success={success}
          error={error}
          render={(questions) => (
            <div className="mt-7 flex w-full flex-col gap-7.5">
              {questions.map(({ _id, title }) => (
                <Link
                  key={_id.toString()}
                  href={ROUTES.QUESTION(_id.toString())}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {title}
                  </p>
                  <ChevronRight className="inverted-colors" size={20} />
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900 ">Populaire trefwoorden</h3>
        <div className="mt-7 flex flex-col gap-4">
          <DataRenderer
            data={tags}
            empty={{
              title: "No tags found",
              message: "No tags have been created yet.",
            }}
            success={tagSuccess}
            error={tagError}
            render={(topTags: ITagDoc[]) => (
              <div className="mt-7 flex w-full flex-col gap-4">
                {topTags.map(({ _id, name, questions }) => (
                  <TagCard
                    key={_id.toString()}
                    _id={_id.toString()}
                    name={name}
                    questions={questions}
                    showCount
                    compact
                  />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
