import React, { Component } from "react";
import {
    Button, TextField, Typography, Card, CardContent,
    Snackbar, CircularProgress, Grid
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import "../styles/Account.css";

// Helper Functions
function checkEmail(text) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text);
}

export default class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            oldEmail: "",
            email: "",
            password: "",
            confPass: "",
            occupation: "",
            open: false,
            loading: false,
            updatedSuccess: false,
            formErrors: {
                emailError: "",
                passError: "",
                confPassError: "",
                firstNameError: "",
                lastNameError: "",
            }
        }

        // Get the user's data from the database and set them as the default fields in the inputs
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                this.props.firebase.db.ref('users/' + authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        var fName = (snapshot.val().fName !== undefined ? snapshot.val().fName : 'n/a');
                        var lName = (snapshot.val().lName !== undefined ? snapshot.val().lName : 'n/a');
                        var email = (snapshot.val().email !== undefined ? snapshot.val().email : 'n/a');
                        var occ = (snapshot.val().occupation !== undefined ? snapshot.val().occupation : 'n/a');
                        this.setState({ firstName: fName, lastName: lName, oldEmail: email, email: email, occupation: occ });
                    });
            }
        );
    }

    handleSubmit = event => {
        this.setState({ loading: true });
        this.props.firebase
            .doSignInWithEmailAndPassword(this.state.oldEmail, this.state.password)
            .then(userC => {
                var accType = this.props.adminCheck ? "admin" : "user";
                // If the user changed their email, then make an attempt to update it
                if (this.state.email !== this.state.oldEmail) {
                    userC.user.updateEmail(this.state.email);
                    this.setState({ updateEmail: true, oldEmail: this.state.email });
                    this.props.firebase.db.ref('users/' + userC.user.uid).set({
                        fName: this.state.firstName,
                        lName: this.state.lastName,
                        email: this.state.email,
                        occupation: this.state.occupation,
                        account_type: accType

                    })
                } else {
                    this.props.firebase.db.ref('users/' + userC.user.uid).set({
                        fName: this.state.firstName,
                        lName: this.state.lastName,
                        email: this.state.oldEmail,
                        occupation: this.state.occupation,
                        account_type: accType

                    });
                }
                console.log("[SUCCESS] Account information has been updated for user with the email: " + this.state.email);
                this.setState({ loading: false, open: true, updatedSuccess: true });
            }).catch(error => {
                console.log(error);
                console.log("[ERROR] There was an issue while trying to update your email." +
                    " Please ensure your new email is of a valid format and that your password is correct.");
                this.setState({ loading: false, open: true, updatedSuccess: false });
            });


    }

    validateForm = () => {
        return this.state.formErrors.passError === ""
            && this.state.formErrors.confPassError === ""
            && this.state.formErrors.firstNameError === ""
            && this.state.formErrors.lastNameError === ""
            && this.state.password.length > 0
            && this.state.confPass.length > 0;
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        let errors = this.state.formErrors;

        switch (name) {
            case "firstName":
                errors.firstNameError = value.length > 0 ? "" : "First name cannot be blank";
                break;
            case "lastName":
                errors.lastNameError = value.length > 0 ? "" : "Last name cannot be blank";
                break;
            case "email":
                errors.emailError = checkEmail(value) || value.length === 0 ? "" : "Invalid email format";
                break;
            case "occupation":
                errors.occupationError = value.length > 0 ? "" : "Occupation cannot be left blank";
                break;
            default:
                break;
        }
        this.setState({ formErrors: { ...errors }, [name]: value });
    }

    handleClose = event => {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className="AccountPage" >
                <Typography variant="h2" component="h2" gutterBottom>My Account Information</Typography>
                <Card>
                    <CardContent>
                        <Grid container justify="space-around" direction="row" alignItems="flex-start" spacing={4}>
                            <Grid item xs={5}>
                                <TextField
                                    InputProps={styles.loginProps}
                                    InputLabelProps={styles.loginLabelProps}
                                    FormHelperTextProps={styles.loginProps}
                                    style={{ width: '100%' }}
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    margin="normal"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                >
                                </TextField>
                                <TextField
                                    InputProps={styles.loginProps}
                                    InputLabelProps={styles.loginLabelProps}
                                    FormHelperTextProps={styles.loginProps}
                                    style={{ width: '100%' }}
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    margin="normal"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                >
                                </TextField>
                                <TextField
                                    InputProps={styles.loginProps}
                                    InputLabelProps={styles.loginLabelProps}
                                    FormHelperTextProps={styles.loginProps}
                                    style={{ width: '100%' }}
                                    id="email"
                                    name="email"
                                    label="Your email"
                                    type="email"
                                    margin="normal"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    InputProps={styles.loginProps}
                                    InputLabelProps={styles.loginLabelProps}
                                    FormHelperTextProps={styles.loginProps}
                                    style={{ width: '100%' }}
                                    id="occupation"
                                    name="occupation"
                                    label="Occupation"
                                    type="email"
                                    margin="normal"
                                    value={this.state.occupation}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    InputProps={styles.loginProps}
                                    InputLabelProps={styles.loginLabelProps}
                                    FormHelperTextProps={styles.loginProps}
                                    style={{ width: '100%' }}
                                    id="password"
                                    name="password"
                                    label="Your password"
                                    type="password"
                                    margin="normal"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    InputProps={styles.loginProps}
                                    InputLabelProps={styles.loginLabelProps}
                                    FormHelperTextProps={styles.loginProps}
                                    style={{ width: '100%' }}
                                    id="confPass"
                                    name="confPass"
                                    label="Confirm your password"
                                    type="password"
                                    margin="normal"
                                    value={this.state.confPass}
                                    onChange={this.handleChange}
                                    onKeyPress={this.onKeyPress}
                                />
                                <div className="updateBtnMsg" alignItems="center">
                                    <Button
                                        style={styles.buttonProps.style}
                                        className="update-button"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        margin="normal"
                                        disabled={(!this.state.loading && !this.validateForm()) || this.state.loading}
                                        onClick={this.handleSubmit}
                                    >
                                        Update
                                    </Button>
                                    <div className="updateMsg" alignItems="center">
                                        <Typography variant="h5" display="block" gutterBottom>To update your changes, enter and confirm your password</Typography>
                                    </div>
                                </div>
                                {this.state.loading && <CircularProgress size={34} style={{ position: 'absolute', top: '56%', left: '71%' }} />}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    bodyStyle={{ backgroundColor: 'red' }}
                    style={{ position: 'relative' }}
                    message={<span id="message-id">{this.state.updatedSuccess ?
                        "Your account information has been updated" : "Failed to updated your account information"}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

// Properties for login textfields (email and password)
const styles = {
    loginProps: {
        style: { fontSize: '15px', fontWeight: 'normal' }
    },

    loginLabelProps: {
        style: { fontSize: '15px', fontWeight: 'normal', color: '#A9A9A9' }
    },

    buttonProps: {
        style: { top: '10px', fontSize: '15px', width: '100%' }
    }
}