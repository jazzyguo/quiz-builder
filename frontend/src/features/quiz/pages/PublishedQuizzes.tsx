import { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Tabs, Tab } from "@mui/material"
import { QuizList } from "../components/QuizList"
import { useQuizzes } from "../api/getQuizzes"

export const PublishedQuizzesPage = () => {
    const router = useRouter()

    const { data, isLoading } = useQuizzes({ isPublished: true })

    const handleTabSwitch = (event: SyntheticEvent, tab: number) => {
        if (tab === 1) {
            router.push("/quiz/drafts");
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <div className="tab-group">
                <Tabs
                    value={0}
                    onChange={handleTabSwitch}
                >
                    <Tab label="Published" />
                    <Tab label="Drafts" />
                </Tabs>
            </div>
            <QuizList quizzes={data} />
        </div>
    )
}

