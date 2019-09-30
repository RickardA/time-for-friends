import React, { Component } from 'react';
import {Card,CardBody } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Clock from '../components/Clock'


export default class FriendCard extends Component {


    render() {
        return (
            <Card style={{margin: '20px 0 0 0'}}>
                <CardBody>
                    <p><FontAwesomeIcon icon='signature' /> {this.props.person.firstName} {this.props.person.lastName}</p>
                    <p><FontAwesomeIcon icon='phone' /> {this.props.person.phoneNumber}</p>
                    <p><FontAwesomeIcon icon='envelope' /> {this.props.person.email}</p>
                    <p><FontAwesomeIcon icon='city' /> {this.props.person.address.city ? this.props.person.address.city : ''}</p>
                    <p><FontAwesomeIcon icon='flag' /> {this.props.person.address.country ? this.props.person.address.country : ''}</p>
                    <p><FontAwesomeIcon icon='globe-europe' /> {this.props.person.timezone ? this.props.person.timezone.offset : ''}</p>
                    <Clock timezone={this.props.person.timezone ? this.props.person.timezone.offset : ''} />
                </CardBody>
            </Card>
        );
    }

}

