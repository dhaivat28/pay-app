

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3052;

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
            console.log("Weekly");

            let selectedDay = parseInt(day);
            const weekDay = moment(startDate).isoWeekday();
            
            // console.log("weekDay",weekDay);
            // console.log("selectedDay",selectedDay);
            
            if(weekDay < selectedDay)
            {
                  let daysDifference = selectedDay - weekDay;
                  let actualStartDate = moment(startDate).add(daysDifference, 'days');
                  let finalDates = getDates(actualStartDate, endDate);
                  console.log(finalDates);
            } else {
                  console.log("ss is",selectedDay);
                  let x = moment(startDate).add(7, 'days').toDate();
                  let y = moment(x).isoWeekday(selectedDay + 1).toDate();
                  console.log("x is",x);
                  console.log("y is",y);
            }
      }
      else {
            console.log("monthly");
      }
      
      //res.send('Done');
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))