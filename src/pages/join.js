import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
        let response = await fetch('http://localhost:5000/join', {
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
            <div>
                <p>Join Page</p>
                <p>Room Password:</p>
                <input type='text' id='1' placeholder='password123' value={this.state.gameid} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Join Room</button>
                {redirect}
            </div>
        );
    }
}