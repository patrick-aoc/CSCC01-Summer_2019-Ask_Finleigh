import { Component } from "react";
import React from "react";

import { Grid } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import "../styles/FAQ.css";

export default class FAQ extends Component {
    render() {
        return (
            <div className="faqForm">
                <Card>
                    <CardContent>
                        <div name="closeIcon" align="right">
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Close"
                                onClick={this.props.closeFaq}
                            ><CloseIcon style={styles.closeIcon.style} />
                            </IconButton>
                        </div>
                        <Typography variant="h2" component="h2">
                            FAQ (Frequently Asked Questions)
                        </Typography>
                        <br></br>

                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item>
                                <AccountCircleIcon style={styles.icons.style}></AccountCircleIcon>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item>
                                <div className="questionBlock">
                                    <Typography variant="h4">
                                        What/Who is Finleigh?
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container alignItems="center" justify="flex-start">
                            <Grid item>
                                <FaceIcon style={styles.icons.style}></FaceIcon>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start">
                            <Grid item>
                                <div className="answerBlock">
                                    <Typography variant="h4">
                                        I am Finleigh - a chatbot that is ready to answer any of your FinTech/academic related questions. :)
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item>
                                <AccountCircleIcon style={styles.icons.style}></AccountCircleIcon>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item>
                                <div className="questionBlock">
                                    <Typography variant="h4">
                                        How do I get started?
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container alignItems="center" justify="flex-start">
                            <Grid item>
                                <FaceIcon style={styles.icons.style}></FaceIcon>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start">
                            <Grid item>
                                <div className="answerBlock">
                                    <Typography variant="h4">
                                        First, scroll to the bottom and click the "Create an account" link. From there, provide us with your first name, last name, email, 
                                        and a password to go with your account. From there, you will be redirected to a chat session and you can begin asking your questions!
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item>
                                <AccountCircleIcon style={styles.icons.style}></AccountCircleIcon>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item>
                                <div className="questionBlock">
                                    <Typography variant="h4">
                                        Why do I need to make an account to talk to the bot?
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container alignItems="center" justify="flex-start">
                            <Grid item>
                                <FaceIcon style={styles.icons.style}></FaceIcon>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="flex-start">
                            <Grid item>
                                <div className="answerBlock">
                                    <Typography variant="h4">
                                        I want to keep track of all the questions you ask me so that I can provide you with a set of more 
                                        tailored answers as we continue! :)
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <br></br>

                    </CardContent>
                </Card>
            </div>
        );
    }
}

// Constants for Style
const styles = {
    closeIcon: {
        style: {
            width: '20px',
            height: '20px',
            color: '#198ed9',
            position: 'absolute'
        }
    },
    icons: {
        style: {
            width: '40px',
            height: '40px',
            color: '#198ed9',
        }
    }
}
  // ====================