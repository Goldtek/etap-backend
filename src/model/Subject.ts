import pool from '../database/db';

export interface Subject {
    id?: string;
    title: string;
}

export class SubjectModel {
    async create(subject: Subject): Promise<Subject> {
        const { title } = subject;
        const result = await pool.query(
            'INSERT INTO subjects (title) VALUES ($1) RETURNING *',
            [title]
        );
        return result.rows[0];
    }

    async findAll(): Promise<Subject[]> {
        const result = await pool.query('SELECT * FROM subjects');
        return result.rows;
    }
}
