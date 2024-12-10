import pool from '../database/db';

export interface Progress {
    id: number;
    user_id: number;
    topic_id: number;
    completed: boolean;
    completed_at?: Date;
}

export class ProgressModel {
    async create(progress: Omit<Progress, 'id'>): Promise<Progress> {
        const { user_id, topic_id, completed } = progress;
        const result = await pool.query(
            'INSERT INTO progress (user_id, topic_id, completed) VALUES ($1, $2, $3) RETURNING *',
            [user_id, topic_id, completed]
        );
        return result.rows[0];
    }

    async findByUserId(user_id: number): Promise<Progress[]> {
        const result = await pool.query('SELECT * FROM progress WHERE user_id = $1', [user_id]);
        return result.rows;
    }

    async updateCompletion(user_id: number, topic_id: number): Promise<Progress> {
        const result = await pool.query(
            'UPDATE progress SET completed = TRUE, completed_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND topic_id = $2 RETURNING *',
            [user_id, topic_id]
        );
        return result.rows[0];
    }

    async getRanking(): Promise<any[]> {
        const result = await pool.query(`
            SELECT u.id AS user_id, u.username,
                   COUNT(p.completed) FILTER (WHERE p.completed) AS completed_count,
                   COUNT(p.topic_id) AS total_count,
                   (COUNT(p.completed) FILTER (WHERE p.completed)::float / COUNT(p.topic_id)) * 100 AS completion_rate
            FROM users u
            LEFT JOIN progress p ON u.id = p.user_id
            GROUP BY u.id
            ORDER BY completion_rate DESC
        `);
        return result.rows;
    }
}