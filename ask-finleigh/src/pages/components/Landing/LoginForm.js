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

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            formErrors: {
                emailError: "",
                passError: "",
            },
            open: false
        };
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0
            && this.state.formErrors.emailError === "";
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        let errors = this.state.formErrors;

        switch (name) {
            case "email":
                errors.emailError = checkEmail(value) || value.length === 0 ? "" : "Invalid email format";
                break;
            default:
                break;
        }

        this.setState({ formErrors: { ...errors }, [name]: value });
    }

    handleSubmit = event => {
        this.setState({ loading: true });
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log("[SUCCESS] The user has been successfully authenticated");
                console.log(authUser);
                this.setState({ loading: false });
                this.props.history.push(ROUTES.MAIN_CHAT);
            })
            .catch(error => {
                console.log("[FAILURE] The user was unsuccessfully authenticated");
                this.setState({ loading: false, open: true });
            });

    }

    onKeyPress = (e) => {
        if (e.key === 'Enter' && this.validateForm()) {
            this.handleSubmit(e);
        }
    }

    handleClose = event => {
        this.setState({ open: false });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    InputProps={styles.loginProps}
                    InputLabelProps={styles.loginLabelProps}
                    FormHelperTextProps={styles.loginProps}
                    style={{ width: '100%' }}
                    id="email-input"
                    name="email"
                    label="Email"
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
                    style={{ width: '100%' }}
                    id="pwd-input"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    margin="normal"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onKeyPress={this.onKeyPress}
                />
                <Button
                    style={styles.buttonProps.style}
                    className="login-button"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={(!this.state.loading && !this.validateForm()) || this.state.loading}
                    onClick={this.handleSubmit}
                >
                    Login
          </Button>
                {this.state.loading && <CircularProgress size={34} style={{ position: 'absolute', top: '85%', left: '45%' }} />}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    style={{ position: 'absolute', top: '-120%', left: '6%' }}
                    message={<span id="message-id">Invalid username or password</span>}
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
