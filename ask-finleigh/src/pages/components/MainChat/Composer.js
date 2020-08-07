import { Component } from "react";
import React from "react";

import SendIcon from '@material-ui/icons/Send';

import "../../../styles/components/Composer.css";

class Composer extends Component {
    state = {
        text: ""
    }

    onChange(e) {
        this.setState({ text: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.text === "") {
            return;
        }
        this.setState({ text: "" });
        this.props.onUserSendMessage(this.state.text);
    }

    render() {
        return (
            <div className="Input">
                <form className="msgWindow" onSubmit={e => this.onSubmit(e)}>
                    <input
                        className="composeBox"
                        onChange={e => this.onChange(e)}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER"
                        autoFocus={true}
                    />
                    <button className="composeButton"><SendIcon style={{ width: '27px', height: '27px'}}></SendIcon></button>
                </form>
            </div>
        );
    }
}

export default Composer;