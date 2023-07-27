export type Quiz = {
    id?: string;
    permalinkId?: string;
    title: string;
    questions?: Question[];
    isPublished: boolean;
};

export type Question = {
    id?: string;
    type?: 'single-answer' | 'multiple-answers';
    text: string;
    answers?: Answer[];
};

export type Answer = {
    id?: string;
    text: string;
    isCorrect: boolean;
};
