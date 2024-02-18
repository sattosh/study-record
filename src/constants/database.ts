import Database from 'tauri-plugin-sql-api';

export const databaseName = '"sqlite:study_record.db';

export class DatabaseInstance {
  private static instance: Database;

  public static async getInstance(): Promise<Database> {
    if (!this.instance) {
      this.instance = await Database.load(databaseName);
    }

    return this.instance;
  }
}
