const express = require('express');
const { MongoClient } = require('mongodb'); 
const app = express();

let connection, collection;

app.get('/', (req, res) => {
   res.send('Hello World');
})

app.post('/stages', (req, res) => {

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
   }
   catch(e){
       console.log(`failed to connect: ${e}`)
   }



   console.log("Example app listening at http://%s:%s", host, port);
})