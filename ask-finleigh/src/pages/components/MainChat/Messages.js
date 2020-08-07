import { Component } from "react";
import React from "react";

import "../../../styles/components/Messages.css";

import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class Messages extends Component {
    scrollToBottom = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    renderMessage(message) {
        const { text, user, finleigh } = message;
        const className = user ?
            "Messages-message currentMember" : "Messages-message";

        return (
            <li className={className} >

                {message.isFirst ?
                    <div>
                        {user ? <AccountCircleIcon style={styles.icons.style} /> : <FaceIcon style={styles.icons.style} />}
                    </div>
                    :
                    <span
                        className="avatar"
                        style={{ backgroundColor: "#FFF" }}
                    />}

                <div className="Message-content">
                    {message.isFirst && <div className="username">
                        {user ? user.username : finleigh.username}
                    </div>}
                    <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </li>
        );
    }

    render() {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }
}

// Constants for Style
const styles = {
    icons: {
        style: {
            width: '50px',
            height: '50px',
            color: '#198ed9',
        }
    }
}
  // ====================
