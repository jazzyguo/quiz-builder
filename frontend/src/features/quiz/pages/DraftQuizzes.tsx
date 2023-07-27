import { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Tabs, Tab } from "@mui/material"
import { QuizList } from "../components/QuizList"
import { useQuizzes } from "../api/getQuizzes"

export const DraftQuizzesPage = () => {
    const router = useRouter()

    const { data, isLoading } = useQuizzes()

    const handleTabSwitch = (event: SyntheticEvent, tab: number) => {
        if (tab === 0) {
            router.push("/quiz/published");
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
                    value={1}
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

