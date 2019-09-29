import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState((prevState) => {
      return { ...prevState, collapsed: !this.state.collapsed }
    });
  }

  render() {
    return (
      <Navbar color="dark" className="sticky-top" light>
        <Link to="/" className="text-white" style={{ textDecoration: 'none', fontSize: '20px' }}>Time For Friends</Link>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2 " style={{ backgroundColor: 'white' }} />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/" onClick={this.toggleNavbar} className="text-white">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/addFriend" onClick={this.toggleNavbar} className="text-white">Add Friend</Link>
            </NavItem>
            <NavItem>
              <Link to="/myFriends" onClick={this.toggleNavbar} className="text-white">My Friends</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

}

