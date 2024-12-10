import pool from './db';

const createTables = async () => {
    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `;

        const createSubjectsTable = `
            CREATE TABLE IF NOT EXISTS subjects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL
            );
        `;

        const createTopicsTable = `
            CREATE TABLE IF NOT EXISTS topics (
                id SERIAL PRIMARY KEY,
                subject_id INT REFERENCES subjects(id),
                title VARCHAR(100) NOT NULL,
                video_url TEXT,
                description TEXT
            );
        `;

          const createProgressTable = `
            CREATE TABLE progress (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                topic_id INT REFERENCES topics(id),
                completed BOOLEAN DEFAULT FALSE,
                completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(createUsersTable);
        await pool.query(createSubjectsTable);
        await pool.query(createTopicsTable);
        await pool.query(createProgressTable);

        console.log('Tables created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error);
    } 
};

// createTables();

export default createTables;