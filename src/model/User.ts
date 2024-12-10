import bcrypt from 'bcryptjs';

import pool from '../database/db';


export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export class UserModel {
    async create(user: User): Promise<User> {
        const { name, email, password, id } = user;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword, id]
        );
        return result.rows[0];
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }

    async verifyPassword(storedPassword: string, inputPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, storedPassword);
    }
}
