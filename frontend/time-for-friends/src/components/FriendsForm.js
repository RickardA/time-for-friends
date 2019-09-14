import React, { Component } from 'react';
import TimeZone from '../entities/Timezone'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class FriendsForm extends Component {

    state = {
        timeZones: null,
        formData: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            city: '',
            country: '',
            timeZone: ''
        }
    }

   async componentDidMount() {
        console.log("Mounted");
        let timeZone = new TimeZone();
        this.setState({timeZones: await timeZone.find()})
        console.log(this.state.timeZones)
    }

    validateForm = () => {
        console.log(this.state.formData.firstName)
        console.log(this.state.formData.lastName)
        console.log(this.state.formData.phoneNumber)
        console.log(this.state.formData.email)
        console.log(this.state.formData.city)
        console.log(this.state.formData.country)
        console.log(this.state.formData.timeZone)
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({formData: {[name]: value}});
    }

    render() {
        if(this.state.timeZones){
            return (
                <Form>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input 
                        type="text" 
                        name="firstName" 
                        value={this.state.formData.firstName} 
                        onChange={this.handleInputChange} 
                        id="firstName" 
                        placeholder="e.g. Nisse" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input 
                        type="text"
                        name="lastName" 
                        value={this.state.formData.lastName} 
                        onChange={this.handleInputChange} 
                        id="lastName" 
                        placeholder="e.g. Nissesson" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input
                        type="tel"
                        name="phoneNumber" 
                        value={this.state.formData.phoneNumber} 
                        onChange={this.handleInputChange} 
                        id="phoneNumber" 
                        placeholder="e.g. +4612345678" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                        type="email" 
                        name="email" 
                        value={this.state.formData.email} 
                        onChange={this.handleInputChange} 
                        id="email" 
                        placeholder="e.g. nisse.nissesson@nisse.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input 
                        type="text" 
                        name="city" 
                        value={this.state.formData.city} 
                        onChange={this.handleInputChange} 
                        id="city" placeholder="e.g. Tomelilla" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input 
                        type="text" 
                        name="country" 
                        value={this.state.formData.country} 
                        onChange={this.handleInputChange} 
                        id="country" 
                        placeholder="e.g. Sweden" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="timeZone">TimeZone</Label>
                        <Input type="select" name="timeZone" value={this.state.formData.timeZone} onChange={this.handleInputChange} id="timeZone">
                            {this.state.timeZones.map(obj => <option key={obj._id}>{obj.offset}</option>)}
                        </Input>
                    </FormGroup>
                    <Button onClick={this.validateForm}>Submit</Button>
                </Form>
            );
        }else{
            return(<h1>Loading</h1>);
        }
    }

}

