"use client"

import { withAuth } from "@/components/WithAuth";

/**
 * Fetch quiz by id from api
 * If this quiz isPublished is already true,
 * then throw an error and tunnel the user to /quiz/create
 * else populate QuizForm with the initialValues
 */
const Page = () => (
    // mb -2rem to account for the sticky bottom which has pb-8
    <div className="mb-[-2rem]">
        Edit
    </div>
)

export default withAuth(Page);
