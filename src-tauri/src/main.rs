use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main() {
    let migrations = vec![
        // Create table study_record
        Migration {
            version: 1,
            description: "create table study_record",
            sql: include_str!("./migrations/001_create_table_study_record.sql"),
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            Builder::default()
                .add_migrations("sqlite:study_record.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
