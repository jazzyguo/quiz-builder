"use client"

import { withAuth } from "@/components/WithAuth";
import { CreateQuizPage } from "@/features/quiz";

const Page = () => (
    // mb -2rem to account for the sticky bottom which has pb-8
    <div className="mb-[-2rem]"> 
        <h1 className="text-center mt-0">Create Quiz</h1>
        <CreateQuizPage />
    </div>
)

export default withAuth(Page);
