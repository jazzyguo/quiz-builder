import { memo } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Quiz, Question } from "@/types"
import { GetQuizResultsDTO } from "../api/submitQuizResults";
import { Checkbox } from "@mui/material";

type Props = {
    quiz: Quiz
}

export const initialValue: GetQuizResultsDTO = {
    answers: []
}

const _QuizTakerForm = ({ quiz }: Props) => {
    const { title, questions = [] } = quiz || {}

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<GetQuizResultsDTO>({
        defaultValues: initialValue,
    });

    return (
        <div>
            <h2 className="text-center mb-8">{title}</h2>
            {questions.map((question, questionIndex) => {
                const { text, type, answers = [] } = question
                console.log({ question })
                return (
                    <div className="question-container">
                        <div className="font-bold mb-6 text-lg">{text}</div>
                        {answers.map(answer => (
                            <div className="question-container_answer">
                                <Checkbox
                                // color="primary"
                                // checked={answers[answerIndex]?.isCorrect}
                                // {...register(
                                //     `${answerFieldName}.${answerIndex}.isCorrect`,
                                //     { validate: () => validateAtLeastOneAnswerIsCorrect }
                                // )}
                                />
                                <div>{answer.text}</div>
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

export const QuizTakerForm = memo(_QuizTakerForm)
