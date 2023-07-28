import { CircularProgress } from "@mui/material"
import { usePermalinkQuiz } from "../api/getPermalinkQuiz"
import { QuizTakerForm } from "../components/QuizTakerForm"
import { useSubmitQuizResults } from "../api/submitQuizResults";
import { FullScreenLoading } from "@/components/FullScreenLoading";

type Props = {
    permalinkId: string
}

export const PermalinkPage = ({ permalinkId }: Props) => {
    const { data, isLoading, error } = usePermalinkQuiz(permalinkId);

    const {
        mutate: submitQuizResults,
        isLoading: submitLoading,
    } = useSubmitQuizResults({ permalinkId })

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
        <>
            {submitLoading &&
                <FullScreenLoading />
            }
            <QuizTakerForm
                quiz={data}
                handleSubmitQuizResults={submitQuizResults}
            />
        </>
    )
}

