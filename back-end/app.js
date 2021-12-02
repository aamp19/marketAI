const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var { MongoClient } = require('mongodb');
var url = 'mongodb+srv://marketAI:abcd1234@marketai-cluster1.4m8j0.mongodb.net/marketAI-DB?retryWrites=true&w=majority';
var db = null;
var client = null;
let stockTicker = [];

let pythonMessage = [];
async function connect() {
  if (db == null) {
    var options = {
      useUnifiedTopology: true,
    };
    client = await MongoClient.connect(url, options);
    db = await client.db("marketAI-DB");
  }

  return db;
}

async function register(username, password) {
  var conn = await connect();
  var existingUser = await conn.collection('users').findOne({ username });
  // if (existingUser != null) {
  //     throw new Error('exists siiiiuuu')
  // }
  conn.collection('users').insertOne({ username, password })
}
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/signup", async (req, res) => {
  var conn = await connect();
  const firstName = req.body.firstname
  const lastName = req.body.lastname
  const email = req.body.email
  const userName = req.body.username
  const password = req.body.password
  conn.collection('users').insertOne({ firstname: firstName, lastname: lastName, email: email, username: userName, password: password }, (err, result) => {
    console.log(result)
  })
})

app.post('/api/ticker', async (req, res) => {
  let tickerSymbol = req.body.tickerSymbol
  for (let i = 0; i < tickerSymbol.length; i++) {
    // console.log(tickerSymbol[i])
    stockTicker.push(tickerSymbol[i])
  }
  console.log(stockTicker.toString().replace(/,/g, ""))
  stockTicker = stockTicker.toString().replace(/,/g, "")
})

app.get('/api/dashboard', async (req, res) => {
  res.send(`${stockTicker}`)
})

app.post("/api/login", async (req, res) => {
  var conn = await connect();
  const userName = req.body.username
  const password = req.body.password
  conn.collection('users').findOne({ username: userName, password: password }, (err, result) => {
    console.log(result)
  })
})

app.get("/api/content", async (req, res) => {
  var conn = await connect();
  const userName = req.body.username
  const password = req.body.password
  conn.collection('users').findOne({ username: userName, password: password }, (err, result) => {
    console.log(result)
  })
})
let content = '';
const { application } = require('express');



app.post('/api/ML', async (req, res) => {
  const { spawn } = require('child_process');
  const childPython = spawn('python', ['model.py', `${stockTicker}`]);
  console.log('reaches')
  childPython.stdout.on('data', (data) => {
    content = `${data}`
    console.log(`${content}`)

  })
  res.send(`${content}`)
});



// childPython.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// childPython.on('close', (code) => {
//   console.log(`child process exited with code ${code} `);
// });
app.get('/', async (req, res) => {
  res.send('siiiu')

})
app.post('/api/transfer', async (req, res) => {
  res.send(`${pythonMessage}`)

})

app.listen(3001, () => {
  console.log("running on port 3001")
})

