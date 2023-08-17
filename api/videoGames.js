const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        console.log("we're in get all videoGames function!")
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
        console.error("error")
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("ID:", id);
        const videoGame = await getVideoGameById(id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    // LOGIC GOES HERE 
    try {
        const videoGame = await createVideoGame(req.body);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    // LOGIC GOES HERE 
    try {
        const videoGame = await updateVideoGame(req.params.id, req.body)
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    // LOGIC GOES HERE
    try {
        const id = req.params.id;
        const videoGame = await deleteVideoGame(id);
        res.send("file deleted")
    } catch (error) {
        throw error;
    }
});

module.exports = router;
