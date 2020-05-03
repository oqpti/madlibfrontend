import React from 'react'

//only one template so this the page for it

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gameid: null,
            player: null,
            turn: 0,
            toW1: '',
            toW2: '',
            fromW1: '________',
            fromW2: '________',
            fromW3: '________',
            fromW4: '________',
            fromW5: '________',
            fromW6: '________',
            fromW7: '________',
            fromW8: '________',
        };
        this.updateData = this.updateData.bind(this)
        setInterval(this.updateData, 1000);
    }
    componentDidMount() {
        let gameid = this.props.match.params.gameid
        this.setState({gameid: gameid})
        let player = this.props.match.params.player
        this.setState({player: player})
    }
    updateData(){
        if (this.state.gameid != null){
            let data = {gameid:  this.state.gameid}
            this.fetchData(data).then(result => {
                console.log(result)
                this.setState({fromW1: result.words[0]})
                this.setState({fromW2: result.words[1]})
                this.setState({fromW3: result.words[2]})
                this.setState({fromW4: result.words[3]})
                this.setState({fromW5: result.words[4]})
                this.setState({fromW6: result.words[5]})
                this.setState({fromW7: result.words[6]})
                this.setState({fromW8: result.words[7]})
                this.setState({turn: result.turn})
            });
            
            var input1 = document.getElementById("iw1");
            var input2 = document.getElementById("iw2");
            var input3 = document.getElementById("iw3");
            var input4 = document.getElementById("iw4");
            console.log(this.state.player);
            console.log(this.state.turn);
            
            if (this.state.player == 1 && this.state.turn == 1){
                input1.style.visibility = "visible"
            }
            else {
                input1.style.visibility = "hidden"
            }
            if (this.state.player == 2 && this.state.turn == 2){
                input2.style.visibility = "visible"
            }
            else {
                input2.style.visibility = "hidden"
            }
            if (this.state.player == 3 && this.state.turn == 3){
                input3.style.visibility = "visible"
            }
            else {
                input3.style.visibility = "hidden"
            }
            if (this.state.player == 4 && this.state.turn == 4){
                input4.style.visibility = "visible"
            }
            else {
                input4.style.visibility = "hidden"
            }
        }
    }

    async fetchData(data = {}) {
        let response = await fetch('http://localhost:5000/getGameInfo', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }

    toW1Handle = (event) => {
        this.setState({toW1: event.target.value})
    }
    toW2Handle = (event) => {
        this.setState({toW2: event.target.value})
    }
    submitWords = () => {
        let data = {gameid: this.state.gameid, word1: this.state.toW1, word2: this.state.toW2}
        fetch('http://localhost:5000/sendWords', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }



    render(){
        let words = this.state
        return (       
            <div>  
                <div class="row" id="title">
                    <div class ="col-2"></div>
                    <div class ="col-8"><h1>The Magic Computer</h1></div>
                    <div class ="col-2"></div>
                    <p>GameID: {words.gameid}</p>
                    <p>Player: {words.player}</p>
                    <p>Turn: {words.turn}</p>
                </div>
                <div className="row" id="content">
                    <div className ="col-8">Today, every student has a computer small enough to fit into his
                        {words.fromW1}. He can solve any math problem by simply 
                        pushing the computer’s little {words.fromW2}.
                        Computers can add, multiply, divide, and {words.fromW3}. They can also 
                        {words.fromW4} better than a human. Some computers are 
                        {words.fromW5}. Others have a/an 
                        {words.fromW6}
                        screen that shows all kinds of {words.fromW7} and 
                        {words.fromW8} figures. 
                        
                        <div className="inputwrapper" id="iw1">
                            <input type="text" placeholder="noun" value={this.state.toW1} onChange={this.toW1Handle}/>
                            <input type="text" placeholder="plural noun" value={this.state.toW2} onChange={this.toW2Handle}/>
                            <button onClick={this.submitWords}>Submit</button>
                        </div>
                        <div className="inputwrapper" id="iw2">
                            <input type="text" placeholder="verb, present tense" value={this.state.toW1} onChange={this.toW1Handle}/>
                            <input type="text" placeholder="verb, present tense" value={this.state.toW2} onChange={this.toW2Handle}/>
                            <button onClick={this.submitWords}>Submit</button>
                        </div>
                        <div className="inputwrapper" id="iw3">
                            <input type="text" placeholder="body part, plural" value={this.state.toW1} onChange={this.toW1Handle}/>
                            <input type="text" placeholder="adjective" value={this.state.toW2} onChange={this.toW2Handle}/>
                            <button onClick={this.submitWords}>Submit</button>
                        </div>
                        <div className="inputwrapper" id="iw4">
                            <input type="text" placeholder="verb, present tense" value={this.state.toW1} onChange={this.toW1Handle}/>
                            <input type="text" placeholder="adjective" value={this.state.toW2} onChange={this.toW2Handle}/>
                            <button onClick={this.submitWords}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}