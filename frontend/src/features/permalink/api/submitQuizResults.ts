type SelectedAnswerIds = string[];

export type GetQuizResultsDTO = {
    [questionId: string]: SelectedAnswerIds;
};

//post /permalink/permalinkId
