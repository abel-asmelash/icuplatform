import Link from "next/link";
import ROUTES from "@/constants/routes";

const TagNotFound = () => {
  return (
    <div className="flex-center mt-20 w-full flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900 text-3xl">
        Tag niet gevonden
      </h1>
      <p className="paragraph-regular text-dark400_light700 max-w-md text-center">
        Deze tag bestaat niet (meer). Mogelijk is hij verwijderd of is de link
        onjuist.
      </p>
      <Link
        href={ROUTES.TAGS ? "/tags" : "/tags"}
        className="primary-gradient rounded-lg px-6 py-3 text-white"
      >
        Bekijk alle tags
      </Link>
    </div>
  );
};

export default TagNotFound;
