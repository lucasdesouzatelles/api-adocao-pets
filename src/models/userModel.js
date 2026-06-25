const pool = require('../config/database');

const USER_FIELDS = ['name', 'email', 'password', 'phone', 'role'];

const findAll = async () => {
    const [rows] = await pool.execute('SELECT id, name, email, phone, role FROM users ORDER BY id');

    return rows;
};

const findById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT id, name, email, password, phone, role FROM users WHERE id = ?',
        [id]
    );

    return rows[0] || null;
};

const findByEmail = async (email) => {
    const [rows] = await pool.execute(
        'SELECT id, name, email, password, phone, role FROM users WHERE email = ?',
        [email]
    );

    return rows[0] || null;
};

const create = async ({ name, email, password, phone, role }) => {
    const [result] = await pool.execute(
        'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, phone, role]
    );

    return findById(result.insertId);
};

const update = async (id, data) => {
    const entries = Object.entries(data).filter(
        ([key, value]) => USER_FIELDS.includes(key) && value !== undefined
    );

    if (!entries.length) {
        return findById(id);
    }

    const fields = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);

    await pool.execute(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);

    return findById(id);
};

const remove = async (id) => {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    return result.affectedRows;
};

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    update,
    remove
};
