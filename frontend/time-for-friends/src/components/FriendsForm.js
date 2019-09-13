import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class FriendsForm extends Component {

    componentDidMount() {
        // Could to start event handling, async loops etc.
        // database calls etc
        // The first time we are allowed to call this.setState
        console.log("Mounted");
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" placeholder="e.g. Nisse" />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" placeholder="e.g. Nissesson" />
                </FormGroup>
                <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="tel" name="phoneNumber" id="phoneNumber" placeholder="e.g. +4612345678" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="e.g. nisse.nissesson@nisse.com" />
                </FormGroup>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" id="city" placeholder="e.g. Tomelilla" />
                </FormGroup>
                <FormGroup>
                    <Label for="country">Country</Label>
                    <Input type="text" name="country" id="country" placeholder="e.g. Sweden" />
                </FormGroup>
                <FormGroup>
                    <Label for="timeZone">TimeZone</Label>
                    <Input type="select" name="timeZone" id="timeZone">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }

}

