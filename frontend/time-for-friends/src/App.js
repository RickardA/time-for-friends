import React, { Component, Fragment } from 'react';
import './App.css';
import { Jumbotron, Container } from 'reactstrap';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

export default class App extends Component {

    state = {
      cityInput: ''
    }

  inputChange() {

  }

  checkIfValid = () => {
    console.log(this.state.cityInput);
  }

  render() {
    return (
      <div className="App">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          </Container>
        </Jumbotron>
        <InputGroup>
          <Input value={this.state.cityInput} onChange={(event) => this.setState({cityInput: event.target.value})}/>
          <InputGroupAddon addonType="prepend"><Button onClick={this.checkIfValid}>I'm a button</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }

}

