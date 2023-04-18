const {MongoClient} = require('mongodb');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;


module.exports = async (req, res) => {

    let newest_entry;
    let results;
    let query_string;

    const client = new MongoClient(dbUrl);
    await client.connect();

    let db = client.db('Steam_Data');
    let collection = db.collection('Current_Players');

    await collection.findOne({}, {sort: {'Updated': -1}
    }).then((res)=> {
        newest_entry = res.Updated;
        query_string = new Date(newest_entry).toISOString();
        console.log(query_string);
    }).then(async () => {
        results = await collection.find({'Updated': {$gte: new Date(query_string)}}).toArray();
    }).then(()=>{
            // res.json(results)
        res.setHeader('Access-Control-Allow-Origin',  '*');
        res.format({
            'application/json': () => {
                res.json(results);
            },
            'text/html': () => {
                res.send(results);
            }
        });
        }

    )
}




