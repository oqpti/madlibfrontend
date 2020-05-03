import React, { Component } from 'react';

export default class GameOLD extends Component {
    constructor() {
        super();
        this.state = {
            gameid: null,
            player: null,
            turn: 0,
            words: []
        };
        this.updateData = this.updateData.bind(this)
        setInterval(this.updateData, 800);
    }
    updateData(){
        if (this.state.gameid != null){
            gameid = this.state.gameid
            data = {gameid: gameid}
            this.fetchData(data).then(result => {
                this.setState({words: result.words})
                this.setState({turn: result.turn})
                console.log(result.turn)
            });
        }
    }

    async fetchData(data = {}) {
        let response = await fetch('http://localhost:5000/getGameInfo', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }

    componentDidMount() {
        let gameid = this.props.match.params.gameid
        this.setState({gameid: gameid})
        let player = this.props.match.params.player
        this.setState({player: player})
    }

    render() {
        let gameid = this.state.gameid
        let player = this.state.player
        let turn = this.state.turn
        let words = this.state.words
        return (
            <div>
                <p>Game Goes Here</p>
                <p>GameID: {gameid}</p>
                <p>Player: {player}</p>
                <p>Turn? {turn}</p>
                <p>Words: {words}</p>
            </div>
        );
    }
}