const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());


let routes = require('./routes/index');
app.use('/', routes);


app.use(function(req, res) {
    res.status(404);
});

// app.listen(PORT, function(){
//     console.log(`Server Started on port ${PORT}`);
// });

app.listen(3000, function(){
    console.log(`Server Started on port ${PORT}`);
});
