import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider, Divider, CircularProgress, Button } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';

import FAQ from './FAQ';
import LoginForm from './components/Landing/LoginForm';
import AccountCreationForm from './components/Landing/AccountCreationForm';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import "../styles/Home.css";
import ROUTES from "../Routes";
import logo from '../resources/chat-bub.png';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAccountCreationShown: false,
      isLoginFormShown: true,
      isFAQShown: false,
      loading: false,
      loadingAnon: false
    }
  }

  showAccountCreationForm = () => {
    this.setState({ isAccountCreationShown: true, isLoginFormShown: false, isFirstLoad: false });
  }

  showLoginForm = () => {
    this.setState({ isAccountCreationShown: false, isLoginFormShown: true, isFirstLoad: false });
  }

  toggleFAQ = () => {
    this.setState({ isFAQShown: !this.state.isFAQShown });
  }

  handleChange = () => {
    this.setState({ isAccountCreationShown: !this.state.isAccountCreationShown })
  }

  anonSignIn = (event) => {
    this.setState({ loadingAnon: true });
    this.props.firebase.doAnonSignIn().then(() => {
      this.setState({ loadingAnon: false });
      this.props.history.push(ROUTES.MAIN_CHAT)
    });

  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div name="faqIcon" align="right">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="FAQ"
            onClick={this.toggleFAQ}
          ><HelpIcon style={styles.icons.style} />
          </IconButton>
        </div>

        <Collapse in={this.state.isFAQShown}>
          <FAQ closeFaq={this.toggleFAQ}></FAQ>
        </Collapse>

        <div className="Login">
          <div className="headLogo">
            <img className="log" src={logo} alt="chat-bubble" />
            <h1 className="header">Ask Finleigh!</h1>
          </div>

          <div className="forms">
            <Slide direction="left" in={this.state.isLoginFormShown} mountOnEnter unmountOnExit>
              <LoginForm id="log-in"  {...this.props} />
            </Slide>
            <Slide direction="right" in={this.state.isAccountCreationShown} mountOnEnter unmountOnExit>
              <AccountCreationForm id="account-creation" {...this.props} />
            </Slide>

            {this.state.loading && <CircularProgress size={34} style={{ position: 'absolute', top: '59%', left: '49%' }} />}

            <div id="diver">
              <Divider />
            </div>

            {this.state.isLoginFormShown && <Button
              variant="outlined"
              color="primary"
              size="large"
              style={styles.buttonProps.style}
              onClick={this.state.isLoginFormShown ? this.showAccountCreationForm : this.showLoginForm}
            >Create an account
            </Button>
            }

            {this.state.isAccountCreationShown && <Button
              variant="outlined"
              color="primary"
              size="large"
              style={styles.buttonProps.style}
              onClick={this.state.isAccountCreationShown ? this.showLoginForm : this.showAccountCreationForm}
            >Back
            </Button>
            }

            <div id="diver2" />

            {this.state.isLoginFormShown && <Button
              variant="outlined"
              color="primary"
              size="large"
              disabled={this.state.loadingAnon}
              style={styles.buttonProps.style}
              onClick={this.anonSignIn}
            >Sign in anonymously</Button>
            }

            {this.state.loadingAnon && <CircularProgress size={34} style={{ position: 'absolute', top: '81%', left: '49%' }} />}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#90caf9',
      main: '#198ed9',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0091ea',
    },
  }
});

// Constants for Style
const styles = {
  icons: {
    style: {
      width: '40px',
      height: '40px',
      color: '#198ed9'
    }
  },

  buttonProps: {
    style: { top: '10px', fontSize: '15px', width: '100%' }
  }
}
// ====================
