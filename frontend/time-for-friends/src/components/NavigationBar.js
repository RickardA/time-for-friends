import React, { Component } from 'react';
import { Collapse, Navbar,NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {

  state = {
    isOpen: false,
    desktop: true,
    title: 'Time For Friends',
    links: {
      home: {
        to: '/',
        text: 'Home'
      },
      addFriend: {
        to: '/addFriend',
        text: 'Add Friend'
      },
      myFriends: {
        to: '/myFriends',
        text: 'My Friends'
      }
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.clickListener.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickListener.bind(this), false);
  }

  clickListener(event) {
    if (!event.target.getAttribute('class') || !event.target.getAttribute('class').includes('navbar') || event.target.getAttribute('class').includes('navLink')) {
      if (this.state.isOpen) {
        this.toggleNavbar();
      }
    }
  }


  toggleNavbar() {
    this.setState((prevState) => {
      return { ...prevState, isOpen: !this.state.isOpen }
    });
  }

  render() {
    return (
      <div>
        <Navbar fixed="top" color="dark" className="navbar" light expand="md" style={{height:'55px'}}>
          <Link to={this.state.links.home.to} style={{ textDecoration: 'none', fontSize: '20px',color:'white' }}>{this.state.title}</Link>
          <NavbarToggler style={{ backgroundColor: 'white' }} onClick={this.toggleNavbar.bind(this)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {Object.values(this.state.links).map(link =>
                <NavItem key={link.to}>
                  <Link className="text-white pr-md-2 pl-md-2 navLink" style={{ textDecoration: 'none' }} key={link.to} to={link.to}>{link.text}</Link>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

