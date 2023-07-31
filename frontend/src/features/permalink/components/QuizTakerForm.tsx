import { memo, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form";
import { Question, Quiz } from "@/types"
import { GetQuizResultsDTO } from "../api/submitQuizResults";
import { Button } from "@mui/material";
import { QuestionTakerForm } from "./QuestionTakerForm";

type Props = {
    quiz: Quiz;
    handleSubmitQuizResults?: (formData: GetQuizResultsDTO) => void;
}

export const initialValue: GetQuizResultsDTO = {}

/**
 * Renders all question/answers. 
 * Depending on if the question rendered is of type single-answer or multiple-answers,
 * we will provide helper text to let the user know.
 * 
 * Form validation checks that the appropriate amount of answers is designated to each question type
 */
const _QuizTakerForm = ({ quiz, handleSubmitQuizResults = () => { } }: Props) => {
    const { title, questions = [], permalinkId } = quiz || {}

    const initialValue = useMemo(() =>
        questions.reduce((acc: {
            [questionId: string]: string[]
        }, question: Question) => {
            if (question.id) {
                acc[question.id] = []
            }
            return acc
        }, {})
        , [questions])

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        control,
    } = useForm<GetQuizResultsDTO>({
        defaultValues: initialValue,
    });

    const formValues = useWatch({
        control,
    });

    const handleCheckboxChange = (questionId: string, answerId: string, questionIndex: number) => {
        const selectedAnswerIds = formValues[questionId] || []

        const isValidAnswerId = !!questions[questionIndex].answers?.find(answer => answer.id === answerId)

        // check that answerId is a valid id
        if (isValidAnswerId) {
            const isChecked = selectedAnswerIds.includes(answerId)

            let updatedAnswerIds = [...selectedAnswerIds]

            if (isChecked) {
                updatedAnswerIds = selectedAnswerIds.filter((id) => id !== answerId);
            } else {
                updatedAnswerIds = [...selectedAnswerIds, answerId];
            }

            setValue(questionId, updatedAnswerIds);
        }
    };

    const onSubmit = async (formData: GetQuizResultsDTO) => {
        if (permalinkId) {
            await handleSubmitQuizResults(formData)
        }
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-center mb-10">{title}</h2>
            {questions.map((question, questionIndex) =>
                <QuestionTakerForm
                    key={question.id}
                    question={question}
                    formValues={formValues}
                    handleCheckboxChange={
                        (questionId, answerId) =>
                            handleCheckboxChange(questionId, answerId, questionIndex)
                    }
                    errors={errors}
                    register={register}
                />
            )}
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
