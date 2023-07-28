import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import {
    PUBLISHED_QUIZZES_QUERY_KEY,
    DRAFT_QUIZZES_QUERY_KEY,
} from './getQuizzes';
import { Quiz } from '@/types';

type DeleteQuizDTO = {
    quizId: string;
    isPublished: boolean;
};

const deleteQuiz = async ({ quizId }: DeleteQuizDTO): Promise<boolean> => {
    await axios.delete(`/quiz/${quizId}`);
    return true;
};

type useDeleteQuizOptions = {
    config?: MutationConfig<typeof deleteQuiz>;
};

export const useDeleteQuiz = ({ config }: useDeleteQuizOptions = {}) =>
    useMutation({
        ...config,
        onSuccess: (
            isDeleted: boolean,
            { quizId, isPublished }: DeleteQuizDTO
        ) => {
            // depending on published/draft state of deleted quiz
            // remove it from the associated store
            if (isDeleted) {
                const queryKey = [
                    isPublished
                        ? PUBLISHED_QUIZZES_QUERY_KEY
                        : DRAFT_QUIZZES_QUERY_KEY,
                ];

                const previousData = queryClient.getQueryData<Quiz[]>(queryKey);

                if (previousData) {
                    const updatedData = previousData.filter(
                        (quiz) => quiz.id !== quizId
                    );
                    queryClient.setQueryData(queryKey, updatedData);
                }
            }
        },
        mutationFn: deleteQuiz,
    });
