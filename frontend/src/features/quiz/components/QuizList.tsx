import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Quiz } from "@/types"
import { QuizListItem } from './QuizListItem'
import { useDeleteQuiz } from '../api/deleteQuiz'

type Props = {
    quizzes?: Quiz[]
}

/**
 * Renders draft quizzes or published quizzes
 * Only draft quizzes are able to be editted,
 * Published quizzes allow the user to copy the permalink url 
 * Both types can be deleted
 */
const _QuizList = ({ quizzes = [] }: Props) => {
    const router = useRouter()

    const { mutate: deleteQuiz } = useDeleteQuiz()

    const handleQuizEdit = useCallback((quizId: string) => {
        router.push(`/quiz/edit/${quizId}`)
    }, [])

    const handleQuizDelete = useCallback((quizId: string, isPublished: boolean) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this quiz?");
        if (shouldDelete) {
            deleteQuiz({ quizId, isPublished });
        }
    }, [])

    return (
        <div className="flex flex-col max-w-screen-sm m-auto">
            {quizzes.map(quiz =>
                <QuizListItem
                    key={quiz.id}
                    quiz={quiz}
                    handleEdit={handleQuizEdit}
                    handleDelete={handleQuizDelete}
                />
            )}
        </div>
    )
}

export const QuizList = memo(_QuizList)
