"use client"

import { NextPage } from 'next';
import { PermalinkPage } from '@/features/permalink'

interface PageParams {
    permalinkId: string;
}

const Page: NextPage<{ params: PageParams }> = ({ params }) => {
    const { permalinkId } = params
    return <PermalinkPage permalinkId={permalinkId} />
}

export default Page;

