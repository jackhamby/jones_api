const express = require('express');
const { MongoClient } = require('mongodb'); 
const app = express();

let connection, collection;

app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello World');
})

app.post('/stages', async (req, res) => {
    let document;
    console.log(req.body)
    try {
        document = req.body;
    } 
    catch(e) {
        console.log(e)
        res.status(400);
        res.send("a json body is required");
        return;
    }
    console.log(document)
    const result = await collection.insertOne(document);
    console.log(document)
    res.sendStatus(201);
})

app.get('/stages', async (req, res) => {
    const results = await collection.find().toArray();
    console.log(results);
    res.send(results);
})

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
   }
   catch(e){
       console.error(`failed to connect: ${e}`)
   }



   console.log("listening at http://%s:%s", host, port);
})