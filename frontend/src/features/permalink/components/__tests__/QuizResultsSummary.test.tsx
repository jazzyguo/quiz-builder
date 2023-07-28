import { render, screen } from '@testing-library/react';
import { QuizResultsSummary } from '../QuizResultsSummary';

const mockProps = {
    permalinkId: 'samplePermalinkId',
    quizResults: {
        totalCorrect: 2,
        questions: [
            {
                id: '2b4b5c3b-8ad4-461f-b539-e97fca1fa1a4',
                correctAnswerIds: ['58befd43-a8a1-43a2-a95d-ced6c12a996f', 'bde84f71-cc9b-4da4-9bda-c8c6838031d9'],
                selectedAnswerIds: ['58befd43-a8a1-43a2-a95d-ced6c12a996f', 'bde84f71-cc9b-4da4-9bda-c8c6838031d9'],
            },
            {
                id: 'c8ade9c7-db17-4512-a54d-4883b9b5f891',
                correctAnswerIds: ['6b335605-a158-4315-878f-81173238e616'],
                selectedAnswerIds: ['6b335605-a158-4315-878f-81173238e616'],
            },
        ],
    },
};

test('should render correct score and questions', () => {
    render(<QuizResultsSummary {...mockProps} />);
    const scoreElement = screen.getByText('100%');
    const correctQuestionsElement = screen.getByText('You have achieved 2 / 2 correct questions.');
    expect(scoreElement).toBeInTheDocument();
    expect(correctQuestionsElement).toBeInTheDocument();
});

test('should apply correct color class based on the score', () => {
    render(<QuizResultsSummary {...mockProps} />);
    const scoreElement = screen.getByText('100%');
    expect(scoreElement).toHaveClass('text-green-500');
});

test('should render "Retake the quiz" button with correct link', () => {
    render(<QuizResultsSummary {...mockProps} />);
    const retakeQuizButton = screen.getByText('Retake the quiz');
    expect(retakeQuizButton).toBeInTheDocument();
});
