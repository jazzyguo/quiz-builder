"use client"

import { NextPage } from 'next';
import { QuizResultPage } from '@/features/permalink'

interface PageParams {
    permalinkId: string;
}

const Page: NextPage<{ params: PageParams }> = ({ params }) => {
    const { permalinkId } = params
    return <QuizResultPage permalinkId={permalinkId} />
}

export default Page;

