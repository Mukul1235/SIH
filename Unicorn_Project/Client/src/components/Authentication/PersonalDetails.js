import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

export class PersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
  render() {
    const {values, handleChange} = this.props;
    return (
        <MuiThemeProvider>
        <React.Fragment>
        <AppBar title="Personal Details"/>
        <TextField
        hintText="Enter your First Name"
        floatingLabelText="First Name"
        onChange={handleChange('firstName')}
        defaultValue={values.firstName}
        />
        <br />
        <TextField
        hintText="Enter your Last Name"
        floatingLabelText="Last Name"
        onChange={handleChange('lastName')}
        defaultValue={values.lastName}
        />
        <br />
        <TextField
        hintText="Enter your SID"
        floatingLabelText="SID"
        onChange={handleChange('SID')}
        defaultValue={values.SID}
        />
        <br />
        <TextField
        hintText="Enter your Gender"
        floatingLabelText="Gender"
        onChange={handleChange('gender')}
        defaultValue={values.gender}
        />
        <br />
        <Button
        label="Continue"
        primary={true}
        style={styles.button}
        onClick={this.continue}
        />
        </React.Fragment>
        </MuiThemeProvider>
    )
  }
}

const styles = {
    button: {
        margin:15
    }
}

export default PersonalDetails