import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import FriendCard from '../components/FriendCard';
import SearchBar from '../components/SearchBar';
import {inject,observer} from 'mobx-react';

@inject('store')
@observer
class MyFriends extends Component {

    async componentDidMount() {
        this.props.store.getPersons();
    }

    render() {
        if (this.props.store.persons) {
            return (
                <Container>
                    <Row >
                        <Col sm="12" className="mt-5">
                            <SearchBar />
                        </Col>
                    </Row>
                    <Row>
                        {this.props.store.persons.map(person =>
                            <Col key={person._id} sm="12" md="6" lg="4"><FriendCard person={person}></FriendCard></Col>
                        )}
                    </Row>
                </Container >

            );
        } else {
            return (<Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />);
        }

    }

}

export default MyFriends;

