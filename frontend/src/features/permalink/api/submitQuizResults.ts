import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";

import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { QuizResults } from '@/types';

type SelectedAnswerIds = string[];

export type GetQuizResultsDTO = {
    [questionId: string]: SelectedAnswerIds | undefined;
};

const submitQuizResults = (
    formData: GetQuizResultsDTO,
    permalinkId: string | undefined
): Promise<QuizResults> => {
    if (!permalinkId) {
        throw new Error('Invalid permalinkId');
    }
    return axios.post(`/permalink/${permalinkId}`, formData);
};

type useSubmitQuizResultsOptions = {
    config?: MutationConfig<typeof submitQuizResults>;
    permalinkId?: string;
};

// storing this data in local storage
export const useSubmitQuizResults = ({
    config,
    permalinkId,
}: useSubmitQuizResultsOptions = {}) => {
    const router = useRouter()
    const queryKey = `quiz-results-${permalinkId}`;
    return useMutation({
        ...config,
        onSuccess: (quizResults: QuizResults) => {
            localStorage.setItem(queryKey, JSON.stringify(quizResults));
            router.push(`/permalink/results/${permalinkId}`)
        },
        onMutate: () => {
            localStorage.removeItem(queryKey);
        },
        mutationFn: (formData: GetQuizResultsDTO) =>
            submitQuizResults(formData, permalinkId),
    });
};
