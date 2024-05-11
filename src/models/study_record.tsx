import { CamelCaseKeys } from 'camelcase-keys';

/** 学習履歴のレコード定義 */
export type StudyRecordEntity = {
  /** ID */
  id: number;
  /** 科目ID */
  subject_id: number;
  /** 学習時間(分) */
  study_duration: number;
  /** 学習日 */
  study_date: string;
  /** 学習内容 */
  memo: string;
  /** 作成時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
};

/** 学習履歴のレコード定義 */
export type StudyRecord = CamelCaseKeys<StudyRecordEntity>;
