import bcrypt from "bcrypt";
import client from "../database";

const saltRounds: string = process.env.SALT_ROUNDS || "";
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: Number;
    username: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find users ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql =
                "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Could not add new users ${u.username}. Error: ${err}`);
        }
    }

    async update(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql =
                "UPDATE users set username = ($2), password_digest= ($3) WHERE id = ($1) RETURNING *";
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Could not add new users ${u.username}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<number> {
        try {
            const sql = "DELETE FROM users WHERE id=($1)";
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const weapon = result.rowCount;
            conn.release();
            return weapon;
        } catch (err) {
            throw new Error(`Could not delete users ${id}. Error: ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User|null>{
        const conn = await client.connect();
        const sql = "SELECT password_digest FROM users WHERE username=($1)";

        const result = await conn.query(sql, [username]);

        console.log(password + pepper);

        if(result.rows.length){
            const user = result.rows[0];

            console.log(user);

            if(bcrypt.compareSync(password+pepper, user.password_digest)){
                return user;
            }
        }
        return null;
    }
}
