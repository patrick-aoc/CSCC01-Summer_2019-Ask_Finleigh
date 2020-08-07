import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider, Drawer } from '@material-ui/core';
import axios from "axios";
import ROUTES from "../Routes";

import Messages from "./components/MainChat/Messages";
import Composer from "./components/MainChat/Composer";
import NavMenuList from "./components/NavMenuList";
import AppBarMenu from "./components/AppBarMenu";
import Admin from "./Admin";
import Help from "./Help";
import MyAccount from "./MyAccount";

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class MainContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAnon: false,
            anonId: "",
            isAdmin: false,
            left: false, // default status for showing the nav menu
            search_selection: 'WATSON', // default to Watson for queries
            current_selection: 'My Current Session', // default selection

            // STATE VARIABLES FOR THE CHAT CONVERSATION
            lastSpeaker: 'Finleigh',
            messages: [{
                text: "Hi! How may I be of service today? :)",
                finleigh: {
                    color: "blue",
                    username: "Finleigh"
                },
                isFirst: true
            }],
            user: {
                username: "",
                color: randomColor(),
            },
            finleigh: {
                username: "Finleigh",
                color: "blue",
            }
            // ============================================
        }

        // Set the user's display name
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? this.setState(prevState => ({ user: { ...prevState.user, username: authUser.displayName } }))
                    : this.setState(prevState => ({ user: { ...prevState.user, username: "" } }));
                // If the display name is null, it means that an anonymous user has signed on
                if (authUser.displayName === null) {
                    this.setState({ isAnon: true, anonId: authUser.uid });
                }
            }
        )

        // Check to see if the currently logged in user is an admin
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    this.props.firebase.db.ref('/users/' + authUser.uid)
                        .once('value')
                        .then(snapshot => {
                            var acc_type = (snapshot.val() ? snapshot.val().account_type : 'user');
                            this.setState({ isAdmin: acc_type === "admin" });
                        });
                }
            }
        )
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    // ============================ CURRENT CHAT SESSION ==================================
    // HANDLERS FOR SENDING MESSAGES ======================================================
    onUserSendMessage = (message) => {
        const messages = this.state.messages;
        messages.push({
            text: message,
            user: this.state.user,
            isFirst: this.state.lastSpeaker === "Finleigh"
        })
        this.setState({ messages: messages, lastSpeaker: "User" }, async () => {
            await sleep(2000);
            var uid = this.props.firebase.getCurrentUser();
            var uAccess = this.state.isAdmin ? "ADMIN" : "USER";
            var postData = { query: message, endpoint: this.state.search_selection.toUpperCase(), userName: uid, userAccess: uAccess };
            this.onFinleighSendMessage("Your message has been sent! Please wait while we try to get an answer :)");
            axios.post(ROUTES.API_SERVER + "/chatbot", JSON.stringify(postData))
                .then(response => {
                    if (response.data.status === "SUCCESS") {
                        var count = 0;
                        for (var key in response.data.data) {
                            if (count < 5) {
                                if (response.data.data.hasOwnProperty(key)) {
                                    this.onFinleighSendMessage(response.data.data[key]);
                                }
                            }
                            count++;
                        }
                    } else {
                        this.onFinleighSendMessage("There was an issue while trying to process your question :(");
                    }

                })
                .catch(error => {
                    console.log("FRED IS THE BEST TA :D")
                    console.log(error)
                    this.onFinleighSendMessage("There was an issue while trying to process your question :(");
                });
        });
    }

    onFinleighSendMessage = (message) => {
        const messages = this.state.messages
        messages.push({
            text: message,
            finleigh: this.state.finleigh,
            isFirst: this.state.lastSpeaker === "User"
        })
        this.setState({ messages: messages, lastSpeaker: "Finleigh" })
    }
    // ====================================================================================

    handleChange = event => {
        this.setState({ search_selection: event.target.value });
    }

    // ========================== CHANGING BETWEEN MENU ITEMS =============================
    changeToAccount = event => {
        event.preventDefault();
        this.setState({ current_selection: 'My Account' });
    }

    changeToChatSession = event => {
        event.preventDefault();
        this.setState({ current_selection: 'My Current Session' });
    }

    changeToHelp = event => {
        event.preventDefault();
        this.setState({ current_selection: 'Help' });
    }

    changeToAdmin = event => {
        event.preventDefault();
        this.setState({ current_selection: 'Admin' });
    }

    handleSignOut = () => {
        if (window.confirm('You are about to sign out of the application')) {
            this.props.firebase.doSignOut().then((success) => {
                console.log("[SUCCESS] The user has been successfully signed out");
            }).catch((failure) => {
                console.log("[FAILURE] The user has not been successfully signed out");
            });
            window.location = ROUTES.LANDING;
        } else {
            console.log("[INFO] Nothing happened when trying to sign out");
        }
    }
    // ====================================================================================

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="MainChatInterface">
                    <div className="App-Bar">
                        <AppBarMenu
                            color="primary"
                            toggleDrawer={this.toggleDrawer}
                            handleChange={this.handleChange}
                            currentSelection={this.state.current_selection}
                            selection={this.state.search_selection}
                        ></AppBarMenu>
                        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('left', false)}
                                onKeyDown={this.toggleDrawer('left', false)}
                            >
                                {<NavMenuList
                                    handleSignOut={this.handleSignOut}
                                    changeToChatSession={this.changeToChatSession}
                                    changeToHelp={this.changeToHelp}
                                    changeToAdmin={this.changeToAdmin}
                                    changeToAccount={this.changeToAccount}
                                    adminCheck={this.state.isAdmin}
                                    anonCheck={this.state.isAnon}
                                ></NavMenuList>}
                            </div>
                        </Drawer>
                    </div>

                    {this.state.current_selection === "My Account" && <MyAccount {...this.props} adminCheck={this.state.isAdmin}></MyAccount>}

                    {this.state.current_selection === "Admin" && <Admin></Admin>}

                    {this.state.current_selection === "Help" && <Help></Help>}

                    {this.state.current_selection === "My Current Session" && <div className="ChatContainer">
                        <div className="ChatMessageWindow">
                            <Messages
                                messages={this.state.messages}
                            />
                        </div>
                        <div className="MessageComposer">
                            <Composer
                                onUserSendMessage={this.onUserSendMessage}
                                onFinleighSendMessage={this.onFinleighSendMessage}
                            />
                        </div>
                    </div>}
                </div>
            </MuiThemeProvider>
        );
    }
}

// Constants for Style
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#90caf9',
            main: '#198ed9',
            dark: '#0d47a1',
            contrastText: '#fff',
        },
        secondary: {
            main: '#FFF',
        },
    }
});
