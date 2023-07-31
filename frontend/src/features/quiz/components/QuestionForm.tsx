import { memo, useCallback, useMemo } from 'react'
import { Control, useFieldArray, useWatch, Merge, FieldError, FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import {
    TextField,
    Checkbox,
    Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { MAX_ANSWERS } from "@/config";
import { Answer, Question, Quiz } from '@/types';

type Props = {
    questions: Question[];
    questionIndex: number;
    handleDelete?: (index: number) => void;
    errors: Merge<FieldError, FieldErrorsImpl<Question & { answers: Answer[] }>>;
    control: Control<Quiz, object>;
    register: UseFormRegister<Quiz>;
}

const _QuestionForm = ({
    questions,
    questionIndex,
    handleDelete = () => { },
    errors,
    control,
    register,
}: Props) => {
    const canDeleteQuestions = questions.length > 1

    const answerFieldName: `questions.${number}.answers` = `questions.${questionIndex}.answers`

    const {
        fields: answerFields,
        append: addAnswer,
        remove: removeAnswer,
    } = useFieldArray({
        control,
        name: answerFieldName,
    });

    const answers = useWatch({
        control,
        name: answerFieldName,
    }) || []

    const canAddMoreAnswers = answers.length < MAX_ANSWERS
    const canDeleteAnswers = answers.length > 1

    const handleAddAnswer = useCallback((): void => {
        if (answers.length < MAX_ANSWERS) {
            addAnswer({ text: "", isCorrect: false });
        }
    }, [answers]);

    const handleDeleteAnswer = (answerIndex: number): void => {
        removeAnswer(answerIndex)
    };

    const validateAtLeastOneAnswerIsCorrect = useMemo(
        () => !!answers.some((answer) => answer.isCorrect) ? undefined : 'At least one answer is required',
        [answers]
    );

    // checks that form error for above validation exists
    const atLeastOneAnswerIsCorrectError: FieldError | undefined = (
        // @ts-ignore
        (errors?.answers || []).find((answerError) =>
            answerError?.isCorrect
        )?.isCorrect
    )

    return (
        <div
            className={`
                question-container
                ${canDeleteQuestions && 'question-container--canDelete'}
                ${atLeastOneAnswerIsCorrectError && 'question-container--error'}
            `}
        >
            {canDeleteQuestions &&
                <CloseIcon
                    sx={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        "&:hover": {
                            opacity: 0.5,
                            cursor: "pointer",
                        },
                    }}
                    onClick={() => handleDelete(questionIndex)}
                    data-testid="delete-question"
                />
            }
            <TextField
                {...register(
                    `questions.${questionIndex}.text`,
                    { required: 'Question is required' }
                )}
                label={`Question ${questionIndex + 1}`}
                required
                fullWidth
                sx={{ marginBottom: '1rem' }}
                error={!!errors?.text}
                helperText={errors?.text?.message}
            />
            {answerFields.map((answer, answerIndex) => (
                <div
                    key={answer.id}
                    className="question-container_answer"
                >
                    <Checkbox
                        color="primary"
                        checked={answers[answerIndex]?.isCorrect}
                        {...register(
                            `${answerFieldName}.${answerIndex}.isCorrect`,
                            { validate: () => validateAtLeastOneAnswerIsCorrect }
                        )}
                    />
                    <TextField
                        {...register(
                            `${answerFieldName}.${answerIndex}.text`,
                            { required: 'Answer is required.' }
                        )}
                        label={`Answer ${answerIndex + 1}`}
                        required
                        fullWidth
                        error={!!errors?.answers?.[answerIndex]?.text}
                        helperText={errors?.answers?.[answerIndex]?.text?.message}
                    />
                    {canDeleteAnswers &&
                        <CloseIcon
                            sx={{
                                marginLeft: '.5rem',
                                "&:hover": {
                                    opacity: 0.5,
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => handleDeleteAnswer(answerIndex)}
                            data-testid="delete-answer"
                        />
                    }
                </div>
            ))}
            {/* Error messaging for at least one answer isCorrect required */}
            {atLeastOneAnswerIsCorrectError &&
                <div className="text-xs text-red-500 mb-4">
                    {atLeastOneAnswerIsCorrectError.message}
                </div>
            }
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddAnswer}
                disabled={!canAddMoreAnswers}
            >
                Add Answer
            </Button>
        </div>
    )
}

export const QuestionForm = memo(_QuestionForm)
