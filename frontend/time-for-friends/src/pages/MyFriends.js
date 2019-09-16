import React, { Component } from 'react';
import { Container, Row, Col,Spinner } from 'reactstrap';
import Person from '../entities/Person';
import FriendCard from '../components/FriendCard'

export default class MyFriends extends Component {

    state = {
        persons: null
    }

    async componentDidMount(){
        let person = new Person();
        this.setState({persons: await person.find({},{populate:['city','country','timezone']})})
        console.log(this.state.persons)
    }

    render() {
        if (this.state.persons) {
            return (
                <Container>
                    <Row>
                        {this.state.persons.map(person => 
                            <Col key={person._id} sm="4"><FriendCard person={person}></FriendCard></Col>
                            )}
                    </Row>
                </Container >
           
        );
        }else{
            return (<Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />);
        }
       
    }

}

