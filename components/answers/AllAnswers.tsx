import { EMPTY_ANSWERS } from "@/constants/states";
import DataRenderer from "@/components/DataRenderer";
import AnswerCard from "../card/AnswerCard";
import Pagination from "../Pagination";

import { Answer } from "@/database";

type Props = {
  page: number;
  isNext: boolean;
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: Answer[] | null | undefined;
  totalAnswers: number;
};

const AllAnswers = ({
  data,
  page,
  isNext,
  success,
  error,
  totalAnswers,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Antwoord" : "Antwoorden"}
        </h3>
        <p>Filters</p>
      </div>

      <DataRenderer
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />

      <Pagination page={page} isNext={isNext} />
    </div>
  );
};

export default AllAnswers;
