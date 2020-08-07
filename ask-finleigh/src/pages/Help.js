import { Component } from "react";
import React from "react";

import { Typography, Divider, Card, CardContent } from '@material-ui/core';

import "../styles/Help.css";

export default class Help extends Component {
    render() {
        return (
            <div className="HelpPage">
                <Typography variant="h2" component="h2" gutterBottom>More Frequently Asked Questions!</Typography>

                <Card>
                    <CardContent>
                        <div className="questionsAnswers">
                            <Typography variant="h3" component="h2" gutterBottom>What's the difference between Finleigh and Watson?</Typography>
                            <div className="answers">
                                <Typography variant="h4" component="h2" gutterBottom>When sending a query, you have an option to send it either to Finleigh
                                                                        or Watson - an IBM Assistant. In the end, they're both 2 different bots that basically 
                                                                        do the same thing!</Typography>
                            </div>
                        </div>

                        <Divider />
                        <div className="questionsAnswers">
                            <Typography variant="h3" component="h2" gutterBottom>Where exactly can I start conversing with either one?</Typography>
                            <div className="answers">
                                <Typography variant="h4" component="h2" gutterBottom>You can begin by clicking the menu button on the top left and
                                                                                    clicking on "My Current Session". When you initially log in or
                                                                        create an account, you will already be on this section.</Typography>
                            </div>
                        </div>

                        <Divider />
                        <div className="questionsAnswers">
                            <Typography variant="h3" component="h2" gutterBottom>Is there real-time customer support with a live agent?</Typography>
                            <div className="answers">
                                <Typography variant="h4" component="h2" gutterBottom>No, there is not.</Typography>
                            </div>
                        </div>

                        <Divider />
                        <div className="questionsAnswers">
                            <Typography variant="h3" component="h2" gutterBottom>Where should I ask my field-related questions?</Typography>
                            <div className="answers">
                                <Typography variant="h4" component="h2" gutterBottom>Any question that you may have can be asked in your
                                                                        chat session with Finleigh.</Typography>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
