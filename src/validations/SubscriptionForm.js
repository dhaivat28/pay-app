import * as Yup from 'yup';

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

        startDate: Yup.string().required(' Required'),

        endDate: Yup.string().required(' Required'),
      
    });
    