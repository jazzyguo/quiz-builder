export type Quiz = {
    id?: string;
    title: string;
    questions: Question[];
    isPublished: boolean;
};

export type Question = {
    id?: string;
    text: string;
    answers: Answer[];
};

export type Answer = {
    id?: string;
    text: string;
    isCorrect: boolean;
};
