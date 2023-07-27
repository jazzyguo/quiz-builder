import { memo, useCallback, useMemo } from 'react'
import { Control, useFieldArray, useWatch, Merge, FieldError, FieldErrorsImpl } from "react-hook-form";
import {
    TextField,
    Checkbox,
    Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { MAX_ANSWERS } from "@/config";
import { Question, Quiz } from '@/types';

type Props = {
    questions: Question[];
    questionIndex: number;
    handleDelete: (index: number) => void;
    errors: Merge<FieldError, FieldErrorsImpl<Question>>;
    control: Control<Quiz, object>;
    register: any;
}

const _Question = ({
    questions,
    questionIndex,
    handleDelete,
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
                bg-secondary 
                mb-6 
                p-6 
                rounded-lg 
                relative 
                ${canDeleteQuestions && 'pt-14'}
                ${atLeastOneAnswerIsCorrectError
                    ? 'border border-solid border-red-500'
                    : 'border-box'
                }
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
                    className="flex mb-4 items-center"
                >
                    <Checkbox
                        color="primary"
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

export const Question = memo(_Question)
