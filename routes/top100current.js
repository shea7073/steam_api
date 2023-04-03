const {MongoClient} = require('mongodb');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let collection = null;


module.exports = async (req, res) => {
    const client = new MongoClient(dbUrl);
    await client.connect();

    let db = client.db('Steam_Data')
    let collection = db.collection('Current_Players');
    let results = await collection.find({}).sort({'Updated': -1}).limit(100).toArray();


    res.format({
        'application/json': () => {
            res.json(results);
        },
    });

}