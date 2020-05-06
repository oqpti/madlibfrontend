import React, { Component } from 'react';

import "./splash.css"

export default class Splash extends Component {
    render() {
        return (
            <div style={{height: this.props.dim.height, width: this.props.dim.width}}>
                <div className="splashContainer">
                    <a className = "linkWrapper" href="/create">
                        <div className="button">
                            <p className="buttonText">Create a Game</p></div></a>
                    <a className = "linkWrapper" href="/join">
                        <div className="button">
                            <p className="buttonText">Join a Game</p></div></a>
                </div>
            </div>
        );
    }
}