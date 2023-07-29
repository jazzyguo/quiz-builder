"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { HOME_URL, MAX_QUESTIONS, MAX_ANSWERS } from "@/config";

const IndexPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (user.uid) {
    router.push(HOME_URL);
    return null;
  }

  return (
    <div className="text-center max-w-sm mt-8 m-auto">
      <p>Quiz builder allows you to create and save quizzes.</p>
      <p>You can have up to {MAX_QUESTIONS} questions with {MAX_ANSWERS} answers each, with the ability to mark one or multiple answers as correct.</p>
      <p>The quiz can be saved as a draft to be edited later, or published so that you can generate a unique share url to let others take your quiz.</p>
    </div>
  )
}

export default IndexPage

