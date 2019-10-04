import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import FriendCard from '../components/FriendCard';
import SearchBar from '../components/SearchBar';
import { inject, observer } from 'mobx-react';
import Loading from '../components/Loading';
import Error from '../components/Error';

@inject('store')
@observer
class MyFriends extends Component {

    async componentDidMount() {
        this.props.store.getPersons();
    }

    render() {
        let cards;

        if(this.props.store.persons.status === 'done'){
            cards = this.props.store.persons.data.map(person =>
                <Col key={person._id} sm="12" md="6" lg="4"><FriendCard person={person}></FriendCard></Col>
            )
        }else if(this.props.store.persons.status === 'loading'){
            cards = <Col sm="12" className="mt-4"><Loading /></Col>
        }else{
            cards = <Col sm="12" className="mt-4"><Error title="Something went wrong..." description="Couldn't load your friends, please try again!"/></Col>
        }

        return (
            <Container>
                <Row >
                    <Col sm="12" className="mt-5">
                        <SearchBar />
                    </Col>
                </Row>
                <Row>
                    {cards}
                </Row>
            </Container >

        );
    }
}

export default MyFriends;

