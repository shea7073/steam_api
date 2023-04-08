const {MongoClient} = require('mongodb');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;


module.exports = async (req, res) => {
    const client = new MongoClient(dbUrl);
    await client.connect();

    let db = client.db('Steam_Data')
    let collection = db.collection('Top_Games');
    let date = new Date().toJSON().slice(0, 10);
    let results = await collection.find({'date_scraped': date}).toArray();

    res.setHeader('Access-Control-Allow-Origin',  '*');

    res.format({
        'application/json': () => {
            res.json(results);
        },
    });

    }

