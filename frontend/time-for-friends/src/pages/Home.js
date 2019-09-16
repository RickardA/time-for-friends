import React, {Component} from 'react';
import {Jumbotron,Button} from 'reactstrap';
import jumbotronImg from '../resources/jumbotronImg.jpg';
import { Link } from "react-router-dom";

export default class Home extends Component {
    
  render() {
    const jumbotronTxt = {
        color: "white",
        textShadow: 'black 1px 1px 11px'
      };

    return (
        <div>
        <Jumbotron 
        style={{backgroundImage: `url(${jumbotronImg})`, 
        backgroundSize: '100vw auto', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: '0% 80%', 
        borderRadius: '0px' }}>
          <h1 className="display-3" style={jumbotronTxt}>It's time for friends!</h1>
          <p className="lead" style={jumbotronTxt}>This is a simple website to keep track on your friends,but not in a creepy way.</p>
          <p  className="lead" style={jumbotronTxt}>It uses smart functions to keep track on the time at your friends location.</p>
          <p className="lead">
            <Link to="/addfriend"><Button color="primary">Try it!</Button></Link>
          </p>
        </Jumbotron>
      </div>
    );
  }

}

