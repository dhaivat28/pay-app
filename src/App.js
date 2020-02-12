import React, { useState} from 'react';
import {TextField, Button, Radio, FormControlLabel} from "@material-ui/core";
import { Formik, useFormik, Field, Form, ErrorMessage,useField} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const MaterialInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return(
  <div className="form-group">
    <label htmlFor={props.name}>{label} &nbsp;&nbsp;</label>
    <Field {...field} {...props} as={TextField}/>
    <ErrorMessage name={props.name}/>
  </div>
  );
};

const MaterialRadio = ({label, ...props}) => {
  const [field] = useField(props);
  return(
    <React.Fragment>
    <FormControlLabel {...field} {...props} control={<Radio/>} label={label}/>
    
    </React.Fragment>
  );
};

const AskDay = (props) => {
  
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
      <ErrorMessage name="day"/>
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
};

const validationSchema = Yup.object({

  amount:  Yup.number().typeError('must be a number').positive('Must be greater than zero').required(' Required'),

  subscriptionType: Yup.string().required('Please pick a Subscription Type'),
  
  day: Yup.string().notRequired().when('subscriptionType', {
    is: (val) => val === "weekly",
    then: Yup.string().required(' Required'),
    }),

  date: Yup.string().notRequired().when('subscriptionType', {
      is: (val) => val === "monthly",
      then: Yup.string().required(' Required'),
    }),

    startDate: Yup.string().required(' Required'),
    endDate: Yup.string().required(' Required'),
  
});

const App = () => {

  const  handleSubmit = (data, {setSubmitting}) => {
                  setSubmitting(true); 
              console.log("data is",data); 
         
              //
              axios.post(`http://localhost:3050/sub`,data)
              .then(res => {
                console.log(res);
              })
              //
              setSubmitting(false);
  }

  return (
    <div className="App container">
      <div className="row align-items-center">
      <div className="col-lg-10 mt-5">
          <Formik 
            initialValues={{
            amount:'', 
            subscriptionType:'',
            day:'',
            date:'',
            startDate:'',
            endDate:''
          }} 
            // onSubmit={(data, {setSubmitting}) => {
            //   setSubmitting(true); 
            //   console.log(data);      
            //   setSubmitting(false);
            // }} 
            onSubmit={handleSubmit}
            validationSchema={validationSchema}       
            >

            {({values, isSubmitting}) => (
            <>
              <Form>

              <MaterialInput label="Please Enter Amount" name="amount" type="number" />
              
              <div className="form-group">
              <label htmlFor="subscriptionType"> Type of Subscription &nbsp;&nbsp;</label>
                <MaterialRadio label="Daily" name="subscriptionType" value="daily" type="radio"/>
                <MaterialRadio label="Weekly" name="subscriptionType" value="weekly" type="radio"/>
                <MaterialRadio label="Monthly" name="subscriptionType" value="monthly" type="radio"/>
                <ErrorMessage name="subscriptionType"/>
              </div>

              {values.subscriptionType === "weekly" || values.subscriptionType === "monthly" ? <AskDay subscriptionType={values.subscriptionType} />: ""}
              
              <MaterialInput label="Subscription Start Date" name="startDate" type="date" />
              <MaterialInput label="Subscription End Date" name="endDate" type="date" />

              <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">Submit</Button>

             </Form>
              <br></br>
              <pre>{JSON.stringify(values,null,2)}</pre>
            </>
            )}
          </Formik>
    
      </div>
      </div>
    </div>
  );
}

export default App;

