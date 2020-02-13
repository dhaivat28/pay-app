import React, { useState } from 'react';
import {Button} from "@material-ui/core";
import { Formik,Form, ErrorMessage} from 'formik';
import axios from 'axios';
import SubscriptionDetails from './Components/SubscriptionDetails';
import {MaterialInput, MaterialRadio, CustomError} from './Components/BaseFields';
import Results from './Components/Results';

import {SubscriptionForm} from './Validations/SubscriptionForm';
import styled from 'styled-components';

const FormBox = styled.div`
  padding:40px;
  margin-top:75px;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  max-height:600px;
`;

const App = () => {

  const  handleSubmit = (data, {setSubmitting}) => {
    setSubmitting(true); 
    axios.post(`http://localhost:3070/createSubscription`,data)
    .then(res => {
      if(res.data)
      {
        setState({
          ...state,
          data: res.data
        })
      }
    })
    setSubmitting(false);
  }

  const [state, setState] = useState({ data: '', });
  const {data} = state;
  
  return (
    <div className="App container">
      <div className="row">
      <FormBox className="col-lg-6 col-md-12 col-sm-6 col-sm-12">
        <h2>Create Subscription</h2><br></br>
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
              <MaterialInput label="Subscription Amount" name="amount" type="number" />          
              <div className="form-group mb-4">
                <label htmlFor="subscriptionType"> Type of Subscription &nbsp;&nbsp;</label>
                <MaterialRadio label="Daily" name="subscriptionType" value="daily" type="radio"/>
                <MaterialRadio label="Weekly" name="subscriptionType" value="weekly" type="radio"/>
                <MaterialRadio label="Monthly" name="subscriptionType" value="monthly" type="radio"/>
                <ErrorMessage name="subscriptionType" component={CustomError}/>
              </div>
              {values.subscriptionType === "weekly" || values.subscriptionType === "monthly" ? <SubscriptionDetails subscriptionType={values.subscriptionType} />: ""}         
              <MaterialInput label="Start Date" name="startDate" type="date" />
              <MaterialInput label="End Date" name="endDate" type="date" />
              <Button className="mt-2" size="medium" disabled={isSubmitting} variant="contained" color="primary" type="submit">Create Subscription</Button>
             </Form>
              {/* <pre>{JSON.stringify(values,null,2)}</pre> */}
            </>
            )}
          </Formik>
      </FormBox>
        {data ? <Results data={data} /> : ""}
      </div>
    </div>
  );
}

export default App;

