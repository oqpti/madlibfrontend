import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Create from "./pages/create.js"
import Splash from "./pages/splash.js"
import Join from "./pages/join.js"
import Game from "./pages/game.js"

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
  }

function App() {
  let dim = useWindowDimensions()
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Splash dim={dim}/>
        </Route>
        <Route exact path='/create'>
          <Create dim={dim}/>
        </Route>
        <Route exact path='/join'>
          <Join dim={dim}/>
        </Route>
        <Route exact path='/game/:gameid/:player' render={(props) => <Game dim={dim} {...props}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
