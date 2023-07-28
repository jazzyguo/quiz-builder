import { memo } from "react"
import { useForm, useWatch } from "react-hook-form";
import { Quiz } from "@/types"
import { GetQuizResultsDTO } from "../api/submitQuizResults";
import { Checkbox, Button } from "@mui/material";

type Props = {
    quiz: Quiz
}

export const initialValue: GetQuizResultsDTO = {}

const helperText = {
    'single-answer': 'Please select one of the following',
    'multiple-answers': 'Please select all of the following that apply',
}

/**
 * Renders all question/answers. 
 * Depending on if the question rendered is of type single-answer or multiple-answers,
 * we will provide helper text to let the user know.
 * for single-answer questions, the user can only select one answer, the form will unselect their answer if they choose a new one
 * 
 * Form validation checks that the appropriate amount of answers is designated to each question type
 * 
 */
const _QuizTakerForm = ({ quiz }: Props) => {
    const { title, questions = [] } = quiz || {}

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<GetQuizResultsDTO>({
        defaultValues: initialValue,
    });

    const formValues = useWatch({
        control,
    });

    const handleCheckboxChange = (questionId: string, answerId: string) => {
        const selectedAnswerIds = formValues[questionId] || []

        const isChecked = selectedAnswerIds.includes(answerId)

        let updatedAnswerIds = [...selectedAnswerIds]

        if (isChecked) {
            updatedAnswerIds = selectedAnswerIds.filter((id) => id !== answerId);
        } else {
            updatedAnswerIds = [...selectedAnswerIds, answerId];
        }

        setValue(questionId, updatedAnswerIds);
    };

    const onSubmit = (formData: GetQuizResultsDTO) => {
        console.log({ formData })
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-center mb-10">{title}</h2>
            {questions.map(({ id: questionId, text, type, answers = [] }) => questionId && (
                <div
                    key={questionId}
                    className="question-container"
                >
                    <h3 className="font-bold mt-0 mb-2">
                        {text}
                    </h3>
                    {type &&
                        <p className="mb-2.5 text-xs text-blue">
                            {helperText[type]}
                        </p>
                    }
                    {answers.map(({ id: answerId, text: answerText }) => {
                        const isChecked = !!(answerId && (formValues[questionId] || []).includes(answerId))
                        return (
                            answerId && (
                                <div
                                    key={answerId}
                                    className="question-container_answer cursor-pointer w-max hover:opacity-50"
                                    onClick={(e) =>
                                        handleCheckboxChange(questionId, answerId)
                                    }>
                                    <Checkbox
                                        checked={isChecked}
                                    />
                                    <div>{answerText}</div>
                                </div>
                            )
                        )
                    })}
                </div>
            ))}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginLeft: 'auto' }}
            >
                Submit
            </Button>
        </form>
    )
}

export const QuizTakerForm = memo(_QuizTakerForm)
