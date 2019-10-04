import React, {Component} from 'react';
import './css/App.css';
import Home from './pages/Home';
import AddFriend from './pages/AddFriend';
import MyFriends from './pages/MyFriends';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Page404 from './pages/Page404';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {faPhone,faEnvelope,faCity,faFlag,faSignature,faGlobeEurope,faClock,faCheck,faArrowsAltH,faTrashAlt,faUserPlus,faMapMarkerAlt,faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

library.add(fab,faPhone,faEnvelope,faCity,faFlag,faSignature,faGlobeEurope,faClock,faCheck,faArrowsAltH,faTrashAlt,faUserPlus,faMapMarkerAlt,faQuestionCircle);


export default class App extends Component {

  

  render() {
    return (
      <Router>
        <NavigationBar />
        <div className="app d-flex flex-column flex-grow-1" style={{marginTop:'55px'}}>
            <Route exact path="/" component={Home} />
            <Route exact path="/addFriend" component={AddFriend} />
            <Route exact path="/myFriends" component={MyFriends} />
        </div>
        <Footer /> 
      </Router>
    );
  }

}

