

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3061;

let subs = [];

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


let moment = require('moment');

app.get('/', (req, res) => {
      res.send('Hello World, from express');
  });

  function getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('DD/MM/YYYY'));
          currentDate = moment(currentDate).add(7, 'days');
      }
      return dateArray;
  }


app.post('/sub',(req,res) => {
      
      const request = req.body;
      let {amount, subscriptionType, day, date, startDate, endDate} = request;

      if(subscriptionType === "daily")
      {
            console.log("daily");

      } else if (subscriptionType === "weekly")
      {
            let selectedDay = parseInt(day);
            const weekDay = moment(startDate).isoWeekday();
            let actualStartDate, finalDates;

            if(weekDay < selectedDay)
            {
                  let daysDifference = selectedDay - weekDay;
                  actualStartDate = moment(startDate).add(daysDifference, 'days');
                  finalDates = getDates(actualStartDate, endDate);
                  console.log(finalDates);
            } else {
                  actualStartDate = moment(startDate).add(7, 'days').isoWeekday(selectedDay).toDate();
                  finalDates = getDates(actualStartDate, endDate);    
                  console.log(finalDates);
            }
      }
      else {
            console.log("monthly");
            console.log("date",date);

            let x = moment(startDate).get('date');
            console.log("x is ",x);

            if(x < date)
            {
                  console.log("hurrah");
            } else {
                  console.log("nope");
            }

      }
      
      //res.send('Done');
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))