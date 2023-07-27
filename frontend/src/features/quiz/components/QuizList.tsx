import { Quiz } from "@/types"

type Props = {
    quizzes?: Quiz[]
}

export const QuizList = ({ quizzes = [] }: Props) => {
    console.log({ quizzes })
    return <div></div>
}
