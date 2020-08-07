import { Component } from "react";
import React from "react";

import { Button, TextField, CircularProgress, Snackbar } from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import axios from "axios";
import ROUTES from "../../../Routes";

export default class Webcrawler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seed: "https://www.utsc.utoronto.ca/",
            depth: 10,
            loading: false,
            success: true
        }
    }

    startWebcrawler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        var seed = this.state.seed;
        var depth = this.state.depth;
        var postData = { seed: seed, depth: depth, userAccess: "ADMIN" };
        var jsonPostData = postData;
        axios.put(ROUTES.API_SERVER + "/webcrawler", jsonPostData)
            .then(response => {
                console.log(response.data);
                if (response.data.status === "SUCCESS") {
                    this.setState({ loading: false, open: true, success: true });
                } else {
                    this.setState({ loading: false, open: true, success: false });
                }
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false, open: true, success: false });
            });
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    handleClose = event => {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className="webcrawlConfig" align="center">
                <br></br>
                <TextField
                    InputProps={styles.inpProps}
                    InputLabelProps={styles.inpLabelProps}
                    FormHelperTextProps={styles.inpProps}
                    style={{ width: '95%' }}
                    id="seed"
                    name="seed"
                    label="Seed (URL)"
                    type="text"
                    margin="normal"
                    value={this.state.seed}
                    onChange={this.handleChange}
                ></TextField>
                <TextField
                    InputProps={styles.inpProps}
                    InputLabelProps={styles.inpLabelProps}
                    FormHelperTextProps={styles.inpProps}
                    style={{ width: '95%' }}
                    id="depth"
                    name="depth"
                    label="Depth"
                    type="text"
                    margin="normal"
                    value={this.state.depth}
                    onChange={this.handleChange}
                ></TextField>
                <div className="webcrawlButton">
                    <Button
                        style={styles.buttonProps.style}
                        className="webcrawler-start"
                        variant="contained"
                        color="primary"
                        size="large"
                        margin="normal"
                        disabled={this.state.loading}
                        onClick={this.startWebcrawler}>Start Webcrawler</Button>
                    {this.state.loading && <CircularProgress size={34} style={{ position: 'absolute', top: '69%', left: '49%' }} />}
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    style={{ position: 'absolute', top: '40%', left: '50%' }}
                    message={<span id="message-id">{this.state.success ? "Successfully started the webcrawler" : "Failed to start the webcrawler"}</span>}
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
                <br></br>
            </div>
        );
    }
}

// Properties for login textfields (email and password)
const styles = {
    inpProps: {
        style: { fontSize: '15px', fontWeight: 'normal', color: '#198ed9' }
    },

    inpLabelProps: {
        style: { fontSize: '15px', fontWeight: 'normal', color: '#A9A9A9' }
    },

    buttonProps: {
        style: { top: '10px', fontSize: '15px', width: '50%', justifyContent: 'center' }
    },

    buttonProgress: {
        color: '#fff',
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}