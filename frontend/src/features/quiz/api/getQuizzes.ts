import { QueryKey, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Quiz } from '@/types';

const getQuizzes = (isPublished = false): Promise<Quiz[]> => {
    return axios.get('/quiz/all', {
        params: {
            isPublished,
        },
    });
};

type QueryFnType = typeof getQuizzes;

type useQuizzesOptions = {
    config?: QueryConfig<QueryFnType>;
    isPublished?: boolean;
};

export const PUBLISHED_QUIZZES_QUERY_KEY = 'publishedQuizzes';
export const DRAFT_QUIZZES_QUERY_KEY = 'draftQuizzes';

export const useQuizzes = ({ config, isPublished }: useQuizzesOptions = {}) => {
    const queryKey: QueryKey = [
        isPublished ? PUBLISHED_QUIZZES_QUERY_KEY : DRAFT_QUIZZES_QUERY_KEY,
    ];
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey,
        queryFn: () => getQuizzes(isPublished),
    });
};
