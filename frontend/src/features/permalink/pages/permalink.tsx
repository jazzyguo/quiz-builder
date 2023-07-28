import { CircularProgress } from "@mui/material"
import { usePermalinkQuiz } from "../api/getPermalinkQuiz"
import { QuizTakerForm } from "../components/QuizTakerForm"

type Props = {
    permalinkId: string
}

export const PermalinkPage = ({ permalinkId }: Props) => {
    const { data, isLoading, error } = usePermalinkQuiz(permalinkId);

    if (isLoading) {
        return (
            <div className="loading-container">
                <CircularProgress />
            </div>
        )
    }

    if (error || !data) {
        throw error
    }

    return (
        <QuizTakerForm quiz={data} />
    )
}

