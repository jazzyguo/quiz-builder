"use client"

import { withAuth } from "@/components/WithAuth";

import { PublishedQuizzesPage } from "@/features/quiz";

const Page = () => (
    <PublishedQuizzesPage />
)

export default withAuth(Page);
