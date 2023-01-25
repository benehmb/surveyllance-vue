
export interface Survey {
  id: string;
  title: string;
  answers: SurveyAnswer[];
  isClosed: boolean;
}

export interface VotesChanged {
  target: any;
  method: MethodInfo;
}

export interface CloseSurvey {
  target: any;
  method: MethodInfo;
}
