const {MongoClient} = require('mongodb');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;


module.exports = async (req, res) => {

    let title = req.body.title;
    //console.log(req.body);
    let today = new Date(new Date().toISOString().split('T')[0]);

    //console.log(new Date().toISOString().split('T')[0]);
    let results;

    const client = new MongoClient(dbUrl);
    await client.connect();

    let db = client.db('Steam_Data');
    let collection = db.collection('Current_Players');

    results = await collection.find({'Data.Title': title, 'Updated': {$gte: today}}).toArray();
    res.setHeader('Access-Control-Allow-Origin',  '*')
    res.format({
        'application/json': () => {
            res.jsonp(results);
        }
    });

}







