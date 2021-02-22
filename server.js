const express = require('express');
const cors = require('cors')
const app = express();
const { MongoClient } = require('mongodb'); 


let connection, collection;

// TODO: white list calling UI
// var whitelist = ['http://localhost', 'http://64.227.56.145:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
const corsOptions = {

}

app.use(express.json(), cors(corsOptions));

app.get('/', (req, res) => {
   res.send('Hello World');
})

app.post('/stages', async (req, res) => {
    try {
        result = await collection.insertOne(req.body);
    } catch (e){
        console.error(`failed to insert stage: ${e}`);
        res.status(500);
        res.send('failed to insert');
        return;
    }

    res.sendStatus(201);
})

app.get('/stages', async (req, res) => {
    let results;
    let query;
    if (req.query["name"]){
        query = { "name" : req.query["name"]}
    }
    try{
        results = await collection.find(query).toArray();
    } catch(e){
        console.error(`failed to get stages: ${e}`)
        res.status(500);
        res.send('failed to get stages');
        return;
    }
    res.send(results);
});

app.get('/stages')

var server = app.listen(8081, async () => {
   var host = server.address().address;
   var port = server.address().port;
   var url = "mongodb://localhost:27017/jones";

   try {
    connection = await MongoClient.connect(url, { 
        useUnifiedTopology: true 
     });

     collection = connection
        .db("jones")
        .collection("stages")

    await collection.deleteMany();
   } catch(e){
        console.error(`failed to connect: ${e}`)
        process.exit(1);
   }

   console.log("listening at http://%s:%s", host, port);
})