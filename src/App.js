import React from 'react';
import {Button} from "@material-ui/core";
import { Formik,Form, ErrorMessage} from 'formik';
import axios from 'axios';
import SubscriptionDetails from './Components/SubscriptionDetails';
import {MaterialInput, MaterialRadio} from './Components/baseFields';
import {SubscriptionForm} from './validations/SubscriptionForm';


const App = () => {

  const  handleSubmit = (data, {setSubmitting}) => {
              setSubmitting(true); 
              console.log("data is",data); 
              axios.post(`http://localhost:3061/sub`,data)
              .then(res => {
                console.log(res);
              })
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
            onSubmit={handleSubmit}
            validationSchema={SubscriptionForm}>

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

              {values.subscriptionType === "weekly" || values.subscriptionType === "monthly" ? <SubscriptionDetails subscriptionType={values.subscriptionType} />: ""}
              
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

