import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { mockUser, AppRouterContextProviderMock } from '@/__mocks__/';
import { UserMenuList } from '../';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
}));

describe('UserMenuList', () => {
    it('renders user email correctly', () => {
        render(
            <AppRouterContextProviderMock router={{ push: jest.fn() }}>
                <UserMenuList user={mockUser} />
            </AppRouterContextProviderMock>
        );

        const userEmail = screen.getByText(mockUser.email);
        expect(userEmail).toBeInTheDocument();
    });

    it('navigates to the correct pages when menu items are clicked', () => {
        const mockPush = jest.fn();

        jest.mock('next/navigation', () => ({
            useRouter: () => ({
                push: mockPush,
            }),
        }));

        render(
            <AppRouterContextProviderMock router={{ push: mockPush }}>
                <UserMenuList user={mockUser} />
            </AppRouterContextProviderMock>
        );

        const menuButton = screen.getByText(mockUser.email);
        fireEvent.click(menuButton);

        const createQuizMenuItem = screen.getByText('Create Quiz');
        fireEvent.click(createQuizMenuItem);
        expect(mockPush).toHaveBeenCalledWith('/quiz/create');

        const draftsMenuItem = screen.getByText('Drafts');
        fireEvent.click(draftsMenuItem);
        expect(mockPush).toHaveBeenCalledWith('/quiz/drafts');

        const publishedMenuItem = screen.getByText('Published');
        fireEvent.click(publishedMenuItem);
        expect(mockPush).toHaveBeenCalledWith('/quiz/published');
    });
});
