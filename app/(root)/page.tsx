import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/card/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import { getQuestions } from "@/lib/action/question.action";
import { EMPTY_QUESTION } from "@/constants/states";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

 
interface Question {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; image: string };
  createdAt: Date;
  answers: number;
  upvotes: number;
  views: number;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

 
   const questions = (data?.question ?? []) as unknown as Question[];

  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-3xl text-center mt-5">Alle Vragen</h1>
        <Button className="primary-gradient min-h-10 px-4 py-3 text-light-900 rounded-md">
          <Link href={ROUTES.ASK_QUESTION}>Stel Een Vraag</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
         route="/"
          imgSrc="/assets/search.svg"
          placeholder="Zoek vragen..."
          otherClasses="flex-1"
          iconPosition="left" 
        />
      </section>

      <HomeFilter />

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Home;
