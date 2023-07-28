type SelectedAnswerIds = string[];

export type GetQuizResultsDTO = {
    [questionId: string]: SelectedAnswerIds | undefined;
};

//post /permalink/permalinkId
