import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import "./create.css"

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            gameid: "",
            maxplayers: "",
            success: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    
    handleChange(event){
        switch(event.target.id) {
            case '1': this.setState({gameid: event.target.value}); break;
            case '2': this.setState({maxplayers: event.target.value}); break;
            default: break;
        }    
    }

    handleSubmit(){
        let gameid = this.state.gameid;
        let maxplayers = this.state.maxplayers;
        let data = {gameid: gameid, maxplayers: maxplayers};
        this.createGame(data).then(result => {
            this.setState({success: result.success})
        });
        //let success = createResp.success;
        //console.log(createResp);
    }

    async createGame(data = {}) {
        let response = await fetch('http://localhost:5000/create', {
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
        var route = '/game/'+this.state.gameid+'/1';
        if (this.state.success) {
            redirect = <Redirect to={route}/>;
        } else {
            redirect = <div/>;
        }
        return (
            <div className="createContainer">
                <p>Fill out the options below</p>
                <p>Room Password:</p>
                <input type='text' id='1' placeholder='password123' value={this.state.gameid} onChange={this.handleChange}/>
                <p>Number of Players:</p>
                <input type='text' id='2' placeholder='3' value={this.state.maxplayers} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Create Room</button>
                {redirect}
            </div>
        );
    }
}