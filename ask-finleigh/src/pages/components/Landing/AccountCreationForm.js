import React, { Component } from "react";
import { Button, TextField } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import "../../../styles/Home.css";
import ROUTES from "../../../Routes";

// Helper Functions
function checkEmail(text) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text);
}
// ====================================================

export default class AccountCreationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confPassword: "",
            open: false,
            loading: false,
            formErrors: {
                emailError: "",
                passError: "",
                confPassError: "",
                firstNameError: "",
                lastNameError: "",
            }
        };
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        let errors = this.state.formErrors;

        switch (name) {
            case "email":
                errors.emailError = checkEmail(value) || value.length === 0 ? "" : "Invalid email format";
                break;
            case "password":
                errors.passError = value.length >= 6 ? "" : "Password must be at least 6 characters long";
                errors.confPassError = value === this.state.password ? "" : "Passwords do not match";
                break;
            case "confPassword":
                errors.confPassError = value === this.state.password || this.state.password.length === 0 ? "" : "Passwords do not match";
                break;
            case "firstName":
                errors.firstNameError = value.length > 0 ? "" : "First name cannot be blank";
                break;
            case "lastName":
                errors.lastNameError = value.length > 0 ? "" : "Last name cannot be blank";
                break;
            default:
                break;
        }

        this.setState({ formErrors: { ...errors }, [name]: value });
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0
            && this.state.confPassword.length > 0 && this.state.formErrors.passError
            === "" && this.state.formErrors.emailError === ""
            && this.state.formErrors.confPassError === ""
            && this.state.formErrors.firstNameError === ""
            && this.state.formErrors.lastNameError === "";
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter' && this.validateForm()) {
            this.handleSubmit(e);
        }
    }

    handleClose = event => {
        this.setState({ open: false });
    }

    handleSubmit = event => {
        this.setState({ loading: true });
        const { email, password, firstName, lastName } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password).then((userC) => { // userC is a promise and not the user object
                this.props.firebase.db.ref('users/' + userC.user.uid).set({
                    fName: firstName,
                    lName: lastName,
                    email: email,
                    account_type: "user",
                    occupation: ""
                    // Can add more parameters if necessary
                });
                console.log("[SUCCESS] User account has been successfully created");

                userC.user.updateProfile({ displayName: firstName }).then(() => {
                    console.log("[SUCCESS] User profile has been successfully updated");
                    this.props.history.push(ROUTES.MAIN_CHAT);
                }).catch(error => {
                    console.log("[FAILURE] User profile was not successfully updated");
                });
  
            }).catch(error => {
                console.log("[FAILURE] Failed to create the specified user with the given information");
                this.setState({ loading: false, open: true });
            });

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    InputProps={styles.loginProps}
                    InputLabelProps={styles.loginLabelProps}
                    FormHelperTextProps={styles.loginProps}
                    style={{ width: '100%' }}
                    id="firstName"
                    name="firstName"
                    label="Your first name"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    value={this.state.firstName}
                    error={this.state.formErrors.firstNameError !== ""}
                    helperText={this.state.formErrors.firstNameError}
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
                    label="Your last name"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    value={this.state.lastName}
                    error={this.state.formErrors.lastNameError !== ""}
                    helperText={this.state.formErrors.lastNameError}
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
                    variant="outlined"
                    margin="normal"
                    value={this.state.email}
                    error={this.state.formErrors.emailError !== ""}
                    helperText={this.state.formErrors.emailError}
                    onChange={this.handleChange}
                />
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
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.handleChange}
                    error={this.state.formErrors.passError !== ""}
                    helperText={this.state.formErrors.passError}
                />
                <TextField
                    InputProps={styles.loginProps}
                    InputLabelProps={styles.loginLabelProps}
                    FormHelperTextProps={styles.loginProps}
                    style={{ width: '100%' }}
                    id="confPassword"
                    name="confPassword"
                    label="Confirm your password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={this.state.confirmPass}
                    onChange={this.handleChange}
                    error={this.state.formErrors.confPassError !== ""}
                    helperText={this.state.formErrors.confPassError}
                    onKeyPress={this.onKeyPress}
                />
                <Button
                    style={styles.buttonProps.style}
                    className="register-button"
                    variant="contained"
                    color="primary"
                    size="large"
                    margin="normal"
                    disabled={(!this.state.loading && !this.validateForm()) || this.state.loading}
                    onClick={this.handleSubmit}
                >
                    Register
              </Button>
                {this.state.loading && <CircularProgress size={34} style={{ position: 'absolute', top: '93%', left: '45%' }} />}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    bodyStyle={{ backgroundColor: 'red' }}
                    style={{ position: 'absolute', top: '-110%', left: '6%' }}
                    message={<span id="message-id">Email is already in use</span>}
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
            </form>
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
    },

    buttonProgress: {
        color: '#fff',
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}