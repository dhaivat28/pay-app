import React from 'react'
import {Field, ErrorMessage} from 'formik';
import {MaterialInput, CustomError} from '../Components/baseFields';

const SubscriptionDetails = (props) => {
      if (props.subscriptionType && props.subscriptionType === "weekly")
      {   
        return( 
          <div className="form-group">
            <label htmlFor="day"> Please select a day &nbsp;&nbsp;</label>
            <Field as="select" name="day">
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            <option value="7">Sunday</option>
          </Field>
          <ErrorMessage component={CustomError} name="day"/>
          </div>
          );
      } 
      else if (props.subscriptionType && props.subscriptionType === "monthly")
      {
        return(
              <div className="form-group">
              <MaterialInput label="Please pick a date of the month" name="date" type="number" />
              </div>
        );
      }
}


export default SubscriptionDetails;