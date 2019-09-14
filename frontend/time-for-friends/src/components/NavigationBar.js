import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
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
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
    
  render() {
    return (
      <Navbar color="dark" light>
          <Link to="/" className="text-white" style={{textDecoration: 'none', fontSize: '20px'}}>Time For Friends</Link>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2 " style={{backgroundColor: 'white'}} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/" className="text-white">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/friends" className="text-white">Friends</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }

}

