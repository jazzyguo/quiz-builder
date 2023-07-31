import { QueryClientProvider, } from "@tanstack/react-query";
import { render, screen } from '@testing-library/react';
import { QuizTakerForm } from '../QuizTakerForm';
import { QuestionTakerForm } from '../QuestionTakerForm';
import { QuestionType } from '@/types';
import { queryClient } from "@/lib/react-query";
import { FieldError } from "react-hook-form";

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: () => ({
        handleSubmit: jest.fn(),
        formState: { errors: {} },
        register: jest.fn(),
        setValue: jest.fn(),
        control: {},
    }),
    useWatch: jest.fn(() => ({})),
}));

const quiz: {
    title: string;
    isPublished: boolean,
    questions: {
        id: string;
        text: string;
        type: QuestionType;
        answers: {
            id: string,
            text: string,
        }[]
    }[]
} = {
    title: 'Sample Quiz',
    isPublished: true,
    questions: [
        {
            id: 'q1',
            text: 'Question 1',
            type: 'single-answer',
            answers: [
                { id: 'a1', text: 'Answer 1' },
                { id: 'a2', text: 'Answer 2' },
            ],
        },
        {
            id: 'q2',
            text: 'Question 2',
            type: 'multiple-answers',
            answers: [
                { id: 'a3', text: 'Answer 3' },
                { id: 'a4', text: 'Answer 4' },
            ],
        },
    ],
};

describe('QuizTakerForm', () => {
    it('renders quiz title and questions', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <QuizTakerForm quiz={quiz} />
            </QueryClientProvider>
        );

        // Check if the quiz title is rendered
        expect(screen.getByText(quiz.title)).toBeInTheDocument();

        // Check if all questions are rendered
        quiz.questions.forEach((question) => {
            expect(screen.getByText(question.text)).toBeInTheDocument();
        });
    });
});

describe('QuestionTakerForm', () => {
    it('renders question text and answers', () => {
        const question = quiz.questions[0];
        const formValues = {};

        render(
            <QuestionTakerForm
                question={question}
                formValues={formValues}
                handleCheckboxChange={jest.fn()}
                errors={{}}
                register={jest.fn()}
            />
        );

        // Check if the question text is rendered
        expect(screen.getByText(question.text)).toBeInTheDocument();

        // Check if all answers are rendered
        question.answers.forEach((answer) => {
            expect(screen.getByText(answer.text)).toBeInTheDocument();
        });
    });

    it('displays error message when no answers are selected', () => {
        const question = quiz.questions[0];
        const answer = quiz.questions[0].answers[0]
        const formValues = {
            [question.id]: []
        };

        const errors: { [questionId: string]: { [answerId: string]: FieldError } } = {
            [question.id]: {
                [answer.id]: { type: 'validate', message: 'At least one answer is required' }
            }
        };

        render(
            <QuestionTakerForm
                question={question}
                formValues={formValues}
                handleCheckboxChange={jest.fn()}
                errors={errors}
                register={jest.fn()}
            />
        );

        expect(screen.getByText('At least one answer is required')).toBeInTheDocument();
    });
});
