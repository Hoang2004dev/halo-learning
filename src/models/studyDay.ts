export type StudyDayStatus = 'NotStarted' | 'InProgress' | 'Completed' | 'Overdue';

export interface StudyDayDto {
  id: number;
  targetDate: string; 
  status: StudyDayStatus;
  note?: string;
}

export interface CreateStudyDayDto {
  targetDate: string;
  note?: string;
}

export interface UpdateStudyDayDto {
  id: number;
  targetDate: string;
  note?: string;
  status: StudyDayStatus;
}
