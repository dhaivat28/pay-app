import React, { useState} from 'react';
import {TextField, Button, Radio, FormControlLabel} from "@material-ui/core";
import { Formik, useFormik, Field, Form, ErrorMessage,useField} from 'formik';

const MaterialInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return(
  <div style={{padding:'15px'}} >
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
        <h1>Weekly</h1>
      );
  } 
  else if (props.subscriptionType && props.subscriptionType === "monthly")
  {
    return(
      <h1>Monthly</h1>   
    );
  }
};

const App = () => {

  const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <div className="App container">
      <div className="row">
      <div className="col-lg-6">
      <Formik 
            initialValues={{amount:'', subscriptionType:''}} 
            onSubmit={data => console.log(data)}        
          >

            {({values, handleSubmit}) => (
            <>
              <Form>
                
                <MaterialInput label="Please Enter Amount" name="amount" type="text" />
               
                <MaterialRadio label="Daily" name="subscriptionType" value="daily" type="radio"/>
                <MaterialRadio label="Weekly" name="subscriptionType" value="weekly" type="radio"/>
                <MaterialRadio label="Monthly" name="subscriptionType" value="monthly" type="radio"/>

              {values.subscriptionType == "weekly" || values.subscriptionType == "monthly" ? <AskDay subscriptionType={values.subscriptionType} />: ""}
              <br></br>
              <Button type="submit">Submit</Button>
             </Form>
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

