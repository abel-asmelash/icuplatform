import type { RouteParams } from "@/app/types/global";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params; // 👈 await params

  return <div>Question Page: {id}</div>;
};

export default QuestionDetails;
