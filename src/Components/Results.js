import React from 'react'
import styled from 'styled-components';

const ResultBox = styled.div`
padding:40px;
margin-top:75px;
-webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`;

const Title = styled.h5`
      color:#0074D9;
      font-family:Arial, Helvetica, sans-serif;
`;

const SPAN = styled.span`
      color:black;
      font-family:Arial, Helvetica, sans-serif;
`;

const Results = (props) => {

let dateList;

      return (
            <React.Fragment>
                  <ResultBox className="col-lg-4 col-md-12 col-sm-12 offset-sm-0 offset-md-0 offset-lg-2 ">                 
                        <h2>Subscription Details</h2><br></br>       
                        <Title>Amount: AU $ <SPAN>{props.data.amount}</SPAN></Title>
                        <Title>Subscription Type: <SPAN>{props.data.subscriptionType}</SPAN></Title>
                        <Title>Invoice Dates:</Title>
                        {dateList = props.data.invoiceDates.map((item, i) => <li key={i} ><SPAN>{item}</SPAN></li>)}
                  </ResultBox>
            </React.Fragment>
      )
}

export default Results
