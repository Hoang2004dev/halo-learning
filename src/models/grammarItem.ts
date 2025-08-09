export interface GrammarItemDto {
  id: number;
  topic: string;
  explanation: string;
  exercise?: string;
  answer?: string;
  description?: string; 
}

export interface CreateGrammarItemDto {
  topic: string;
  explanation: string;
  exercise?: string;
  answer?: string;
  description?: string; 
  studyDayId: number;
}

export interface UpdateGrammarItemDto extends CreateGrammarItemDto {
  id: number;
}
