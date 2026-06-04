import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getTechBibleClassName } from "@/lib/utils";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount }: TagCardProps) => {
  const iconClass = getTechBibleClassName(name);

  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className="flex items-center justify-between gap-3 mb-4"
    >
      <div className="flex items-center gap-2">
        <i className={`fa-solid ${iconClass} text-primary-500 text-sm`} />
        <p className="body-medium text-dark500_light700">{name}</p>
      </div>
      {showCount && (
        <p className="small-medium text-primary-500">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
