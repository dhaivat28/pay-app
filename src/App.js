import React, { useState} from 'react';
import {TextField, Button, Radio, FormControlLabel} from "@material-ui/core";
import { Formik, useFormik, Field, Form, ErrorMessage,useField} from 'formik';

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
    <FormControlLabel {...field} {...props} control={<Radio/>} label={label}/>
  );
};

const AskDay = (props) => {
  
  if (props.subscriptionType && props.subscriptionType === "weekly")
  {   
    return( 
      <div className="form-group">
        <label htmlFor="day"> Please select a day &nbsp;&nbsp;</label>
        <Field as="select" name="day">
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </Field>
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

const App = () => {

  return (
    <div className="App container">
      <div className="row align-items-center">
      <div className="col-lg-6 mt-5">
      <Formik 
            initialValues={{
            amount:'', 
            subscriptionType:'',
            day:'',
            date:''}} 
            onSubmit={data => console.log(data)}        
          >

            {({values}) => (
            <>
              <Form>

              <MaterialInput label="Please Enter Amount" name="amount" type="number" />
              <div className="form-group">
              <label htmlFor="subscriptionType"> Type of Subscription &nbsp;&nbsp;</label>
                <MaterialRadio label="Daily" name="subscriptionType" value="daily" type="radio"/>
                <MaterialRadio label="Weekly" name="subscriptionType" value="weekly" type="radio"/>
                <MaterialRadio label="Monthly" name="subscriptionType" value="monthly" type="radio"/>
              </div>
              {values.subscriptionType == "weekly" || values.subscriptionType == "monthly" ? <AskDay subscriptionType={values.subscriptionType} />: ""}
              <Button variant="contained" color="primary" type="submit">Submit</Button>

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

