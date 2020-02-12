const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

let subs = [];

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.post('/sub',(req,res) => {
      
      const test = req.body;
      console.log(test);
      res.send('Done');

});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))