import { Component } from "react";
import React from "react";
import Chart from 'react-apexcharts'

import { Typography, IconButton, Grid, Snackbar } from '@material-ui/core';

import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';

import axios from "axios";
import ROUTES from "../../../Routes";

export default class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsFinWat: {
                labels: ['Finleigh', 'Watson'],
                width: '50px'
            },
            seriesFinWat: [0, 0],
            optionsAdUsers: {
                labels: ['Admins', 'Users'],
                width: '50px'
            },
            seriesAdUsers: [0, 0],
            open: false
        }
    }

    refreshGraphs = event => {
        event.preventDefault();
        this.refreshFinWat(event);
        this.refreshAdUsers(event);
    }

    refreshFinWat = async event => {
        event.preventDefault();

        axios.get(ROUTES.API_SERVER + '/webcrawler/analytics/pie')
            .then(response => {
                console.log(response);
                if (response.data.status === "SUCCESS") {
                    const watsonCount = response.data.data["watson"];
                    const finleighCount = response.data.data["indexer"];
                    var newData = [watsonCount, finleighCount]
                    this.setState({ seriesFinWat: newData })
                } else {
                    this.setState({ open: true });
                }
            }).catch(error => {
                console.log(error);
                this.setState({ open: true });
            });
    }

    refreshAdUsers = async event => {
        event.preventDefault();

        axios.get(ROUTES.API_SERVER + '/webcrawler/analytics/userpie')
            .then(response => {
                console.log(response);
                if (response.data.status === "SUCCESS") {
                    const userCount = response.data.data["users"];
                    const adminCount = response.data.data["admins"];
                    var newData = [adminCount, userCount]
                    this.setState({ seriesAdUsers: newData })
                } else {
                    this.setState({ open: true });
                }
            }).catch(error => {
                console.log(error);
                this.setState({ open: true });
            });
    }

    handleClose = event => {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className="analPage">
                <div className="tableHead" align="center">
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">Press the button on the right to refresh the data</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="delete" onClick={this.refreshGraphs}>
                                <UpdateIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <br></br>

                <Grid container justify="space-around">
                    <Grid item>
                        <Typography variant="h4">Queries to Finleigh vs. Queries to Watson</Typography>
                        <Chart options={this.state.optionsFinWat} series={this.state.seriesFinWat} type="pie" width="380" />
                        <br></br>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4">Queries from Users vs. Queries From Admins</Typography>
                        <Chart options={this.state.optionsAdUsers} series={this.state.seriesAdUsers} type="pie" width="380" />
                    </Grid>
                </Grid>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    style={{ position: 'absolute', top: '40%', left: '50%' }}
                    message={<span id="message-id">Failed to get the analytics data</span>}
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