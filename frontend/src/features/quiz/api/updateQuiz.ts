import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Quiz } from '@/types';

import {
    PUBLISHED_QUIZZES_QUERY_KEY,
    DRAFT_QUIZZES_QUERY_KEY,
} from './getQuizzes';

type UpdateQuizDTO = Quiz;

const updateQuiz = (
    formData: UpdateQuizDTO,
    quizId: string | undefined
): Promise<Quiz> => {
    if (!quizId) {
        throw new Error('Id needed.');
    }
    return axios.patch(`/quiz/${quizId}`, formData);
};

type useUpdateQuizOptions = {
    config?: MutationConfig<typeof updateQuiz>;
};

export const useUpdateQuiz = (
    quizId: string | undefined,
    { config }: useUpdateQuizOptions = {}
) =>
    useMutation({
        onSuccess: (updatedQuiz: Quiz) => {
            const { isPublished } = updatedQuiz;

            // manually update the query data for both draftQuizzes and publishedQuizzes
            // achieved by removing the quiz from either queryKey and then
            // depending on if this edited quiz was published or not
            // - if published, append into publishedQuizzes
            // - if not published, append into draftQuizzes
            // we only do this if we have both sets of query data
            const publishedQuizzes = queryClient.getQueryData<Quiz[]>([
                PUBLISHED_QUIZZES_QUERY_KEY,
            ]);
            const draftQuizzes = queryClient.getQueryData<Quiz[]>([
                DRAFT_QUIZZES_QUERY_KEY,
            ]);

            if (publishedQuizzes) {
                const filteredPublishedQuizzes = publishedQuizzes.filter(
                    (quiz) => quiz.id !== quizId
                );

                queryClient.setQueryData(
                    [PUBLISHED_QUIZZES_QUERY_KEY],
                    [
                        ...(isPublished ? [updatedQuiz] : []),
                        ...filteredPublishedQuizzes,
                    ]
                );
            }

            if (draftQuizzes) {
                const filteredDraftQuizzes = draftQuizzes.filter(
                    (quiz) => quiz.id !== quizId
                );

                queryClient.setQueryData(
                    [DRAFT_QUIZZES_QUERY_KEY],
                    [
                        ...(!isPublished ? [updatedQuiz] : []),
                        ...filteredDraftQuizzes,
                    ]
                );
            }

            // update the quiz, quizId query as well
            queryClient.setQueryData(['quiz', quizId], updatedQuiz);
        },
        ...config,
        mutationFn: (formData: UpdateQuizDTO) => updateQuiz(formData, quizId),
    });
