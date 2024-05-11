import Database from '@tauri-apps/plugin-sql';

export const databaseName = 'sqlite:study_record.db';

export class DatabaseInstance {
  private static instance: Database | null;

  public static async getInstance(): Promise<Database> {
    if (!this.instance) {
      await Database.load(databaseName);
      this.instance = Database.get(databaseName);
    }

    return this.instance;
  }

  public static async close() {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
  }
}
