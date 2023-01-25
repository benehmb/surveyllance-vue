
export interface SurveyAnswer {
  id: string;
  text: string;
  votes: number;
}

export interface VotesChange {
  target: any;
  method: MethodInfo;
}
