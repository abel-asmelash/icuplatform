import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import QuestionCard from "@/components/card/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_QUESTION } from "@/constants/states";
import { getSavedQuestions } from "@/lib/action/collection.action";
import { auth } from "@/auth";
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Collection = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const session = await auth();
  const userId = session?.user?.id;
  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { collection } = data || {};

  return (
    <>
      <h1 className="h1-bold text-3xl text-center mt-5">Opgeslagen Vragen</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COLLECTION}
          imgSrc="/assets/search.svg"
          placeholder="Zoek vragen..."
          otherClasses="flex-1"
          iconPosition="left"
        />
      </div>

      {/* <HomeFilter /> */}

      <DataRenderer
        success={success}
        error={error}
        data={collection}
        empty={EMPTY_QUESTION}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item) => (
              <QuestionCard
                key={item._id}
                question={item.question}
                currentUserId={userId}
              />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Collection;
