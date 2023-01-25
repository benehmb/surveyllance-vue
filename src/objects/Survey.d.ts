import {SurveyAnswer} from "@/objects/SurveyAnswer";

export interface Survey {
  id: string;
  title: string;
  answers: SurveyAnswer[];
  isClosed: boolean;

  OnNewSurveyResult(answer:SurveyAnswer): void;

}

