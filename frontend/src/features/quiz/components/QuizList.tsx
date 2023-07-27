import { Quiz } from "@/types"
import { QuizListItem } from './QuizListItem'

type Props = {
    quizzes?: Quiz[]
}

/**
 * Renders draft quizzes or published quizzes
 * Only draft quizzes are able to be editted,
 * Published quizzes allow the user to copy the permalink url 
 * Both types can be deleted
 */
export const QuizList = ({ quizzes = [] }: Props) => {
    const handleQuizEdit = () => {

    }

    const handleQuizDelete = () => {

    }

    const handleCopyPermalinkUrl = () => {

    }

    return (
        <div className="flex flex-col max-w-screen-sm m-auto">
            {quizzes.map(quiz => <QuizListItem key={quiz.id} quiz={quiz} />)}
        </div>
    )
}
