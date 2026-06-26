import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getTechBibleInfo } from "@/lib/utils";  
interface TagPageCardProps {
  _id: string;
  name: string;
  questions?: number;
  description?: string;
}

const TagPageCard = ({
  _id,
  name,
  questions = 0,
  description,
}: TagPageCardProps) => {
  const { icon, color } = getTechBibleInfo(name);

  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="flex items-center justify-between gap-3">
          <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
            <p className="paragraph-semibold text-dark300_light900">{name}</p>
          </div>
          <div
            className={`${color} flex size-8 items-center justify-center rounded-sm`}
          >
            <i className={`fa-solid ${icon} text-sm text-white`} />
          </div>
        </div>

        <p className="small-medium text-dark400_light500 mt-5 line-clamp-3">
          {description || "A topic related to biblical studies and theology."}
        </p>

        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagPageCard;
