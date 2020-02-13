import * as Yup from 'yup';
import moment from 'moment';

export const SubscriptionForm = Yup.object({

      amount:  Yup.number().typeError('must be a number').positive('Must be greater than zero').required(' Required'),

      subscriptionType: Yup.string().required('Please pick a Subscription Type'), 

      day: Yup.string().notRequired().when('subscriptionType', {
        is: (val) => val === "weekly",
        then: Yup.string().required(' Required'),
        }),

      date: Yup.number().notRequired().when('subscriptionType', {
          is: (val) => val === "monthly",
          then: Yup.number().typeError('must be a number').positive('Please enter positive date').min(1).max(28).required(' Required'),
        }),

      startDate: Yup.date().required(' Required'),
      
      endDate:Yup.date().test('check Date difference', 'The Subscription cant be more than 3 months', function (value) { 

        let startDate = moment(this.parent['startDate']);
        let endDate = moment(value);
        let asDays = moment.duration(endDate.diff(startDate)).asDays();
    
          if(asDays > 90)
          {
            return false;
          } else {
            return true;
          }
    }),
 
});
    