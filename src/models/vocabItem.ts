export type VocabStatus = 'NotLearned' | 'Learning' | 'Mastered' | 'Review';

export interface VocabItemDto {
  id: number;
  word: string;
  nativeMeaning: string;
  foreignMeaning: string;
  example?: string;
  audioUrl?: string;
    description?: string;
  status: VocabStatus;
}

export interface CreateVocabItemDto {
  word: string;
  nativeMeaning: string;
  foreignMeaning: string;
  example?: string;
  audioUrl?: string;
    description?: string;
  status: VocabStatus;
  studyDayId: number;
}

export interface UpdateVocabItemDto extends CreateVocabItemDto {
  id: number;
}
