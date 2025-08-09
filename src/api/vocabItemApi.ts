// src/api/vocabItemApi.ts
import axiosClient from "./axiosClient";
import {
  CreateVocabItemDto,
  UpdateVocabItemDto,
  VocabItemDto,
  VocabStatus,            
} from "../models/vocabItem";

export const vocabItemApi = {
  create: (dto: CreateVocabItemDto): Promise<VocabItemDto> =>
    axiosClient.post("/vocabitem", dto),

  update: (dto: UpdateVocabItemDto): Promise<void> =>
    axiosClient.put("/vocabitem", dto),

  delete: (id: number): Promise<void> => axiosClient.delete(`/vocabitem/${id}`),

  getByStudyDay: (studyDayId: number): Promise<VocabItemDto[]> =>
    axiosClient.get(`/vocabitem/study-day/${studyDayId}`),

  getById: (id: number): Promise<VocabItemDto> =>
    axiosClient.get(`/vocabitem/${id}`),

  getRandomByStudyDay: (studyDayId: number): Promise<VocabItemDto> =>
    axiosClient.get(`/vocabitem/random/study-day/${studyDayId}`),

  getRandomGlobal: (): Promise<VocabItemDto> =>
    axiosClient.get(`/vocabitem/random`),

  updateStatus: (id: number, status: VocabStatus): Promise<VocabItemDto> =>
    axiosClient.patch(`/vocabitem/${id}/status`, { id, status }),
};
