const {MongoClient, ServerApiVersion} = require('mongodb');

const credentials = require("../credentials.js");

// const dbUrl = 'mongodb+srv://' + credentials.username +
//     ':' + credentials.password + '@' + credentials.host + '/' + credentials.database + '?tls=true';
const dbUrl = `mongodb+srv://sean:${credentials.password}@cluster0.pvuhuo1.mongodb.net/?retryWrites=true&w=majority`;

module.exports = async (req, res) => {
    let db;

    let title = req.body.title;
    //console.log(req.body);
    let today = new Date(new Date().toISOString().split('T')[0]);
    today.setHours(today.getHours() - 8);
    //console.log(today.getHours());

    //console.log(new Date().toISOString().split('T')[0]);
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

        results = await collection.find({'Data.Title': title, 'Updated': {$gte: today}}).sort({'Updated': 1}).toArray();
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







