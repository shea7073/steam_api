let express = require('express');
let router = express.Router();

const getAllTopGames = require('./getAllTopGames');
const top100current = require('./top100current');
const playerTrends = require('./playerTrends');
const topOnSale = require('./topOnSale');
const gameSalesHistory = require('./gameSalesHistory');
const currentPlayers = require('./currentPlayers');
const gameHistory24hr = require('./gameHistory24hr');
const timeStamps = require('./timeStamps')

// get all today's top games
router.get('/api/allTopGames', getAllTopGames);

// get top 100 currently playing titles
router.get('/api/top100current', top100current);

// get play trend info for a specific game
// takes the title in req.body.title
router.get('/api/player-trends', playerTrends);

// get all from top sellers that are on sale
router.get('/api/topOnSale', topOnSale);

// get historical data on top selling status of game
// takes in title in req.body.title
router.get('/api/game-sales-history', gameSalesHistory);

// get top 100 games by player count currently
router.get('/api/current-players', currentPlayers);

// get 24hr of records on a given game (needs post body)
router.post('/api/24hr', gameHistory24hr);

// was for testing
router.get('/api/timeStamps', timeStamps);

module.exports = router;