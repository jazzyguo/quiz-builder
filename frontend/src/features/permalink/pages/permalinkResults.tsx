import { QuizResults } from "@/types";
import { QuizResultsSummary } from "../components/QuizResultsSummary";
import { useSubmitQuizResults } from "../api/submitQuizResults";

type Props = {
    permalinkId: string
}

export const QuizResultPage = ({ permalinkId }: Props) => {
    const quizResultsLocalStorage = localStorage.getItem(`quiz-results-${permalinkId}`);

    const { data } = useSubmitQuizResults({ permalinkId })

    const quizResults: QuizResults = quizResultsLocalStorage
        ? JSON.parse(quizResultsLocalStorage)
        : data

    if (!quizResults) {
        throw new Error('There are no results for this quiz, or the quiz does not exist')
    }

    return <QuizResultsSummary quizResults={quizResults} permalinkId={permalinkId} />
}

