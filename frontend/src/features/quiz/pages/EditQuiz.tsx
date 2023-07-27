import { CircularProgress } from "@mui/material"
import { QuizForm } from "../components/QuizForm"
import { useQuiz } from "../api/getQuizById"

/**
 * Fetch quiz by id from api
 * If this quiz isPublished is already true,
 * then throw an error and tunnel the user to /quiz/create
 * else populate QuizForm with the initialValues
 */
type Props = {
    quizId: string
}

export const EditQuizPage = ({ quizId }: Props) => {
    const { data, isLoading, error } = useQuiz(quizId);

    if (isLoading) {
        return (
            <div className="loading-container">
                <CircularProgress />
            </div>
        )
    }

    if (error) {
        throw error
    }

    return (
        <QuizForm initialValue={data} />
    )
}

