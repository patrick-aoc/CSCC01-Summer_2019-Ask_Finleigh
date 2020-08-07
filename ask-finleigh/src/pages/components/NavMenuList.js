import React, { Component } from "react";

import { Divider, ListItem, ListItemIcon, ListItemText, List, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import HelpIcon from '@material-ui/icons/Help';
import StarsIcon from '@material-ui/icons/Stars'

export default class NavMenuList extends Component {
    signOut = () => {
        this.props.handleSignOut();
    }

    switchToAccount = event => {
        this.props.changeToAccount(event);
    }

    switchToChat = event => {
        this.props.changeToChatSession(event);
    }

    switchToHelp = event => {
        this.props.changeToHelp(event);
    }

    switchToAdmin = event => {
        this.props.changeToAdmin(event);
    }

    render() {
        return (
            <div className="NavList" style={{ width: 250 }}>
                <List>
                    {!this.props.anonCheck && <ListItem button key="My Account" onClick={this.switchToAccount}>
                        <ListItemIcon><AccountBoxIcon style={styles.icons.style} /></ListItemIcon>
                        <ListItemText
                            primary={<Typography type="h4" style={{ color: '#000', fontSize: '17px' }}>My Account</Typography>}
                        />
                    </ListItem>}
                    <ListItem button key="My Current Session" onClick={this.switchToChat}>
                        <ListItemIcon><QuestionIcon style={styles.icons.style} /></ListItemIcon>
                        <ListItemText
                            primary={<Typography type="h4" style={{ color: '#000', fontSize: '17px' }}>My Current Session</Typography>}
                        />
                    </ListItem>
                </List>
                <Divider />
                <List>

                    {this.props.adminCheck && <ListItem button key="Admin" onClick={this.switchToAdmin}>
                        <ListItemIcon><StarsIcon style={styles.icons.style} /></ListItemIcon>
                        <ListItemText
                            primary={<Typography type="h4" style={{ color: '#000', fontSize: '17px' }}>Admin</Typography>}
                        />
                    </ListItem>}
                    <ListItem button key="Help" onClick={this.switchToHelp}>
                        <ListItemIcon><HelpIcon style={styles.icons.style} /></ListItemIcon>
                        <ListItemText
                            primary={<Typography type="h4" style={{ color: '#000', fontSize: '17px' }}>Help</Typography>}
                        />
                    </ListItem>
                    <ListItem button key="Sign Out" onClick={this.signOut}>
                        <ListItemIcon><ExitToAppIcon style={styles.icons.exit} /></ListItemIcon>
                        <ListItemText
                            primary={<Typography type="h4" style={{ color: 'red', fontSize: '17px' }}>Sign Out</Typography>}
                        />
                    </ListItem>
                </List>
            </div>
        );
    }
}

// Constants for Style
const styles = {
    icons: {
        style: {
            width: '27px',
            height: '27px'
        },
        exit: {
            width: '27px',
            height: '27px',
            color: 'red'
        }
    }
}
// ====================