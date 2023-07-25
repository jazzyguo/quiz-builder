import React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import {
    TextField,
    Checkbox,
    Button,
} from "@mui/material";
import { QuizFormData } from "@/types";
import { MAX_ANSWERS, MAX_QUESTIONS } from "@/config";

/**
 * Form functions under these guidelines - 
 *  - A quiz consists of a quiz title and a list of questions.
 *  - Every question contains question text and a list of possible answers.
 *  - Questions can be either with a single or multiple correct answers.
 *  - Max question / answer limit
 */

const defaultQuizValue: QuizFormData = {
    title: "",
    isPublished: false,
    questions: [
        {
            text: "",
            answers: [{ text: "", isCorrect: false }],
        },
    ],
}

export const QuizForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<QuizFormData>({
        defaultValues: defaultQuizValue,
    });

    const questions = useWatch({
        control,
        name: "questions",
        defaultValue: defaultQuizValue.questions,
    });

    const onSubmit = (data: QuizFormData) => {
        console.log(data);
    };

    // scroll down to the end of the window when another question is added so the user can see it
    const handleAddQuestion = () => {
        if (questions.length < MAX_QUESTIONS) {
            window.scrollTo(0, 9999);
            setValue("questions", [
                ...questions,
                { text: "", answers: [{ text: "", isCorrect: false }] },
            ]);
        }
    };

    const handleAddAnswer = (questionIndex: number) => {
        const currentAnswers = questions[questionIndex].answers;
        if (currentAnswers.length < MAX_ANSWERS) {
            currentAnswers.push({ text: "", isCorrect: false });
            setValue("questions", [...questions]);
        }
    };

    const toggleAnswerIsCorrect = (questionIndex: number, answerIndex: number) => {
        const currentIsCorrect = questions[questionIndex].answers[answerIndex].isCorrect
        setValue(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`, !currentIsCorrect);
    };

    const canAddMoreQuestions = questions.length < MAX_QUESTIONS;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="mb-8 w-full">
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
                        />
                    )}
                />
            </div>
            <Controller
                name="questions"
                control={control}
                render={({ field }) => (
                    field.value.map((question, questionIndex) => {
                        const currentAnswers = questions[questionIndex].answers;
                        const canAddMoreAnswers = currentAnswers.length < MAX_ANSWERS

                        return (
                            <div key={questionIndex} className="bg-secondary mb-6 p-6 rounded-lg">
                                <Controller
                                    name={`questions.${questionIndex}.text`}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Question is required." }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={`Question ${questionIndex + 1}`}
                                            required
                                            fullWidth
                                            sx={{ marginBottom: '1rem' }}
                                            error={!!errors.questions?.[questionIndex]?.text}
                                        />
                                    )}
                                />
                                {question.answers.map((_, answerIndex) => (
                                    <Controller
                                        key={`${questionIndex}-${answerIndex}`}
                                        name={`questions.${questionIndex}.answers.${answerIndex}.text`}
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Answer is required." }}
                                        render={({ field }) => (
                                            <div className="flex mb-4">
                                                <Checkbox
                                                    color="primary"
                                                    checked={questions[questionIndex].answers[answerIndex].isCorrect}
                                                    onChange={() => toggleAnswerIsCorrect(questionIndex, answerIndex)}
                                                />
                                                <TextField
                                                    {...field}
                                                    label={`Answer ${answerIndex + 1}`}
                                                    required
                                                    fullWidth
                                                    error={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.text}
                                                />
                                            </div>
                                        )}
                                    />
                                ))}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddAnswer(questionIndex)}
                                    disabled={!canAddMoreAnswers}
                                >
                                    Add Answer
                                </Button>
                            </div>
                        )
                    })
                )}
            />
            <div className="sticky bottom-0 flex flex-col bg-gray py-6 z-10">
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
                    >
                        Save Draft
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Publish
                    </Button>
                </div>
            </div>
        </form>
    );
};
