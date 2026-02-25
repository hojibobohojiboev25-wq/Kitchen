"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = exports.db = void 0;
const pg_1 = require("pg");
const index_1 = require("./index");
const pool = new pg_1.Pool({
    host: index_1.config.database.host,
    port: index_1.config.database.port,
    database: index_1.config.database.name,
    user: index_1.config.database.user,
    password: index_1.config.database.password,
});
pool.on('error', (err) => {
    console.error('Pool error:', err);
});
exports.db = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect(),
};
const initDatabase = async () => {
    try {
        const result = await exports.db.query('SELECT NOW()');
        console.log('Database connected:', result.rows[0]);
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};
exports.initDatabase = initDatabase;
