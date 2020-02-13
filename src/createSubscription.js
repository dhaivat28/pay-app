const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3066;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
let moment = require('moment');

const getInvoiceDates = (startDate, stopDate) => {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('DD/MM/YYYY'));
          currentDate = moment(currentDate).add(7, 'days');
      }
      return dateArray;
} 

const getInvoiceMonthDates = (startDate, stopDate) => {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push(moment(currentDate).format('DD/MM/YYYY'));
          currentDate = moment(currentDate).add(1, 'month');
      }
      return dateArray;
} 

app.get('/', (req, res) => {
      res.send('Hello World, from express');
});

app.post('/sub',(req,res) => {
      
      const request = req.body;
      let {amount, subscriptionType, day, date, startDate, endDate} = request;
     
      let result = {}, invoiceDates;
      result['amount'] = amount;
      result['subscriptionType'] = subscriptionType;
      let daysDifference =0;
      let actualStartDate;

      if(subscriptionType === "daily")
      {
            console.log("daily");

      } else if (subscriptionType === "weekly")
      {
            let selectedDay = parseInt(day);
            const weekDay = moment(startDate).isoWeekday();
           

            if(weekDay < selectedDay)
            {
                  daysDifference = selectedDay - weekDay;
                  actualStartDate = moment(startDate).add(daysDifference, 'days');
                  invoiceDates = getInvoiceDates(actualStartDate, endDate);
                  result['invoiceDates']= invoiceDates;
  
            } else {
                  actualStartDate = moment(startDate).add(7, 'days').isoWeekday(selectedDay).toDate();
                  invoiceDates = getInvoiceDates(actualStartDate, endDate);    
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
                  invoiceDates = getInvoiceMonthDates(actualStartDate, endDate);
                  result['invoiceDates']= invoiceDates;

            } else {
                  daysDifference = extractedDate - selectedDate;
                  actualStartDate = moment(startDate).add(1, 'month').subtract(daysDifference, "days");
                  invoiceDates = getInvoiceMonthDates(actualStartDate, endDate);
                  result['invoiceDates']= invoiceDates;
                  console.log("actual start date",invoiceDates);
            }
      }
      
      res.send(result);
});

app.listen(port, () => console.log(`Hello world! I am listening on port ${port}!`))