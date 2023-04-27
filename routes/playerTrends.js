const {MongoClient} = require('mongodb');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

module.exports = async (req, res) => {

    const title = req.body.title;

    const client = new MongoClient(dbUrl);
    await client.connect();

    let db = client.db('Steam_Data')
    let collection = db.collection('Current_Players');
    let results = await collection.find({'Data.Title': title}).toArray();

    res.format({
        'application/json': () => {
            res.json(results);
        },
    });

}

