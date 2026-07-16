import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getQuestion } from "@/lib/action/question.action";
import ROUTES from "@/constants/routes";  
import { RouteParams } from "@/types/actions";

 
const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;  

  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/sign-in");

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success || !question) return notFound();

  console.log("author id:", question.author._id.toString());
  console.log("session user id:", session.user?.id); 

  if (question?.author._id.toString() !== session?.user?.id)
   return redirect(ROUTES.QUESTION(id));

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">Vraag bewerken</h1>
      <div>
        <QuestionForm question={question} isEdit />
      </div>
    </main>
  );
};

export default EditQuestion;
