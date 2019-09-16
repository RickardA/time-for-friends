import React, { Component } from 'react';
import TimeZone from '../entities/Timezone'
import Person from '../entities/Person'
import City from '../entities/City'
import Country from '../entities/Country'
import { Button, Form, FormGroup, Label, Input, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddFriend extends Component {


    state = {
        timeZones: null,
        modalToggle: false,
        formData: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            city: '',
            country: '',
            timeZone: {}
        },
        formError: {
            firstNameError: false,
            lastNameError: false,
            phoneNumberError: false,
            emailError: false,
            cityError: false,
            countryError: false,
            timeZoneError: false
        }
    }

    async componentDidMount() {
        let timeZone = new TimeZone();
        this.setState({ timeZones: await timeZone.find() })
    }

    validateForm(event) {
        event.preventDefault();
        this.setState({
            formError: {
                firstNameError: this.state.formData.firstName.length === 0 ? true : false,
                lastNameError: this.state.formData.lastName.length === 0 ? true : false,
                phoneNumberError: this.state.formData.phoneNumber.length === 0 ? true : false,
                emailError: this.state.formData.email.length === 0 ? true : false,
                cityError: this.state.formData.city.length === 0 ? true : false,
                countryError: this.state.formData.country.length === 0 ? true : false,
                timeZoneError: this.state.formData.timeZone.length === 0 ? true : false
            }
        }, async () => {
            if (Object.values(this.state.formError).indexOf(true) < 0) {
                console.log('Save')
                let city = new City({ name: this.state.formData.city });
                await city.save();
                let country = new Country({ name: this.state.formData.country });
                await country.save();
                let person = new Person({
                    firstName: this.state.formData.firstName,
                    lastName: this.state.formData.lastName,
                    phoneNumber: this.state.formData.phoneNumber,
                    email: this.state.formData.email,
                    city: city._id,
                    country: country._id,
                    timezone: this.state.formData.timeZone
                })
                if (await person.save()) {
                    console.log('Success saving person, resetting form...');
                    this.resetFormData();
                } else {
                    console.log('Error saving person, printing error...')
                    this.toggleErrorModal();
                }
            }
        })
    }

    resetFormData = () => {
        this.setState({
            formData: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                city: '',
                country: '',
                timeZone: ''
            },
        })
    }

    toggleErrorModal = () => {
        this.setState(prevState => ({ modalToggle: !prevState.modalToggle }));
    }

    handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;

        this.setState({ formData: { ...this.state.formData, [name]: value } });
    }

    render() {
        if (this.state.timeZones) {
            return (
                <div style={{ padding: '20px 20vw 20px 20vw' }}>
                    <h1>Add Friend</h1>
                    <Form onSubmit={this.validateForm.bind(this)} noValidate>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                value={this.state.formData.firstName}
                                onChange={this.handleInputChange}
                                invalid={this.state.formError.firstNameError}
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
                                invalid={this.state.formError.lastNameError}
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
                                invalid={this.state.formError.phoneNumberError}
                                id="phoneNumber"
                                placeholder="e.g. 7612345678" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={this.state.formData.email}
                                onChange={this.handleInputChange}
                                invalid={this.state.formError.emailError}
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
                                invalid={this.state.formError.cityError}
                                id="city" placeholder="e.g. Tomelilla" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="country">Country</Label>
                            <Input
                                type="text"
                                name="country"
                                value={this.state.formData.country}
                                onChange={this.handleInputChange}
                                invalid={this.state.formError.countryError}
                                id="country"
                                placeholder="e.g. Sweden" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="timeZone">TimeZone</Label>
                            <Input
                                type="select"
                                name="timeZone"
                                value={this.state.formData.timeZone}
                                onChange={this.handleInputChange}
                                invalid={this.state.formError.timeZoneError}
                                id="timeZone">
                                <option value="">Choose a timezone</option>
                                {this.state.timeZones.map(obj => <option key={obj._id} value={obj._id}>{obj.offset}</option>)}
                            </Input>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                    <Modal isOpen={this.state.modalToggle} >
                        <ModalHeader>Ooops...</ModalHeader>
                        <ModalBody>
                            Something went wrong while trying to add a friend, please try again
                     </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleErrorModal}>I understand</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        } else {
            return (<Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />);
        }
    }


}

