import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getTechBibleClassName } from "@/lib/utils";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  remove,
  isButton,
  handleRemove,
}: TagCardProps) => {
  const iconClass = getTechBibleClassName(name);

  const Content = (
    <span className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
      <div className="flex-center space-x-2">
        <i className={`fa-solid ${iconClass} text-sm`} aria-hidden="true" />
        <span>{name}</span>

        {remove && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-light-500 hover:text-primary-500 ml-1 cursor-pointer"
            aria-label={`Remove ${name} tag`}
          >
            ✕
          </button>
        )}
      </div>

      {showCount && questions !== undefined && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </span>
  );

   

  if (isButton) {
    return <div className="flex items-center gap-2">{Content}</div>;
  }

  return (
    <Link
      href={ROUTES.TAG(_id)}
      className="flex items-center justify-between gap-3"
    >
      {Content}
    </Link>
  );
};

export default TagCard;
