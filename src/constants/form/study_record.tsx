import { DateTime } from 'luxon';

import { z } from 'zod';

export type StudyRecordFormProps = {
  subjectId?: number | null;
  studyDuration: string;
  studyDate: DateTime<true>;
  memo?: string;
};

export const defaultStudyRecordFormValue: StudyRecordFormProps = {
  studyDate: DateTime.now(),
  studyDuration: '0',
  memo: '',
};

export const studyRecordSchema = z.object({
  subjectId: z.number().min(1, '学習項目を選択してください'),
  studyDuration: z.preprocess((value) => Number(value), z.number().gt(0).lte(1000)),
  studyDate: z.custom((value) => value instanceof DateTime),
  memo: z.string().max(2000),
});
