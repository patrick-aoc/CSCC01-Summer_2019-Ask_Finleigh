import { Component } from "react";
import React from "react";

import { Typography, Card, CardContent, Tabs, Tab } from '@material-ui/core';

import Webcrawler from "./components/Admin/Webcrawler";
import History from "./components/Admin/History";
import Documents from "./components/Admin/Documents";
import Analytics from "./components/Admin/Analytics";

import "../styles/Admin.css";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentConfig: "webcrawler"
        }
    }

    changeConfig = (event, value) => {
        this.setState({ currentConfig: value });
    }

    render() {
        return (
            <div className="AdminPage">
                <Typography variant="h2" component="h2" gutterBottom>Admin</Typography>

                <Tabs
                    value={this.state.currentConfig}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.changeConfig}
                >
                    <Tab style={styles.tabProps.style} value="webcrawler" label="Webcrawler Configuration" />
                    <Tab style={styles.tabProps.style} value="documents" label="Upload Documents" />
                    <Tab style={styles.tabProps.style} value="history" label="Query History" />
                    <Tab style={styles.tabProps.style} value="analytics" label="Analytics" />
                </Tabs>

                <Card>
                    <CardContent>
                        {this.state.currentConfig === "webcrawler" &&
                            <Webcrawler/>
                        }

                        {this.state.currentConfig === "documents" &&
                            <Documents/>
                        }

                        {this.state.currentConfig === "history" &&
                            <History/>
                        }

                        {this.state.currentConfig === "analytics" &&
                            <Analytics/>
                        }

                    </CardContent>
                </Card>

            </div>
        );
    }
}

// Properties for login textfields (email and password)
const styles = {
    tabProps: {
        style: { fontSize: '12px', justifyContent: 'center' }
    },

    buttonProps: {
        style: { top: '10px', fontSize: '15px', width: '20%', justifyContent: 'center' }
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
