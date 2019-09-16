import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody,
CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default class FriendCard extends Component {


    render() {
        return (
            <Card>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                    <CardTitle>{this.props.person.firstName} {this.props.person.lastName}</CardTitle>
                    <CardText>
                    <p>{this.props.person.phoneNumber}</p>
                    <p>{this.props.person.email}</p>
                    <p>{this.props.person.city ? this.props.person.city.name : ''}</p>
                    <p>{this.props.person.country ? this.props.person.country.name : ''}</p>
                    <p>{this.props.person.timezone ? this.props.person.timezone.offset : ''}</p>
                    </CardText>
                </CardBody>
            </Card>
        );
    }

}

