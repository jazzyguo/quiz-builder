import { QuizResults } from "@/types";
import Link from "next/link";
import { Button } from "@mui/material";

type Props = {
    permalinkId: string;
    quizResults: QuizResults;
}

export const QuizResultsSummary = ({ quizResults, permalinkId }: Props) => {
    const { totalCorrect, questions } = quizResults
    const scorePercentage = Math.ceil((totalCorrect / (questions.length)) * 100)

    let textColor = "";

    if (scorePercentage >= 90) {
        textColor = "text-green-500";
    } else if (scorePercentage >= 70) {
        textColor = "text-blue-500";
    } else if (scorePercentage >= 50) {
        textColor = "text-yellow-500";
    } else {
        textColor = "text-red-500";
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className={textColor}>{scorePercentage}%</h2>
            You have achieved {totalCorrect} / {questions.length} correct questions.
            <Link
                className="mt-8"
                href={`/permalink/${permalinkId}`}
            >
                <Button variant="contained">
                    Retake the quiz
                </Button>
            </Link>
        </div >
    )
}

