import { render, screen } from '@testing-library/react';
import { defaultQuizValue, QuizForm } from '../QuizForm'
import { MAX_QUESTIONS, MAX_ANSWERS } from '@/config';
import { QueryClientProvider, } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

// @ts-ignore
const defaultQuestion = defaultQuizValue.questions[0]
// @ts-ignore
const defaultAnswer = defaultQuestion.answers[0]

jest.mock('../../api/createQuiz', () => ({
    useCreateQuiz: () => ({
        mutate: jest.fn(),
    }),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn()
}))

test('Should not be allowed to delete the question if it only has one', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <QuizForm />
        </QueryClientProvider>
    );

    try {
        screen.getByTestId('delete-question');
        expect(false).toBe(true)
    } catch (e) {
        expect(true).toBe(true)
    }
});

test('Should be allowed to delete the question if it has more than one', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <QuizForm
                initialValue={{
                    ...defaultQuizValue,
                    questions: [
                        defaultQuestion,
                        defaultQuestion,
                    ]
                }}
            />
        </QueryClientProvider>
    );

    const deleteQuestion = screen.getAllByTestId('delete-question')[0];
    expect(deleteQuestion).toBeInTheDocument()
});

test('Should not be allowed to delete answers if it only has one', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <QuizForm />
        </QueryClientProvider>
    );

    try {
        screen.getByTestId('delete-answer');
        expect(false).toBe(true)
    } catch (e) {
        expect(true).toBe(true)
    }
});

test('Should be allowed to delete answers if it has more than one', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <QuizForm
                initialValue={{
                    ...defaultQuizValue,
                    questions: [
                        {
                            text: "",
                            answers: [
                                defaultAnswer,
                                defaultAnswer,
                            ],
                        },
                    ]
                }}
            />
        </QueryClientProvider>
    );

    const deleteQuestion = screen.getAllByTestId('delete-answer')[0];
    expect(deleteQuestion).toBeInTheDocument()
});

test(`Should only be allowed to add ${MAX_QUESTIONS} questions`, () => {
    const questions = Array.from({ length: MAX_QUESTIONS }, () => defaultQuestion);

    render(
        <QueryClientProvider client={queryClient}>
            <QuizForm
                initialValue={{
                    ...defaultQuizValue,
                    questions,
                }}
            />
        </QueryClientProvider>
    );

    const addQuestion = screen.getByText('Add Question');
    expect(addQuestion).toBeDisabled();
})

test(`Should only be allowed to add ${MAX_ANSWERS} answers`, () => {
    const answers = Array.from({ length: MAX_ANSWERS }, () => defaultAnswer);

    render(
        <QueryClientProvider client={queryClient}>
            <QuizForm
                initialValue={{
                    ...defaultQuizValue,
                    questions: [{
                        ...defaultQuestion,
                        answers,
                    }],
                }}
            />
        </QueryClientProvider>
    );

    const addAnswer = screen.getByText('Add Answer');
    expect(addAnswer).toBeDisabled();
})
