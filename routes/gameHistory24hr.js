const {MongoClient, ServerApiVersion} = require('mongodb');

const credentials = require("../credentials.js");

const dbUrl = `mongodb+srv://sean:${credentials.password}@cluster0.pvuhuo1.mongodb.net/?retryWrites=true&w=majority`;

module.exports = async (req, res) => {
    let db;

    let title = req.body.title;

    let today = new Date().toLocaleString()
    let date = today.split(',')[0];
    let midnightDate = date + " 0:00:00 AM";
    let isoMidnightDate = new Date(midnightDate)

    let results;

    const client = new MongoClient(dbUrl, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        await client.connect();

        db = client.db('Steam_Data');
        let collection = db.collection('Current_Players');

        results = await collection.find({'Data.Title': title, 'Updated': {$gte: isoMidnightDate}}).sort({'Updated': 1}).toArray();
        res.format({
            'application/json': () => {
                res.setHeader('Access-Control-Allow-Origin',  '*')
                res.set('Access-Control-Allow-Origin', 'http://localhost:4200')
                res.jsonp(results);
            }
        });
    }
    finally {
        await client.close()
    }




}







