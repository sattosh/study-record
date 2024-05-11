import camelcaseKeys from 'camelcase-keys';
import { DateTime } from 'luxon';
import { DatabaseInstance } from '../constants';
import { StudyRecord } from '../models';

type StudyRecordReturn = StudyRecord & { subjectName: string };

/** 学習履歴一覧を取得する */
export const getAllStudyRecords = async (
  startDate: DateTime = DateTime.utc().minus({ days: 8 }),
  endDate?: DateTime
): Promise<StudyRecordReturn[]> => {
  const db = await DatabaseInstance.getInstance();
  const getStudyRecordsSql = `
    SELECT
      sr.id,
      sr.subject_id,
      sr.study_duration,
      sr.study_date,
      sr.memo,
      sr.created_at,
      sr.updated_at,
      s.name as subject_name
    FROM study_records sr
    JOIN subjects s ON sr.subject_id = s.id
    ${startDate ? `WHERE sr.study_date >= '${startDate.toISODate()}'` : ''}
    ${startDate && endDate ? `AND sr.study_date <= '${endDate.toISODate()}'` : ''}
  `;
  const studyRecords = await db.select<StudyRecordReturn[]>(getStudyRecordsSql);
  return camelcaseKeys(studyRecords);
};

/** 学習記録をする */
export const addStudyRecord = async (studyRecord: Omit<StudyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> => {
  const db = await DatabaseInstance.getInstance();
  const insertStudyRecordResult = await db.execute(
    'INSERT INTO study_records (subject_id, study_duration, study_date, memo) VALUES (?, ?, ?, ?)',
    [studyRecord.subjectId, studyRecord.studyDuration, studyRecord.studyDate, studyRecord.memo]
  );
  return insertStudyRecordResult.lastInsertId;
};
