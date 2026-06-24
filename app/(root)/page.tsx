// "use client"
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/card/QuestionCard";
import { getQuestions } from "@/lib/action/question.action";
 

interface SearchParams {
  searchParams: Promise<{[key: string]: string}>
}

const Home = async ({searchParams}:SearchParams) => {
  const {page, pageSize, query, filter} = await searchParams;
  const {success, data, error} = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || ""
  })

  const  {question: questions} = data || {};
  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-3xl text-center mt-5">Alle Vragen</h1>
        <Button className="primary-gradient min-h-10 px-4 py-3 text-light-900 rounded-md">
          <Link href={ROUTES.ASK_QUESTION}>Stel een vraag</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          imgSrc="/assets/icons/search.svg"
          placeholder="Zoek vragen..."
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />

      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question._id as string}
                question={
                  question as unknown as {
                    _id: string;
                    title: string;
                    tags: { _id: string; name: string }[];
                    author: { _id: string; name: string; image: string };
                    createdAt: Date;
                    answers: number;
                    upvotes: number;
                    views: number;
                  }
                }
              />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-center text-light-500">
                Geen vragen Gevonden.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-center text-light-500">
            {error?.message || "Failed to fetch question"}
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
