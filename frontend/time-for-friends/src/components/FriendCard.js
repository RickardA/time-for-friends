import React, { Component } from 'react';
import {Card,CardBody } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export default class FriendCard extends Component {


    render() {
        return (
            <Card style={{margin: '20px 0 0 0'}}>
                <CardBody>
                    <p><FontAwesomeIcon icon='signature' /> {this.props.person.firstName} {this.props.person.lastName}</p>
                    <p><FontAwesomeIcon icon='phone' /> {this.props.person.phoneNumber}</p>
                    <p><FontAwesomeIcon icon='envelope' /> {this.props.person.email}</p>
                    <p><FontAwesomeIcon icon='city' /> {this.props.person.city ? this.props.person.city.name : ''}</p>
                    <p><FontAwesomeIcon icon='flag' /> {this.props.person.country ? this.props.person.country.name : ''}</p>
                    <p><FontAwesomeIcon icon='globe-europe' /> {this.props.person.timezone ? this.props.person.timezone.offset : ''}</p>
                </CardBody>
            </Card>
        );
    }

}

