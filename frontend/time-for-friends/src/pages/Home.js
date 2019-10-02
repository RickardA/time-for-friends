import React, { Component } from 'react';
import { Jumbotron, Button, Card,CardText, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import '../css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Home extends Component {

  render() {
    return (
      <div className="d-flex flex-column" style={{backgroundColor: '#333'}}>
        <Jumbotron
          className="pt-1 pb-1 pt-md-5 pb-md-5 mb-0 jumbo flex-grow-1">
          <h1 className="jumboH1 jumboTxt">It's time for friends!</h1>
          <p className="lead jumboP jumboTxt">This is a simple website to keep track on your friends,but not in a creepy way.</p>
          <p className="lead jumboP jumboTxt">It uses smart functions to keep track on the time at your friends location.</p>
          <p className="lead">
            <Link to="/addfriend"><Button color="info">Try it!</Button></Link>
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col sm="12" md={{size:4}} className="p-0">
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <h1 className="h1"><FontAwesomeIcon icon="user-plus"></FontAwesomeIcon> Add your friends</h1>
                <CardText>To get going start by adding your friends. These are the things you need to know about your friends:</CardText>
                <ul>
                  <li>Name</li>
                  <li>Phone Number</li>
                  <li>Email</li>
                  <li>City</li>
                  <li>Country</li>
                  <li>Timezone</li>
                </ul>
                <CardText>Once you have all these things you can start adding your friends!</CardText>
              </Card>
            </Col>
            <Col sm="12" md={{size:4}} className="p-0">
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <h1 className="h1"><FontAwesomeIcon icon="question-circle"></FontAwesomeIcon> Keep track</h1>
                <CardText>After you have added your friends, you can easily keep track on your friends information.<br></br>It's almost like a phone book, but better.<br></br>Go to "My Friends" to see the friends you have added.</CardText>
              </Card>
            </Col>
            <Col sm="12" md={{size:4}} className="p-0">
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <h1 className="h1"><FontAwesomeIcon icon="map-marker-alt"></FontAwesomeIcon> Locate</h1>
                <CardText>Your friends are now easy to locate.<br></br>On each "Friend Card" you have a small map to quickly give you information on your friends location.</CardText>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }

}

