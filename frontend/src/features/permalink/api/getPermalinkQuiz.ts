import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Quiz } from '@/types';

const getPermalinkQuiz = (permalinkId: string): Promise<Quiz> => {
    return axios.get(`/permalink/${permalinkId}`);
};

type QueryFnType = typeof getPermalinkQuiz;

type usePermalinkOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const usePermalinkQuiz = (
    permalinkId: string,
    { config }: usePermalinkOptions = {}
) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['permalink', permalinkId],
        queryFn: () => getPermalinkQuiz(permalinkId),
    });
