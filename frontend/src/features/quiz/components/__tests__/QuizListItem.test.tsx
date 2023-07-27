import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuizListItem } from '../QuizListItem';
import { Quiz } from '@/types';

const draftQuiz: Quiz = {
    id: '1',
    title: 'Draft Quiz',
    isPublished: false,
};

const publishedQuiz: Quiz = {
    id: '2',
    title: 'Published Quiz',
    isPublished: true,
    permalinkId: 'asdasd',
}

const handleDelete = jest.fn()
const handleEdit = jest.fn()

describe('QuizListItem', () => {
    test('renders edit button for draft quiz', () => {
        render(
            <QuizListItem
                quiz={draftQuiz}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        );
        const editButton = screen.getByTestId('edit-quiz');
        expect(editButton).toBeInTheDocument();
    });

    test('renders published icon when quiz is published', () => {
        render(
            <QuizListItem
                quiz={publishedQuiz}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        ); const publishedIcon = screen.getByTestId('published-quiz');
        expect(publishedIcon).toBeInTheDocument();
    });

    test('renders copy share url for published quiz', () => {
        render(
            <QuizListItem
                quiz={publishedQuiz}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        ); const copyShareUrl = screen.getByTestId('copy-quiz-share-url');
        expect(copyShareUrl).toBeInTheDocument();
    });

    test('renders delete button for all items', () => {
        render(
            <QuizListItem
                quiz={publishedQuiz}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        ); const deleteButton = screen.getByTestId('delete-quiz');
        expect(deleteButton).toBeInTheDocument();
    });
});
