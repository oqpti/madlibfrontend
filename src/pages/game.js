import React from 'react'
import "./game.css";
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
            var gb1 = document.getElementById("gb1");
            var gb2 = document.getElementById("gb2");
            var gb3 = document.getElementById("gb3");
            var gb4 = document.getElementById("gb4");
            console.log(this.state.player);
            console.log(this.state.turn);
            
            if (this.state.player == 1 && this.state.turn == 1){
                input1.style.visibility = "visible"
                input1.style.height = "100px"
                gb1.style.marginTop = "15px"
            }
            else {
                input1.style.visibility = "hidden"
                input1.style.height = "0px"
                gb1.style.marginTop = "0px"
                
            }
            if (this.state.player == 2 && this.state.turn == 2){
                input2.style.visibility = "visible"
                input2.style.height = "100px"
                gb2.style.marginTop = "15px"
            }
            else {
                input2.style.visibility = "hidden"
                input2.style.height = "0px"
                gb2.style.marginTop = "0px"
            }
            if (this.state.player == 3 && this.state.turn == 3){
                input3.style.visibility = "visible"
                input3.style.height = "100px"
                gb3.style.marginTop = "15px"
            }
            else {
                input3.style.visibility = "hidden"
                gb3.style.marginTop = "0px"
                input3.style.height = "0px"
            }
            if (this.state.player == 4 && this.state.turn == 4){
                input4.style.visibility = "visible"
                input4.style.height = "100px"
                gb4.style.marginTop = "15px"
            }
            else {
                input4.style.visibility = "hidden"
                gb4.style.marginTop = "0px"
                input4.style.height = "0px"
            }
        }
    }

    async fetchData(data = {}) {
        let response = await fetch('http://3.14.88.17:5001/getGameInfo', {
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
        fetch('http://3.14.88.17:5001/sendWords', {
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
            <div style={{height: this.props.dim.height, width: this.props.dim.width}}>   
                <div className="gameContainer">  
                   
                        <h1>The Magic Computer</h1>
                    
                    
                        <div className ="storyWrapper">
                            <p className="storyText">Today, every student has a computer small enough to fit into his
                            <p className="storyWord1">{words.fromW1}</p>. He can solve any math problem by simply 
                            pushing the computer’s little <p className="storyWord1">{words.fromW2}</p>.
                            Computers can add, multiply, divide, and <p className="storyWord1">{words.fromW3}</p>. They can also 
                            <p className="storyWord2">{words.fromW4}</p> better than a human. Some computers are 
                            <p className="storyWord1">{words.fromW5}</p>. Others have a/an 
                            <p className="storyWord2">{words.fromW6}</p>
                            screen that shows all kinds of <p className="storyWord2">{words.fromW7}</p> and 
                            <p className="storyWord2">{words.fromW8}</p> figures.</p>
                        </div>
                            
                            <div className="inputwrapper" id="iw1">
                            <div className="innerWrapper">
                                <input className="wordInput" type="text" placeholder="noun" value={this.state.toW1} onChange={this.toW1Handle}/>
                                <input className="wordInput" type="text" placeholder="plural noun" value={this.state.toW2} onChange={this.toW2Handle}/>
                                </div>
                                <div id="gb1" className="gameButton" onClick={this.submitWords}>
                                    <p className="gameButtonText">Submit Words</p></div>
                            </div>
                            <div className="inputwrapper" id="iw2">
                                <div className="innerWrapper">
                                    <input className="wordInput" type="text" placeholder="verb, present tense" value={this.state.toW1} onChange={this.toW1Handle}/>
                                    <input className="wordInput" type="text" placeholder="verb, present tense" value={this.state.toW2} onChange={this.toW2Handle}/>
                                </div>
                                <div id="gb2" className="gameButton" onClick={this.submitWords}>
                                    <p className="gameButtonText">Submit Words</p></div>
                            </div>
                            <div className="inputwrapper" id="iw3">
                            <div className="innerWrapper">
                                <input className="wordInput" type="text" placeholder="body part, plural" value={this.state.toW1} onChange={this.toW1Handle}/>
                                <input className="wordInput" type="text" placeholder="adjective" value={this.state.toW2} onChange={this.toW2Handle}/>
                                </div>
                                <div id="gb3" className="gameButton" onClick={this.submitWords}>
                                    <p className="gameButtonText">Submit Words</p></div>
                            </div>
                            <div className="inputwrapper" id="iw4">
                            <div className="innerWrapper">
                                <input className="wordInput" type="text" placeholder="plural noun" value={this.state.toW1} onChange={this.toW1Handle}/>
                                <input className="wordInput" type="text" placeholder="adjective" value={this.state.toW2} onChange={this.toW2Handle}/>
                                </div>
                                <div id="gb4" className="gameButton" onClick={this.submitWords}>
                                    <p className="gameButtonText">Submit Words</p></div>
                            </div>
                       
                    </div>
            </div>
        );
    }
}
