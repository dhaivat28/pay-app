import {TextField, Radio, FormControlLabel} from "@material-ui/core";
import {Field, ErrorMessage,useField} from 'formik';
import React from 'react';

export const MaterialInput = ({ label, ...props }) => {
      const [field] = useField(props);
      return(
      <div className="form-group">
        <label htmlFor={props.name}>{label} &nbsp;&nbsp;</label>
        <Field {...field} {...props} as={TextField}/>
        <ErrorMessage name={props.name}/>
      </div>
      );
    };
    
export const MaterialRadio = ({label, ...props}) => {
      const [field] = useField(props);
      return(
        <FormControlLabel {...field} {...props} control={<Radio/>} label={label}/>
      );
    };
    