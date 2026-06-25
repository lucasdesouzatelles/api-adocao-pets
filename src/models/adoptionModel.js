const pool = require('../config/database');

const adoptionSelect = `
    SELECT
        a.id,
        a.user_id,
        u.name AS user_name,
        a.pet_id,
        p.name AS pet_name,
        a.adoption_date
    FROM adoptions a
    INNER JOIN users u ON u.id = a.user_id
    INNER JOIN pets p ON p.id = a.pet_id
`;

const findAll = async () => {
    const [rows] = await pool.execute(`${adoptionSelect} ORDER BY a.id`);

    return rows;
};

const findById = async (id) => {
    const [rows] = await pool.execute(`${adoptionSelect} WHERE a.id = ?`, [id]);

    return rows[0] || null;
};

const findByUserAndPet = async (userId, petId) => {
    const [rows] = await pool.execute(
        'SELECT id, user_id, pet_id, adoption_date FROM adoptions WHERE user_id = ? AND pet_id = ?',
        [userId, petId]
    );

    return rows[0] || null;
};

const create = async ({ userId, petId }) => {
    const connection = await pool.getConnection();
    let adoptionId;

    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, CURDATE())',
            [userId, petId]
        );

        await connection.execute('UPDATE pets SET status = ? WHERE id = ?', ['adopted', petId]);
        await connection.commit();

        adoptionId = result.insertId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }

    return findById(adoptionId);
};

module.exports = {
    findAll,
    findById,
    findByUserAndPet,
    create
};
