import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import "./join.css";

export default class Join extends Component {
    constructor() {
        super();
        this.state = {
            gameid: "",
            success: false,
            player: 0,
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        switch(event.target.id) {
            case '1': this.setState({gameid: event.target.value}); break;
            default: break;
        }    
    }

    handleSubmit(){
        let gameid = this.state.gameid;
        let data = {gameid: gameid};
        this.joinGame(data).then(result => {
            console.log(result)
            if (result.success) {
                this.setState({player: result.player})
                this.setState({success: result.success})
            }
            
        });
        //let success = createResp.success;
        //console.log(createResp);
    }

    async joinGame(data = {}) {
        let response = await fetch('http://3.14.88.17:5001/join', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }
    render() {
        var redirect;
        var route = '/game/'+this.state.gameid+'/'+this.state.player;
        if (this.state.success) {
            redirect = <Redirect to={route}/>;
        } else {
            redirect = <div/>;
        }
        return (
            <div style={{width: this.props.dim.width, height: this.props.dim.height}}>
                <div className="joinContainer">
                    <div className="descWrapper">
                        <p className="">Enter in the game password that was provided to you by the host of the game in the text box below.</p>
                    </div>
                    <p>Game Password:</p>
                    <input type='text' id='1' placeholder='password123' value={this.state.gameid} onChange={this.handleChange}/>
                    <div className="joinButton" onClick={this.handleSubmit}>
                        <p className="joinButtonText">Join Game</p></div>
                </div>
                {redirect}
            </div>
        );
    }
}
