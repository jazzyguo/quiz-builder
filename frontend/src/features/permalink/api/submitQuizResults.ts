export type GetQuizResultsDTO = {
    answers: {
        questionId: string;
        selectedAnswerIds: string[];
    }[];
};

//post /permalink/permalinkId