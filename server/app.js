const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
// создаем парсер для данных в формате json
const jsonParser = express.json()
let db

app.use(cors())


app.use("/static", express.static('./static/'));

app.post('/user', jsonParser, function(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  // response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  // response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // const test = JSON.stringify(request.body)

  console.log(request.body)
  db.collection('history').insertOne(request.body, (err, result) => {
    if (err) {
      console.log(err)
      return response.sendStatus(500)
    }
  })

  if (!request.body) return response.sendStatus(400)

  // fs.appendFileSync('hello.txt', test)
  
  //response.json(request.body) // отправляем пришедший ответ обратно
})

app.get('/', function(request, response) {
  // response.sendFile(__dirname + '/index.html')
  
  db.collection('history').find().toArray((err, docs) => {
    if (err) {
      console.log(err);
      return response.sendStatus(500);
    }
    
    response.send(JSON.stringify(docs));
  })
})

app.get('/info', function(request, response) {
  response.sendFile(__dirname + '/index.html')
})

MongoClient.connect('mongodb+srv://Dl:4455q@cluster0-t8fuz.mongodb.net/test', (err, database) => {
  if(err) {
    return console.log(err)
  }
  db = database.db('history');
  app.listen(3000, () => {
    console.log('Server started')
  })
  
})
