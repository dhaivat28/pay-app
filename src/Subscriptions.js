const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createSubscription = require('./Middleware/CreateSubscription');
const app = express();
const port = 3070;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
      res.send('Hello World, from express');
});

app.post('/createSubscription', createSubscription);

app.listen(port, () => console.log(`Hello world! I am listening on port ${port}!`))