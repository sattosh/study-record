import camelcaseKeys from 'camelcase-keys';
import { DatabaseInstance } from '../constants';
import { ReferenceLink } from '../models';
import { Subject, SubjectEntity } from '../models/subjects';

/** 科目一覧を取得する */
export const getAllSubjects = async ({ withHidden } = { withHidden: false }): Promise<Subject[]> => {
  const db = await DatabaseInstance.getInstance();
  // sqliteのテーブル一覧を取得する
  const selectSql = withHidden ? 'SELECT * FROM subjects' : 'SELECT * FROM subjects WHERE hidden = 0';
  const subjects = await db.select<SubjectEntity[]>(selectSql);
  return camelcaseKeys(subjects);
};

/** 科目を追加する */
export const addSubject = async (
  subject: Omit<Subject, 'id' | 'hidden'>,
  references?: Omit<ReferenceLink, 'id' | 'subjectId'>[]
): Promise<number> => {
  const db = await DatabaseInstance.getInstance();
  // 科目を登録する
  const insertSubjectResult = await db.execute('INSERT INTO subjects (name, description) VALUES (?, ?)', [
    subject.name,
    subject.description,
  ]);
  // 参考リンクがある場合は登録する
  if (references && references.length > 0) {
    const subjectId = insertSubjectResult.lastInsertId;
    await db.execute(
      `INSERT INTO reference_links (subject_id, link_name, link) VALUES ${Array(references.length).fill('(?, ?, ?)').join(',')}`,
      references.map((r) => [subjectId, r.linkName, r.link]).flat()
    );
  }
  return insertSubjectResult.lastInsertId;
};
