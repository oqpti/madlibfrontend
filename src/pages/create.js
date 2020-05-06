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
        let response = await fetch('http://3.14.88.17:5001/create', {
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
            <div style={{height: this.props.dim.height, width: this.props.dim.width}}>
                <div className="createContainer">
                    <p>Fill out the options below</p>
                    <p className="createText">Room Password:</p>
                    <input className="createInput" type='text' id='1' placeholder='password123' value={this.state.gameid} onChange={this.handleChange}/>
                    <p className="createText">Number of Players:</p>
                    <input className="createInput" type='text' id='2' placeholder='3' value={this.state.maxplayers} onChange={this.handleChange}/>
                    <div className="createButton" onClick={this.handleSubmit}>
                        <p className="createButtonText">Create Game</p></div>
                    {redirect}
                </div>
            </div>
        );
    }
}
