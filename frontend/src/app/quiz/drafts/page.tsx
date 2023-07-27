"use client"

import { withAuth } from "@/components/WithAuth";

import { DraftQuizzesPage } from "@/features/quiz";

const Page = () => (
    <DraftQuizzesPage />
)

export default withAuth(Page);
