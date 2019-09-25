import React, {Component} from 'react';
import './App.css';
import Home from './pages/Home';
import AddFriend from './pages/AddFriend';
import MyFriends from './pages/MyFriends';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {faPhone,faEnvelope,faCity,faFlag,faSignature,faGlobeEurope,faClock,faCheck,faArrowsAltH,faTrashAlt} from '@fortawesome/free-solid-svg-icons';

library.add(fab,faPhone,faEnvelope,faCity,faFlag,faSignature,faGlobeEurope,faClock,faCheck,faArrowsAltH,faTrashAlt);


export default class App extends Component {

  

  render() {
    return (
      <Router>
        <NavigationBar />
        <div className="app">
            <Route exact path="/" component={Home} />
            <Route exact path="/addFriend" component={AddFriend} />
            <Route exact path="/myFriends" component={MyFriends} />
        </div>
      </Router>
    );
  }

}

