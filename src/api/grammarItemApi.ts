// src/api/grammarItemApi.ts
import axiosClient from './axiosClient';
import {
  CreateGrammarItemDto,
  GrammarItemDto,
  UpdateGrammarItemDto,
} from '../models/grammarItem';

export const grammarItemApi = {
  create: (dto: CreateGrammarItemDto): Promise<GrammarItemDto> =>
    axiosClient.post('/grammaritem', dto),

  update: (dto: UpdateGrammarItemDto): Promise<void> =>
    axiosClient.put('/grammaritem', dto),

  delete: (id: number): Promise<void> =>
    axiosClient.delete(`/grammaritem/${id}`),

  getByStudyDay: (studyDayId: number): Promise<GrammarItemDto[]> =>
    axiosClient.get(`/grammaritem/study-day/${studyDayId}`),

  getById: (id: number): Promise<GrammarItemDto> =>
    axiosClient.get(`/grammaritem/${id}`),
};
