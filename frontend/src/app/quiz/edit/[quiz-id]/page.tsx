"use client"

import { withAuth } from "@/components/WithAuth";

/**
 * Fetch quiz by id from api
 * If this quiz isPublished is already true,
 * then throw an error and tunnel the user to /quiz/create
 * else populate QuizForm with the initialValues
 */
const Page = () => (
    <div className="page-container">
        Edit
    </div>
)

export default withAuth(Page);
