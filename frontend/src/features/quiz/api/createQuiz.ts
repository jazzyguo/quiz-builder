import { QueryKey, useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Quiz } from '@/types';

import {
    PUBLISHED_QUIZZES_QUERY_KEY,
    DRAFT_QUIZZES_QUERY_KEY,
} from './getQuizzes';

type CreateQuizDTO = Quiz;

const createQuiz = (formData: CreateQuizDTO): Promise<Quiz> => {
    return axios.post('/quiz', formData);
};

type useCreateQuizOptions = {
    config?: MutationConfig<typeof createQuiz>;
};

export const useCreateQuiz = ({ config }: useCreateQuizOptions = {}) =>
    useMutation({
        ...config,
        onSuccess: (newQuiz) => {
            // depending on if the quiz was published or not, add it into the appropriate store at the first index
            // only do this if we already have fetched the lists because otherwise we could run into the issue
            // of having only [newQuiz] if the lists were never fetched, making it hard to invalidate w/o page refresh
            const queryKey: QueryKey = [
                newQuiz.isPublished
                    ? PUBLISHED_QUIZZES_QUERY_KEY
                    : DRAFT_QUIZZES_QUERY_KEY,
            ];

            const previousQuizzes = queryClient.getQueryData<Quiz[]>(queryKey);

            if (previousQuizzes) {
                queryClient.setQueryData(queryKey, [
                    newQuiz,
                    ...previousQuizzes,
                ]);
            }
        },
        mutationFn: createQuiz,
    });
