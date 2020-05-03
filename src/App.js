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
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Splash}/>
        <Route exact path='/create' component={Create}/>
        <Route exact path='/join' component={Join}/>
        <Route exact path='/game/:gameid/:player' component={Game}/>
      </Switch>
    </Router>
  );
}

export default App;
