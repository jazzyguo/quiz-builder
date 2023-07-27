import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Quiz } from '@/types';

type CreateQuizDTO = Quiz;

const createQuiz = (formData: CreateQuizDTO): Promise<Quiz> => {
    return axios.post('/quiz', formData);
};

type useCreateQuizOptions = {
    config?: MutationConfig<typeof createQuiz>;
};

export const useCreateQuiz = ({ config }: useCreateQuizOptions = {}) => {
    return useMutation({
        onSuccess: (newQuiz) => {
            // depending on if the quiz was published or not, append shift it into the appropriate store
            const queryKey = [
                newQuiz.isPublished ? 'publishedQuizzes' : 'draftQuizzes',
            ];

            const previousQuizzes =
                queryClient.getQueryData<Quiz[]>(queryKey) || [];

            queryClient.setQueryData(queryKey, [newQuiz, ...previousQuizzes]);
        },
        ...config,
        mutationFn: createQuiz,
    });
};
