import pool from '../database/db';

export interface Topic {
    id?: string;
    subject_id: number;
    title: string;
    video_url?: string;
    description?: string;
}

export class TopicModel {
    async create(topic: Topic): Promise<Topic> {
        const { subject_id, title, video_url, description } = topic;
        const result = await pool.query(
            'INSERT INTO topics (subject_id, title, video_url, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [subject_id, title, video_url || null, description || null]
        );
        return result.rows[0];
    }

    async findBySubjectId(subject_id: number): Promise<Topic[]> {
        const result = await pool.query('SELECT * FROM topics WHERE subject_id = $1', [subject_id]);
        return result.rows;
    }

}
