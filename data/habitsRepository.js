import * as SQLite from "expo-sqlite";
import { getDateKey } from "../components/calendar/utils";

const DATABASE_NAME = "under-control.db";

let databasePromise;

const DEFAULT_HABITS = [
    { title: "Beber 2L de água", description: "Meta diária de hidratação." },
    { title: "Ir a academia", description: "Treino ou atividade física planejada." },
    { title: "Ler 20 páginas", description: "Leitura diária." },
    { title: "Meditar", description: "Sessão curta de atenção plena." },
    { title: "Dormir antes da meia-noite", description: "Rotina de sono." },
];

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getDatabase = async () => {
    if (!databasePromise) {
        databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
    }

    return databasePromise;
};

export const initHabitsDatabase = async () => {
    const db = await getDatabase();

    await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS habits (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL DEFAULT '',
            created_at TEXT NOT NULL,
            deleted_at TEXT
        );

        CREATE TABLE IF NOT EXISTS habit_entries (
            habit_id TEXT NOT NULL,
            date_key TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (habit_id, date_key),
            FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS app_meta (
            key TEXT PRIMARY KEY NOT NULL,
            value TEXT NOT NULL
        );
    `);

    const countRow = await db.getFirstAsync("SELECT COUNT(*) as count FROM habits");
    const seedRow = await db.getFirstAsync(
        "SELECT value FROM app_meta WHERE key = ?",
        "default_habits_seeded"
    );

    if (!seedRow && !countRow?.count) {
        const todayKey = getDateKey(new Date());

        for (const habit of DEFAULT_HABITS) {
            await createHabit(habit, todayKey);
        }
    }

    if (!seedRow) {
        await db.runAsync(
            "INSERT INTO app_meta (key, value) VALUES (?, ?)",
            "default_habits_seeded",
            "1"
        );
    }
};

export const listManagedHabits = async () => {
    const db = await getDatabase();

    return db.getAllAsync(`
        SELECT id, title, description, created_at, deleted_at
        FROM habits
        ORDER BY deleted_at IS NOT NULL, created_at ASC, title ASC
    `);
};

export const listHabitsForDate = async (dateKey) => {
    const db = await getDatabase();

    return db.getAllAsync(
        `
        SELECT id, title, description, created_at, deleted_at
        FROM habits
        WHERE created_at <= ?
          AND (deleted_at IS NULL OR deleted_at > ?)
        ORDER BY created_at ASC, title ASC
        `,
        dateKey,
        dateKey
    );
};

export const createHabit = async ({ title, description }, createdAt = getDateKey(new Date())) => {
    const db = await getDatabase();
    const id = createId();

    await db.runAsync(
        `
        INSERT INTO habits (id, title, description, created_at, deleted_at)
        VALUES (?, ?, ?, ?, NULL)
        `,
        id,
        title.trim(),
        description.trim(),
        createdAt
    );

    return id;
};

export const updateHabit = async (id, { title, description }) => {
    const db = await getDatabase();

    await db.runAsync(
        `
        UPDATE habits
        SET title = ?, description = ?
        WHERE id = ?
        `,
        title.trim(),
        description.trim(),
        id
    );
};

export const softDeleteHabit = async (id, deletedAt = getDateKey(new Date())) => {
    const db = await getDatabase();

    await db.runAsync(
        `
        UPDATE habits
        SET deleted_at = ?
        WHERE id = ?
        `,
        deletedAt,
        id
    );
};

export const hardDeleteHabit = async (id) => {
    const db = await getDatabase();

    await db.runAsync("DELETE FROM habit_entries WHERE habit_id = ?", id);
    await db.runAsync("DELETE FROM habits WHERE id = ?", id);
};

export const listEntriesForDate = async (dateKey) => {
    const db = await getDatabase();

    return db.getAllAsync(
        `
        SELECT habit_id, completed
        FROM habit_entries
        WHERE date_key = ?
        `,
        dateKey
    );
};

export const setHabitEntry = async (habitId, dateKey, completed) => {
    const db = await getDatabase();

    await db.runAsync(
        `
        INSERT INTO habit_entries (habit_id, date_key, completed)
        VALUES (?, ?, ?)
        ON CONFLICT(habit_id, date_key)
        DO UPDATE SET completed = excluded.completed
        `,
        habitId,
        dateKey,
        completed ? 1 : 0
    );
};

export const loadMonthSummary = async (dateKeys) => {
    const db = await getDatabase();
    const habits = await db.getAllAsync(`
        SELECT id, created_at, deleted_at
        FROM habits
    `);
    const placeholders = dateKeys.map(() => "?").join(",");
    const entries = dateKeys.length
        ? await db.getAllAsync(
            `
            SELECT habit_id, date_key, completed
            FROM habit_entries
            WHERE date_key IN (${placeholders})
              AND completed = 1
            `,
            ...dateKeys
        )
        : [];

    return dateKeys.reduce((summary, dateKey) => {
        const visibleHabitIds = habits
            .filter((habit) => habit.created_at <= dateKey && (!habit.deleted_at || habit.deleted_at > dateKey))
            .map((habit) => habit.id);
        const visibleHabitSet = new Set(visibleHabitIds);
        const completedCount = entries.filter(
            (entry) => entry.date_key === dateKey && visibleHabitSet.has(entry.habit_id)
        ).length;

        summary[dateKey] = {
            completedCount,
            habitCount: visibleHabitIds.length,
        };

        return summary;
    }, {});
};
