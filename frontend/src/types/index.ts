export type Quiz = {
    id?: string;
    permalinkId?: string;
    title: string;
    questions?: Question[];
    isPublished: boolean;
};

export type QuestionType = 'single-answer' | 'multiple-answers';

export type Question = {
    id?: string;
    type?: QuestionType;
    text: string;
    answers?: Answer[];
};

export type Answer = {
    id?: string;
    text: string;
    isCorrect: boolean;
};

export type QuizResults = {
    totalCorrect: number;
    questions: {
        id: string;
        correctAnswerIds: string[];
        selectedAnswerIds: string[];
    }[];
};
