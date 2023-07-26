import { memo } from 'react'
import { Control, useFieldArray, FieldErrors, useWatch } from "react-hook-form";
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
    errors: FieldErrors<Quiz>;
    control: Control<Quiz, object>;
    register: any;
}

const Question = ({
    questions,
    questionIndex,
    handleDelete,
    errors,
    control,
    register,
}: Props) => {
    const canDeleteQuestions = questions.length > 1

    const {
        fields: answerFields,
        append: addAnswer,
        remove: removeAnswer,
        update: updateAnswer,
    } = useFieldArray({
        control,
        name: `questions.${questionIndex}.answers`,
    });

    const answers = useWatch({
        control,
        name: `questions.${questionIndex}.answers`,
    })

    const canAddMoreAnswers = answers.length < MAX_ANSWERS
    const canDeleteAnswers = answers.length > 1

    const handleAddAnswer = (): void => {
        if (answers.length < MAX_ANSWERS) {
            addAnswer({ text: "", isCorrect: false });
        }
    };

    const handleDeleteAnswer = (answerIndex: number): void => {
        removeAnswer(answerIndex)
    };

    const toggleAnswerIsCorrect = (answerIndex: number) => {
        const currentAnswer = answers[answerIndex]
        updateAnswer(answerIndex, {
            ...currentAnswer,
            isCorrect: !currentAnswer.isCorrect,
        })
    };

    return (
        <div
            className={`bg-secondary mb-6 p-6 rounded-lg relative ${canDeleteQuestions && 'pt-14'}`}
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
                    { required: 'Question is required.' }
                )}
                label={`Question ${questionIndex + 1}`}
                required
                fullWidth
                sx={{ marginBottom: '1rem' }}
                error={!!errors.questions?.[questionIndex]?.text}
                helperText={errors.questions?.[questionIndex]?.text?.message}
            />
            {answerFields.map((answer, answerIndex) => (
                <div
                    key={answer.id}
                    className="flex mb-4 items-center"
                >
                    <Checkbox
                        color="primary"
                        checked={answer.isCorrect}
                        onChange={() => toggleAnswerIsCorrect(answerIndex)}
                    />
                    <TextField
                        {...register(
                            `questions.${questionIndex}.answers.${answerIndex}.text`,
                            { required: 'Answer is required.' }
                        )}
                        label={`Answer ${answerIndex + 1}`}
                        required
                        fullWidth
                        error={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.text}
                        helperText={errors.questions?.[questionIndex]?.answers?.[answerIndex]?.text?.message}
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

export const MemoizedQuestion = memo(Question)
