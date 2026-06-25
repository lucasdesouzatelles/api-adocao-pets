const pool = require('../config/database');

const PET_FIELDS = ['name', 'age', 'species', 'size', 'status', 'description'];

const findAll = async () => {
    const [rows] = await pool.execute('SELECT * FROM pets ORDER BY id');

    return rows;
};

const findAvailable = async () => {
    const [rows] = await pool.execute('SELECT * FROM pets WHERE status = ? ORDER BY id', [
        'available'
    ]);

    return rows;
};

const findById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM pets WHERE id = ?', [id]);

    return rows[0] || null;
};

const create = async ({ name, age, species, size, status, description }) => {
    const [result] = await pool.execute(
        'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
        [name, age, species, size, status, description]
    );

    return findById(result.insertId);
};

const update = async (id, data) => {
    const entries = Object.entries(data).filter(
        ([key, value]) => PET_FIELDS.includes(key) && value !== undefined
    );

    if (!entries.length) {
        return findById(id);
    }

    const fields = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);

    await pool.execute(`UPDATE pets SET ${fields} WHERE id = ?`, [...values, id]);

    return findById(id);
};

const remove = async (id) => {
    const [result] = await pool.execute('DELETE FROM pets WHERE id = ?', [id]);

    return result.affectedRows;
};

module.exports = {
    findAll,
    findAvailable,
    findById,
    create,
    update,
    remove
};
