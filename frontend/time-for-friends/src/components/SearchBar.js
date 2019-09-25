import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


export default class SearchBar extends Component {

    state = {
        nameSearchVal: '',
        searchByRadioBtnVal: 'firstName',
        fromTime: '',
        toTime: '',
    }

    componentDidMount() {
    }

    handleSearchByName(event) {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value }, () => {
            this.props.handleSearch({ [this.state.searchByRadioBtnVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' } }, {[this.state.searchByRadioBtnVal]:1});
        })
    }

    handleRadioBtnChange(event) {
        const value = event.target.value;

        this.setState({ searchByRadioBtnVal: value }, () => {
            this.props.handleSearch({ [this.state.searchByRadioBtnVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' } }, {[this.state.searchByRadioBtnVal]:1});
        });
    }

    handleTimeChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value},() =>{
            const fromTimeHour = parseInt(this.state.fromTime.split(':')[0]);
            const fromTimeMin = parseInt(this.state.fromTime.split(':')[1]);
            const toTimeHour = parseInt(this.state.toTime.split(':')[0]);
            const toTimeMin = parseInt(this.state.toTime.split(':')[1]);

            const fromTimes = (fromTimeHour * 60) + fromTimeMin;
            const toTimes = (toTimeHour * 60) + toTimeMin;

            if(fromTimes <= toTimes){
                this.props.handleSearch({actualTime: {$gte: fromTimes, $lte: toTimes}});
            }else {
                this.props.handleSearch({$or:[{actualTime: {$gte: fromTimes}},{actualTime: {$lte: toTimes}}]});
            }
        })
    }

    calculateCurrentTimezones(){
        let currentTimezones = [];
        const fromTime = moment(this.state.fromTime, 'HH:mm')
        const toTime = moment(this.state.toTime, 'HH:mm')
        moment.tz.names().forEach((timezone)=>{
            const timeNow = moment(moment.tz(timezone).format('HH:mm'),'HH:mm')
            if (fromTime.isAfter(timeNow) && toTime.isBefore(timeNow)) {
                currentTimezones.push(timezone);
            }
        })
    
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="6">
                        <FormGroup>
                            <Input
                                type="text"
                                onChange={this.handleSearchByName.bind(this)}
                                value={this.state.nameSearchVal}
                                name="nameSearchVal"
                                id="nameSearch"
                                placeholder="Search" />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup tag="fieldset" >
                            <FormGroup style={{ display: 'inline-block' }} >
                                <Label check>
                                    <Input
                                        onChange={this.handleRadioBtnChange.bind(this)}
                                        checked={this.state.searchByRadioBtnVal === 'firstName' ? true : false}
                                        value="firstName"
                                        type="radio"
                                        name="firstNameRadio" />
                                    FirstName
                             </Label>
                            </FormGroup>
                            <FormGroup className="ml-4" style={{ display: 'inline-block' }}>
                                <Label check>
                                    <Input
                                        onChange={this.handleRadioBtnChange.bind(this)}
                                        checked={this.state.searchByRadioBtnVal === 'lastName' ? true : false}
                                        value="lastName"
                                        type="radio"
                                        name="lastNameRadio" />
                                    LastName
                            </Label>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="exampleTime">From:</Label>
                            <Input
                                type="time"
                                name="fromTime"
                                id="fromTime"
                                placeholder="time placeholder"
                                onChange={this.handleTimeChange.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleTime">To:</Label>
                            <Input
                                type="time"
                                name="toTime"
                                id="toTime"
                                placeholder="time placeholder"
                                onChange={this.handleTimeChange.bind(this)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}


