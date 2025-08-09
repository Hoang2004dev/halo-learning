import axiosClient from './axiosClient';
import {
  StudyDayDto,
  CreateStudyDayDto,
  UpdateStudyDayDto,
  StudyDayStatus,
} from '../models/studyDay';

export const studyDayApi = {
  getAll: (): Promise<StudyDayDto[]> => axiosClient.get('/studyday'),

  getById: (id: number): Promise<StudyDayDto> => axiosClient.get(`/studyday/${id}`),

  getByDate: (date: string): Promise<StudyDayDto | null> =>
    axiosClient.get(`/studyday/date/${date}`), // date format: yyyy-MM-dd

  create: (dto: CreateStudyDayDto): Promise<StudyDayDto> =>
    axiosClient.post('/studyday', dto),

  update: (dto: UpdateStudyDayDto): Promise<void> =>
    axiosClient.put('/studyday', dto),

  updateStatus: (id: number, newStatus: StudyDayStatus): Promise<void> =>
    axiosClient.patch(`/studyday/${id}/status?newStatus=${newStatus}`),

  delete: (id: number): Promise<void> =>
    axiosClient.delete(`/studyday/${id}`),
};
