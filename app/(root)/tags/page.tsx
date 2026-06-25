import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import TagPageCard from "@/components/card/TagPageCard";    
import { getTags } from "@/lib/action/tag.action";

interface SearchParams {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    query?: string;
    filter?: string;
  }>;
}

const Tags = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  if (!success || !data) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const { tags } = data;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11">
        <LocalSearch
          route="/tags"
          imgSrc="/assets/search.svg"
          placeholder="Search tags"
          otherClasses="flex-1"
          iconPosition="left"
        />
      </section>

      <div className="mt-10 flex w-full flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagPageCard
              key={tag._id.toString()}
              _id={tag._id.toString()}
              name={tag.name}
              questions={tag.questions}
            />
          ))
        ) : (
          <p className="text-dark400_light700 paragraph-regular mx-auto max-w-4xl text-center">
            No tags found
          </p>
        )}
      </div>
    </>
  );
};

export default Tags;
