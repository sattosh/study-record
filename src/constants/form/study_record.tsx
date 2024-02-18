import { z } from 'zod';

export type StudyRecordFormProps = {
  subjectId?: number;
  studyDuration: number;
  studyDate: Date;
  memo?: string;
};

export const defaultStudyRecordFormProps: StudyRecordFormProps = {
  studyDate: new Date(),
  studyDuration: 0,
  memo: '',
};

export const studyRecordSchema = z.object({
  subjectId: z.number(),
  studyDuration: z.number().gte(0),
  studyDate: z.date(),
  memo: z.string().optional(),
});
