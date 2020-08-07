import { Component } from "react";
import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Typography, IconButton, Grid, Snackbar } from '@material-ui/core';

import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';

import axios from "axios";
import URLS from "../../../Routes";

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            queryRows: [this.createData("Johnny Appleseed", "What is FinTech?", "Watson")],
            open: false
        }
    }

    createData = (username, query, respondent) => {
        return { username, query, respondent };
    }

    getHistory = event => {
        event.preventDefault();
        const placeHolder = [];
        var uAccess = "ADMIN";
        var postData = { userAccess: uAccess };
        axios.post(URLS.API_SERVER + "/chatbot/history", JSON.stringify(postData))
            .then(response => {
                if (response.data.status === "SUCCESS") {
                    console.log(response)
                    for (var key in response.data.data) {
                        if (response.data.data.hasOwnProperty(key)) {

                            // Get the query history from the JSON entry
                            var histArray = response.data.data[key];
                            const currEntries = this.state.queryRows;
                            
                            var currSize = placeHolder.push(this.createData(histArray.user_name, histArray.query, histArray.responder));
                            // If the list is greater than 10, get all the elements of the list except for the first element
                            // (which is the last element in the list)
                            if (currSize > 10) {
                                const subArray = placeHolder.slice(0, 9)
                                this.setState({
                                    queryRows: subArray
                                })
                            } else {
                                this.setState({
                                    queryRows: placeHolder
                                })
                            }
                        }
                    }
                } else {
                    this.setState({ open: true });
                }
            })
            .catch(error => {
                this.setState({ open: true });
                console.log(error)
            });
    }

    handleClose = event => {
        this.setState({ open: false });
    }

    renderHistory = row => {
        const { username, query, respondent } = row;

        return (
            <TableRow>
                <TableCell style={{ fontSize: '15px' }}>{username}</TableCell>
                <TableCell style={{ fontSize: '15px' }}>{query}</TableCell>
                <TableCell style={{ fontSize: '15px' }}>{respondent}</TableCell>
            </TableRow>
        );
    }

    render() {
        const qRows = this.state.queryRows;
        return (
            <div className="history">
                <div className="tableHead" align="center">
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">Press the button on the right to refresh the history</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="delete" onClick={this.getHistory}>
                                <UpdateIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>

                <div className="tableHistory" align="center">
                    <Table style={{ width: '95%' }}>
                        <TableHead>
                            <TableRow style={{ fontSize: '100px' }}>
                                <TableCell style={{ fontSize: '20px' }}>Username</TableCell>
                                <TableCell style={{ fontSize: '20px' }}>Query</TableCell>
                                <TableCell style={{ fontSize: '20px' }}>Respondent</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {qRows.map(row => (this.renderHistory(row)))}
                        </TableBody>
                    </Table>
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
                    message={<span id="message-id">Failed to get the query history</span>}
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
