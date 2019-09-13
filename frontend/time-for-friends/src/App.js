import React, {Component} from 'react';
import './App.css';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route} from "react-router-dom";


export default class App extends Component {

  

  render() {
    return (
      <Router>
        <NavigationBar />
        <div className="app">
            <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }

}

