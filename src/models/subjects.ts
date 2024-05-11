import { CamelCaseKeys } from 'camelcase-keys';

/**
 * 科目エンティティ
 */
export type SubjectEntity = {
  /** Id */
  id: number;
  /** 科目名 */
  name: string;
  /** 科目の説明 */
  description: string;
  /** 隠しフラグ */
  hidden: boolean;
};

/** 学習履歴のレコード定義 */
export type Subject = CamelCaseKeys<SubjectEntity>;
