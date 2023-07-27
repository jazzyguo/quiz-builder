import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Quiz } from '@/types';

const getQuiz = (quizId: string): Promise<Quiz> => {
    return axios.get(`/quiz/${quizId}`);
};

type QueryFnType = typeof getQuiz;

type useQuizOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useQuiz = (quizId: string, { config }: useQuizOptions = {}) =>
    useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['quiz', quizId],
        queryFn: () => getQuiz(quizId),
    });
