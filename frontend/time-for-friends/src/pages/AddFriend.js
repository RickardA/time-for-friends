import React, { Component } from 'react';
import Person from '../entities/Person'
import Address from '../entities/Address'
import { Button, Form, FormGroup, Label, Input, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import AutoComplete from '../components/AutoComplete';
import AutoCompleteGroup from '../components/AutoCompleteGroup';

@inject('store')
@observer
class AddFriend extends Component {


    state = {
        modalToggle: false,
        countrySuggestions: null,
        formData: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            city: '',
            country: '',
            timeZone: '',
            locationId: ''
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

    componentDidMount() {
        this.props.store.getTimezones();
    }

    validateForm(event) {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                formError: {
                    firstNameError: this.state.formData.firstName.length === 0 ? true : false,
                    lastNameError: this.state.formData.lastName.length === 0 ? true : false,
                    phoneNumberError: this.state.formData.phoneNumber.length === 0 || !/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(this.state.formData.phoneNumber) ? true : false,
                    emailError: this.state.formData.email.length === 0 || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.formData.email) ? true : false,
                    cityError: this.state.formData.city.length === 0 ? true : false,
                    countryError: this.state.formData.country.length === 0 ? true : false,
                    timeZoneError: this.state.formData.timeZone.length === 0 ? true : false
                }
            }
        }, async () => {
            if (Object.values(this.state.formError).indexOf(true) < 0) {
                let position = null;
                if(this.state.formData.locationId !== '' && this.state.formData.locationId !== undefined){
                    position = await this.getCoordinates(this.state.formData.locationId);
                }
                let address = new Address({
                    city: this.state.formData.city,
                    country: this.state.formData.country,
                    locationId: this.state.formData.locationId,
                    long: position ? position.Longitude: null,
                    lat: position ? position.Latitude : null
                });
                await address.save();
                let person = new Person({
                    firstName: this.state.formData.firstName,
                    lastName: this.state.formData.lastName,
                    phoneNumber: this.state.formData.phoneNumber,
                    email: this.state.formData.email,
                    address: address._id,
                    timezone: this.state.formData.timeZone
                })
                if (await person.save()) {
                    this.resetFormData();
                } else {
                    this.toggleErrorModal();
                }
            }
        })
    }

    async getCoordinates(locationId) {
        let result = await fetch(`http://geocoder.api.here.com/6.2/geocode.json?locationid=${locationId}&app_id=RaCeBN6d2qKOWzRWcBZu&app_code=_BOiSdF63exs1SfJ1tqmYg&gen=8`, {
            method: 'GET',
        })
        result = await result.json();
        if(result){
            try{
                return result.Response.View[0].Result[0].Location.DisplayPosition
            }catch(err){
                return null;
            }
        }else{
            return null
        }
    }

    resetFormData = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                formData: {
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    city: '',
                    country: '',
                    timeZone: '',
                    locationId: ''
                },
            }
        })
    }

    toggleErrorModal = () => {
        this.setState((prevState) => { return { ...prevState, modalToggle: !prevState.modalToggle } });
    }

    async handleInputChange(event, value, name) {
        if (event) {
            value = event.target.type === 'checkbox' ? event.target.checked : this.props.store.firstUpper(event.target.value);
            name = event.target.name;
        }
        this.setState((prevState) => {
            return { ...prevState, formData: { ...prevState.formData, [name]: value } }
        });
    }


    render() {
        if (this.props.store.timezones) {
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
                                onChange={this.handleInputChange.bind(this)}
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
                                onChange={this.handleInputChange.bind(this)}
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
                                onChange={this.handleInputChange.bind(this)}
                                invalid={this.state.formError.phoneNumberError}
                                id="phoneNumber"
                                placeholder="e.g. +467612345678" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={this.state.formData.email}
                                onChange={this.handleInputChange.bind(this)}
                                invalid={this.state.formError.emailError}
                                id="email"
                                placeholder="e.g. nisse.nissesson@nisse.com" />
                        </FormGroup>
                        <AutoCompleteGroup onLocationId={this.handleInputChange.bind(this)}>
                            <AutoComplete
                                labelText="City"
                                name="city"
                                placeholder="e.g. Tomelilla"
                                updateValue={this.handleInputChange.bind(this)}
                                value={this.state.formData.city}
                                invalid={this.state.formError.cityError}
                                suggestOn="city"
                            />
                            <AutoComplete
                                labelText="Country"
                                name="country"
                                updateValue={this.handleInputChange.bind(this)}
                                value={this.state.formData.country}
                                invalid={this.state.formError.countryError}
                                placeholder="e.g. Sweden"
                                suggestOn="country"
                            />
                        </AutoCompleteGroup>
                        <FormGroup>
                            <Label for="timeZone">TimeZone</Label>
                            <Input
                                type="select"
                                name="timeZone"
                                value={this.state.formData.timeZone}
                                onChange={this.handleInputChange.bind(this)}
                                invalid={this.state.formError.timeZoneError}
                                id="timeZone"
                                multiple={false}
                            >
                                <option value="">Choose a timezone</option>
                                {this.props.store.timezones.map(obj => <option key={obj._id} value={obj._id}>{obj.offset}</option>)}
                            </Input>
                        </FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
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

export default AddFriend;

