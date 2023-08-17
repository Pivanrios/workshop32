const client = require('./client');
const util = require('util');
const { deserialize } = require('v8');

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows } = await client.query(
            "SELECT * FROM videoGames" );
        return rows;
    } catch (error) {
        throw new Error("Make sure you have replaced the  placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // LOGIC GOES HERE
    const {name, description, price, inStock, isPopular, imgUrl} = body;
    try {
        console.log("adding new video game");
        await client.query(
            `INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,[name,description, price, inStock, isPopular,imgUrl]
        );
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [videoGame] } = await client.query(`
            UPDATE videoGames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return videoGame;
    } catch (error) {
        throw error;
    }

}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
    console.log("delete:", id);
    await client.query(`DELETE FROM videoGames WHERE id= $1`,[id]);
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}