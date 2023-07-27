import { useEffect, useRef, useCallback } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
    TextField,
    Button,
} from "@mui/material";
import { Quiz } from "@/types";
import { MAX_QUESTIONS } from "@/config";
import { MemoizedQuestion } from './Question'

/**
 * Form functions under these guidelines - 
 *  - A quiz consists of a quiz title and a list of questions.
 *  - Every question contains question text and a list of possible answers.
 *  - Questions can be either with a single or multiple correct answers.
 *  - Max question / answer limit
 */

export const defaultQuizValue: Quiz = {
    title: "",
    isPublished: false,
    questions: [
        {
            text: "",
            answers: [{ text: "", isCorrect: false }],
        },
    ],
}

type Props = {
    initialValue?: Quiz
}

export const QuizForm = ({
    initialValue,
}: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<Quiz>({
        defaultValues: initialValue || defaultQuizValue,
    });

    const {
        fields: questions,
        append: addQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: "questions"
    });

    const prevQuestionsLengthRef = useRef(questions.length);

    // compares current questions length with previous length to
    // capture the point at which a new question is added so that we can scroll the user to view 
    useEffect(() => {
        if (questions.length > prevQuestionsLengthRef.current) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
        prevQuestionsLengthRef.current = questions.length;
    }, [questions])

    const onSaveDraft = (data: Quiz) => {
        console.log("Saving draft:", data);
    };

    const onPublish = (data: Quiz) => {
        console.log("Publishing:", data);
    };

    const handleAddQuestion = useCallback((): void => {
        if (questions.length < MAX_QUESTIONS) {
            addQuestion({
                text: "",
                answers: [{ text: "", isCorrect: false }],
            })
        }
    }, [questions]);

    const handleDeleteQuestion = useCallback((questionIndex: number): void => {
        if (questions.length > 1) {
            removeQuestion(questionIndex)
        }
    }, [questions]);

    const canAddMoreQuestions = questions.length < MAX_QUESTIONS

    return (
        <form className="flex flex-col">
            <div className="mb-8 w-full p-6 bg-secondary rounded-lg">
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Quiz title is required." }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Quiz Title"
                            required
                            fullWidth
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    )}
                />
            </div>
            {questions.map((question, questionIndex) => (
                <MemoizedQuestion
                    questions={questions}
                    questionIndex={questionIndex}
                    key={question.id}
                    handleDelete={handleDeleteQuestion}
                    errors={errors.questions?.[questionIndex] || {}}
                    control={control}
                    register={register}
                />
            ))}
            <div className="sticky bottom-0 flex flex-col bg-gray pt-6 pb-8 z-10">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddQuestion}
                    disabled={!canAddMoreQuestions}
                    sx={{ marginBottom: '1rem' }}
                >
                    Add Question
                </Button>
                <div className="flex justify-between sm:justify-end">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '1rem' }}
                        onClick={handleSubmit(onSaveDraft)}
                    >
                        Save Draft
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onPublish)}
                    >
                        Publish
                    </Button>
                </div>
            </div>
        </form>
    );
};
