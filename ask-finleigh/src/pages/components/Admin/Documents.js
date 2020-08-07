import { Component } from "react";
import React from "react";

import {
    Button, Typography, Grid, Snackbar, CircularProgress, Card, CardContent,
    Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import axios from "axios";
import ROUTES from "../../../Routes";

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export default class Documents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFileName: null,
            currentFile: null,
            loading: false,
            success: false,
            open: false,
            recipient: "INDEXER"
        }
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSelection = event => {
        this.setState({ recipient: event.target.value });
    }

    submit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const environmentID = "2ceba8e2-3901-4045-b16c-66d027676bb6";
        const collectionID = "8cbf7dac-7abb-464f-aa10-52b9a1a61848";
        const apiKey = "5ryRc2Ppy2RU_jUx3_vTwyOV6swGgNElRk7U2lkG4TGM";

        // Put the uploaded file's contents into a form data object
        var form_data = new FormData();
        form_data.append('file', this.state.currentFile)

        if (this.state.recipient === "WATSON") {
            axios.post(`https://gateway.watsonplatform.net/discovery/api/v1/environments/${environmentID}/collections/${collectionID}/documents?version=2019-04-30`,
                form_data,
                {
                    headers: { 'Content-Type': `multipart/form-data; application/json; charset=utf8` },
                    auth: {
                        username: "apikey",
                        password: apiKey
                    }
                }).then(response => {
                    console.log(response);
                    this.setState({ open: true, success: true, loading: false });
                }).catch(error => {
                    console.log(error);
                    this.setState({ open: true, success: false, loading: false });
                });
        } else {
            axios.post(ROUTES.API_SERVER + "/webcrawler", form_data, { headers: { 'Content-Type': `multipart/form-data` } }
            ).then(response => {
                this.setState({ loading: false });
                if (response.data.status === "SUCCESS") {
                    this.setState({ open: true, success: true, loading: false });
                } else {
                    this.setState({ open: true, success: false, loading: false });
                }
            }).catch(error => {
                this.setState({ open: true, success: false, loading: false });
            });
        }
    }

    submitFile = event => {
        if (event.target.files[0] !== null && event.target.files[0] !== undefined) {
            this.setState({ currentFile: event.target.files[0], currentFileName: event.target.files[0].name })
        }
    }

    handleClose = event => {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className="documentUpload">
                <br></br>
                <div align="center">
                    <FormControl style={{ paddingTop: '5px', flexShrink: '2' }} component="fieldset">
                        <FormLabel
                            style={styles.radioGroupLabel.style}
                        >I want my file to go to...
                    </FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.recipient}
                            onChange={this.handleSelection} row>
                            <FormControlLabel
                                value="INDEXER"
                                control={<Radio color="primary" />}
                                label={<Typography type="h4" style={styles.radioGroup.style}>Finleigh</Typography>}
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="WATSON"
                                control={<Radio color="primary" />}
                                label={<Typography type="h4" style={styles.radioGroup.style}>Watson</Typography>}
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <br></br>

                <form action={ROUTES.API_SERVER + "/webcrawler"} method="post" encType="multipart/form-data" onSubmit={this.submit} target="_blank">
                    <Grid container spacing={3} justify="center">
                        <Grid item>
                            <Button variant="outlined" color="primary" component="label" style={styles.buttonPropsUpload.style}>
                                Upload file
                                <input
                                    multiple
                                    style={{ display: 'none' }}
                                    id="button-file"
                                    type="file"
                                    name="files"
                                    onChange={this.submitFile}
                                />
                            </Button>
                        </Grid>
                        <Grid item>
                            <button margin="normal">SEND FILE TO SERVER</button>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="h4"
                                style={{ paddingTop: "7px" }}
                            >File:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="h4"
                                style={{ paddingTop: "7px" }}
                            >{this.state.currentFileName}</Typography>
                        </Grid>
                    </Grid>
                </form>
                <br></br>

                <Divider />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    style={{ position: 'absolute', top: '40%', left: '50%' }}
                    message={<span id="message-id">{this.state.success ? "File has been successfully sent" : "File failed to send"}</span>}
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
                <Typography variant="h5" align="center">Please ensure the contents of your file are in the following format:</Typography>
                {this.state.loading && <CircularProgress size={34}
                    style={{ position: 'absolute', top: '58.5%', left: '50%', color: '#198ed9' }} />}
                <Card style={{ margin: 'auto', width: '50%' }}>
                    <CardContent>

                        <Typography variant="body" style={{ fontWeight: "normal" }}>Question: Some question 1?</Typography>
                        <br></br>
                        <Typography variant="body" style={{ fontWeight: "normal" }}>Answer: Some answer 1.</Typography>
                        <br></br>
                        <Typography variant="body" style={{ fontWeight: "normal" }}>- - -</Typography>
                        <br></br>
                        <Typography variant="body" style={{ fontWeight: "normal" }}>Question: Some question 2?</Typography>
                        <br></br>
                        <Typography variant="body" style={{ fontWeight: "normal" }}>Answer: Some answer 2.</Typography>
                        <br></br>
                    </CardContent>
                </Card>
                <br></br>
            </div >
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
        style: { top: '10px', fontSize: '15px', width: '50%', justifyContent: 'center', position: 'relative' }
    },

    buttonPropsUpload: {
        style: { fontSize: '12px', justifyContent: 'center', color: '#198ed9' }
    },

    buttonProgress: {
        color: '#fff',
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

    radioGroupLabel: {
        style: {
            color: '#000',
            fontSize: '15px'
        }
    },

    radioGroup: {
        style: {
            color: '#000',
            fontSize: '17px'
        }
    },

}