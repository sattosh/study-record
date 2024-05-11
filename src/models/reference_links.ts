import { CamelCaseKeys } from 'camelcase-keys';

/** 参考URLのエンティティ */
export type ReferenceLinkEntity = {
  /** Id */
  id: number;
  /** 科目ID */
  subject_id: number;
  /** リンク名 */
  link_name: string;
  /** リンク */
  link: string;
};

export type ReferenceLink = CamelCaseKeys<ReferenceLinkEntity>;
