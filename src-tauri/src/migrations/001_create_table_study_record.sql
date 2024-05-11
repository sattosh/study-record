-- データベースの外部キー制約を有効にする
-- PRAGMA foreign_keys = ON;
-- 科目テーブルを作成
CREATE TABLE subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  hidden INTEGER NOT NULL DEFAULT 0
);
-- 科目に対する参考リンクを作成(複数紐づくので中間テーブルも作成)
CREATE TABLE reference_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_id INTEGER NOT NULL,
  link_name TEXT,
  link TEXT NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) on delete cascade
);
-- 学習記録テーブルを作成
CREATE TABLE study_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_id INTEGER NOT NULL,
  study_duration INTEGER NOT NULL,
  study_date TEXT NOT NULL,
  memo TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (subject_id) REFERENCES subjects(id) on delete cascade
);
-- 学習記録テーブルにインデックスを追加
CREATE INDEX IF NOT EXISTS study_record_subject_id ON study_records (subject_id);
-- updated_at にトリガーを追加
CREATE TRIGGER IF NOT EXISTS trigger_study_record_updated_at
AFTER
UPDATE ON study_records BEGIN
UPDATE study_records
SET updated_at = DATETIME('now', 'localtime')
WHERE id = NEW.id;
END;