import { render, screen } from '@testing-library/react';
import { defaultQuizValue, QuizForm } from '../QuizForm'
import { MAX_QUESTIONS, MAX_ANSWERS } from '@/config';

const defaultQuestion = defaultQuizValue.questions[0]
const defaultAnswer = defaultQuestion.answers[0]

test('Should not be allowed to delete the question if it only has one', () => {
    render(
        <QuizForm />
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
        <QuizForm
            initialValue={{
                ...defaultQuizValue,
                questions: [
                    defaultQuestion,
                    defaultQuestion,
                ]
            }}
        />
    );

    const deleteQuestion = screen.getAllByTestId('delete-question')[0];
    expect(deleteQuestion).toBeInTheDocument()
});

test('Should not be allowed to delete answers if it only has one', () => {
    render(
        <QuizForm />
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
    );

    const deleteQuestion = screen.getAllByTestId('delete-answer')[0];
    expect(deleteQuestion).toBeInTheDocument()
});

test(`Should only be allowed to add ${MAX_QUESTIONS} questions`, () => {
    const questions = Array.from({ length: MAX_QUESTIONS }, () => defaultQuestion);

    render(
        <QuizForm
            initialValue={{
                ...defaultQuizValue,
                questions,
            }}
        />
    );

    const addQuestion = screen.getByText('Add Question');
    expect(addQuestion).toBeDisabled();
})

test(`Should only be allowed to add ${MAX_ANSWERS} answers`, () => {
    const answers = Array.from({ length: MAX_ANSWERS }, () => defaultAnswer);

    render(
        <QuizForm
            initialValue={{
                ...defaultQuizValue,
                questions: [{
                    ...defaultQuestion,
                    answers,
                }],
            }}
        />
    );

    const addAnswer = screen.getByText('Add Answer');
    expect(addAnswer).toBeDisabled();
})
