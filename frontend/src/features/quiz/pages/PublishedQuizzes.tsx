import { QuizList } from "../components/QuizList"
import { useQuizzes } from "../api/getQuizzes"

export const PublishedQuizzesPage = () => {
    const { data, isLoading } = useQuizzes({ isPublished: true })

    console.log({ data, isLoading })

    return <QuizList />
}

