"use client"

import { withAuth } from "@/components/WithAuth";
import { CreateQuizPage } from "@/features/quiz";

const Page = () => (
    <div className="page-container">
        <h1 className="text-center mt-0">Create Quiz</h1>
        <CreateQuizPage />
    </div>
)

export default withAuth(Page);
