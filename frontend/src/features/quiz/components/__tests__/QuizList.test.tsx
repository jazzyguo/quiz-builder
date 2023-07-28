import { render, screen } from '@testing-library/react';
import { QuizList } from '../QuizList';
import { QueryClientProvider, } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn()
}))

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

test('should render empty state if no quizzes are available', () => {
    const mockProps = {
        quizzes: [],
    };

    render(
        <QueryClientProvider client={queryClient}>
            <QuizList {...mockProps} />
        </QueryClientProvider>
    );


    const emptyStateMessage = screen.getByText('You do not have any quizzes');
    expect(emptyStateMessage).toBeInTheDocument();
});
