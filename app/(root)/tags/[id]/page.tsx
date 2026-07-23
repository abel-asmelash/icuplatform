import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import QuestionCard from "@/components/card/QuestionCard";
import LocalSearch from "@/components/search/LocalSearch";
import Pagination from "@/components/Pagination";
import { GetTagQuestions } from "@/lib/action/tag.action";
import type { RouteParams } from "@/types/actions";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const { success, data } = await GetTagQuestions({
    tagId: id,
    page: 1,
    pageSize: 1,
  });

  if (!success || !data?.tag) {
    return {
      title: "Tag not found",
      description: "This tag does not exist",
    };
  }

  return {
    title: `${data.tag.name} — Questions`,
    description:
      data.tag.description || `Questions tagged with ${data.tag.name}`,
  };
}

const TagDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await GetTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  if (!success && error?.details?.tagId) {
    // validation error on the id shape itself (e.g. malformed ObjectId)
    return notFound();
  }

  if (!success || !data?.tag) {
    return notFound();
  }

  const { tag, questions, isNext } = data;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl uppercase">
        {tag.name}
      </h1>
      {tag.description && (
        <p className="paragraph-regular text-dark400_light700 mt-3.5">
          {tag.description}
        </p>
      )}

      <section className="mt-11">
        <LocalSearch
          route={`/tags/${id}`}
          imgSrc="/assets/search.svg"
          placeholder={`Search vragen in ${tag.name}`}
          otherClasses="flex-1"
          iconPosition="left"
        />
      </section>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <Suspense key={question._id} fallback={<div>Loading...</div>}>
              <QuestionCard question={question} />
            </Suspense>
          ))
        ) : (
          <p className="text-dark400_light700 paragraph-regular mx-auto max-w-4xl text-center">
            Geen vragen gevonden voor deze tag
          </p>
        )}
      </div>

      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default TagDetails;
