const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
require('dotenv').config()
//middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ayaiuzh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const serviceCollection = client.db('taskone').collection('services')
      app.get('/service', async (req, res) => {
        const query = {}
        const cursor = serviceCollection.find(query); 
      const services = await cursor.toArray();
        res.send(services)
      })
  
      app.get('/service/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id:ObjectId(id) }
        const service = await serviceCollection.findOne(query);
        res.send(service)
      })
     
  
    }
    finally {
  
    }
  }
  run().catch(console.dir);
  

app.get('/', (req, res) => {
    res.send('Hello servoce !')
  })
  
  app.listen(port, () => {
    console.log(`Example service listening on port ${port}`)
  })