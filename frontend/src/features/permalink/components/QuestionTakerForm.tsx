import { memo, useCallback, useMemo } from "react"
import { FieldError, UseFormRegister } from "react-hook-form";
import { Question } from "@/types"
import { GetQuizResultsDTO } from "../api/submitQuizResults";
import { Checkbox } from "@mui/material";

type Props = {
    question: Question;
    formValues: GetQuizResultsDTO;
    handleCheckboxChange: (questionId: string, answerId: string) => void;
    errors: { [questionId: string]: { [answerId: string]: FieldError } } | any;
    register: UseFormRegister<GetQuizResultsDTO>
}

export const initialValue: GetQuizResultsDTO = {}

const helperText = {
    'single-answer': 'Please select one of the following',
    'multiple-answers': 'Please select all of the following that apply',
}

const _QuestionTakerForm = ({ question, formValues, handleCheckboxChange, errors, register }: Props) => {
    const { id: questionId, text, type, answers = [] } = question

    const answersLength = formValues[questionId || '']?.length ?? 0

    // check that depending on the question typ e, we have at least one or more answers.
    const validateAnswers = useCallback(() => {
        if (answersLength === 0) {
            return 'At least one answer is required'
        }

        switch (type) {
            case 'single-answer':
                if (answersLength > 1) {
                    return 'Only one answer is allowed'
                }
        }

        return undefined
    }, [answersLength])

    // pulls the error message from one of the nested answers if exists
    const errorMessage = questionId &&
        answers[0]?.id && Object.keys(errors[questionId] || {}).length &&
        errors[questionId][answers[0].id]?.message

    return questionId && (
        <div
            className={`question-container ${errorMessage && 'question-container--error'}`}
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
                const isChecked = useMemo(() =>
                    !!(answerId && (formValues[questionId] || []).includes(answerId)),
                    [answersLength]
                )
                return (
                    answerId && (
                        <div
                            key={answerId}
                            className="question-container_answer cursor-pointer w-max hover:opacity-70"
                            onClick={() =>
                                handleCheckboxChange(questionId, answerId)
                            }>
                            <Checkbox
                                {...register(
                                    `${questionId}.${answerId}`,
                                    { validate: validateAnswers }
                                )}
                                checked={isChecked}
                            />
                            <div>{answerText}</div>
                        </div>
                    )
                )
            })}
            {!!errorMessage &&
                <div className="text-xs text-red-500">
                    {errorMessage}
                </div>
            }
        </div>
    )
}

export const QuestionTakerForm = memo(_QuestionTakerForm)
