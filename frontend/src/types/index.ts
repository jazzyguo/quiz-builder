export type QuizFormData = {
    title: string;
    questions: Question[];
    isPublished: boolean;
};

export type Question = {
    text: string;
    answers: Answer[];
};

export type Answer = {
    text: string;
    isCorrect: boolean;
};
