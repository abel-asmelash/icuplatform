"use client";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/card/QuestionCard";

 
const questions = [
  {
    _id: "1",
    title: "Hoe can ik de bijble studeren?",
    tags: [
      { _id: "t1", name: "bijbel" },
      { _id: "t2", name: "greek vertaling" },
    ],
    author: { _id: "u1", name: "Abel", image: "/assets/avatar.png" },
    upvotes: 12,
    views: 150,
    answers: 3,
    createdAt: new Date("2025-05-01"),
  },
  {
    _id: "2",
    title: "Wat is het verschil tussen de niuewe en oude testament?",
    tags: [
      { _id: "t3", name: "testaments" },
      { _id: "t4", name: "apostles" },
    ],
    author: { _id: "u2", name: "Sara", image: "/assets/avatar.png" },
    upvotes: 8,
    views: 90,
    answers: 2,
    createdAt: new Date("2025-05-10"),
  },
];

const Home = () => {
  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-3xl text-center mt-5">Alle Vragen</h1>
        <Button className="primary-gradient min-h-[40px] px-4 py-3 !text-light-900 rounded-md">
          <Link href={ROUTES.ASK_QUESTION}>Stel een vraag</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          imgSrc="/assets/icons/search.svg"
          placeholder="Zoek vragen..."
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <p className="text-center text-light-500">Geen vragen gevonden.</p>
        )}
      </div>
    </>
  );
};

export default Home;
