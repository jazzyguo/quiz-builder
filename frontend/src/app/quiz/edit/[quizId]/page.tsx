"use client"

import { NextPage } from 'next';
import { withAuth } from "@/components/WithAuth";
import { EditQuizPage } from "@/features/quiz";

interface PageParams {
    quizId: string;
}


const Page: NextPage<{ params: PageParams }> = ({ params }) => {
    const { quizId } = params
    return (
        // mb -2rem to account for the sticky bottom which has pb-8
        <div className="mb-[-2rem]">
            <h1 className="text-center mt-0">Edit Quiz</h1>
            <EditQuizPage quizId={quizId} />
        </div>
    )
}


export default withAuth(Page);
