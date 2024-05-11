import { DatabaseInstance } from '../constants';

export const getAllSubjects = async () => {
  const db = await DatabaseInstance.getInstance();

  // sqliteのテーブル一覧を取得する
  const tables = await db.select('SELECT * FROM sqlite_master');
  console.log('tables', tables);

  const subjects = await db.select('SELECT * FROM subjects');
  return subjects;
};
