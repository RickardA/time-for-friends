import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import Person from '../entities/Person';
import FriendCard from '../components/FriendCard';
import SearchBar from '../components/SearchBar';


export default class MyFriends extends Component {

    state = {
        persons: null
    }

    async componentDidMount() {
        this.handleSearch();
    }

    async handleSearch(query,sort) {
        sort = !sort ? {firstName:1} : sort;
        let person = new Person();
        this.setState({ persons: await person.find(query, sort) })
        console.log(this.state.persons)
    }

    render() {
        if (this.state.persons) {
            return (
                <Container>
                    <Row >
                        <Col sm="12">
                            <SearchBar handleSearch={this.handleSearch.bind(this)} />
                        </Col>
                    </Row>
                    <Row>
                        {this.state.persons.map(person =>
                            <Col key={person._id} sm="4"><FriendCard person={person}></FriendCard></Col>
                        )}
                    </Row>
                </Container >

            );
        } else {
            return (<Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />);
        }

    }

}

