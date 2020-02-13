const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3068;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
let moment = require('moment');

const getInvoiceDates = (startDate, endDate, incrementDays, incrementTerm) => {
      let dateArray = [];
      while (moment(startDate) <= moment(endDate)) {
          dateArray.push( moment(startDate).format('DD/MM/YYYY'));
          startDate = moment(startDate).add(incrementDays, incrementTerm);
      }
      return dateArray;
} 

app.get('/', (req, res) => {
      res.send('Hello World, from express');
});

app.post('/sub',(req,res) => {
      
      const request = req.body;
      let { subscriptionType, day, date, startDate, endDate} = request;
      let result = request, invoiceDates;
      let daysDifference = 0;
      let actualStartDate;

      if(subscriptionType === "daily")
      {     
            actualStartDate = moment(startDate).add(1, 'days');
            invoiceDates = getInvoiceDates(actualStartDate, endDate, 1, 'days');
            result['invoiceDates']= invoiceDates;

      } else if (subscriptionType === "weekly")
      {
            let selectedDay = parseInt(day);
            const weekDay = moment(startDate).isoWeekday();
           
            if(weekDay < selectedDay)
            {
                  daysDifference = selectedDay - weekDay;
                  actualStartDate = moment(startDate).add(daysDifference, 'days');
                  invoiceDates = getInvoiceDates(actualStartDate, endDate, 7, 'days');
                  result['invoiceDates']= invoiceDates;
  
            } else {
                  actualStartDate = moment(startDate).add(7, 'days').isoWeekday(selectedDay).toDate();
                  invoiceDates = getInvoiceDates(actualStartDate, endDate, 7,'days');    
                  result['invoiceDates']= invoiceDates;
            }
      }
      else {      
           
            let extractedDate = moment(startDate).get('date');
            let selectedDate = parseInt(date);

            if(extractedDate < selectedDate)
            {          
                  daysDifference = selectedDate - extractedDate;
                  actualStartDate = moment(startDate).add(daysDifference, 'days');
                  invoiceDates = getInvoiceDates(actualStartDate, endDate, 1, 'month');
                  result['invoiceDates']= invoiceDates;

            } else {
                  daysDifference = extractedDate - selectedDate;
                  actualStartDate = moment(startDate).add(1, 'month').subtract(daysDifference, "days");
                  invoiceDates = getInvoiceDates(actualStartDate, endDate, 1, 'month');
                  result['invoiceDates']= invoiceDates;
            }
      }
      
      console.log(result);
      res.send(result);
});

app.listen(port, () => console.log(`Hello world! I am listening on port ${port}!`))