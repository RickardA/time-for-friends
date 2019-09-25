import React, { Component } from 'react';
import { FormGroup, Label, Input, Container, Row, Col,Button } from 'reactstrap';


export default class SearchBar extends Component {

    state = {
        nameSearchVal: '',
        searchByRadioBtn: 'firstName',
        fromTime: '00:00',
        toTime: '23:59',
    }

    componentDidMount() {
    }

    performSearch(event) {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value }, () => {
            let timeSpan = {
                from: 0,
                to: 1440
            }
                timeSpan = this.calculateTimeSpan();
            if (timeSpan.from <= timeSpan.to) {
                this.props.handleSearch({ [this.state.searchByRadioBtn]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, actualTime: { $gte: timeSpan.from, $lte: timeSpan.to } },{[this.state.searchByRadioBtn]:1});
            } else {
                this.props.handleSearch({ [this.state.searchByRadioBtn]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, $or: [{ actualTime: { $gte: timeSpan.from } }, { actualTime: { $lte: timeSpan.to } }] },{[this.state.searchByRadioBtn]:1});
            }
        })
    }

    calculateTimeSpan() {
        const fromTimeHour = parseInt(this.state.fromTime.split(':')[0]);
        const fromTimeMin = parseInt(this.state.fromTime.split(':')[1]);
        const toTimeHour = parseInt(this.state.toTime.split(':')[0]);
        const toTimeMin = parseInt(this.state.toTime.split(':')[1]);

        const fromTimes = (fromTimeHour * 60) + fromTimeMin;
        const toTimes = (toTimeHour * 60) + toTimeMin;

        return {from: fromTimes, to: toTimes}
    }

    resetSearchForm(event){
        this.setState({
            nameSearchVal: '',
            searchByRadioBtn: 'firstName',
            fromTime: '00:00',
            toTime: '23:59',
        })
        this.performSearch(event);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="6">
                        <FormGroup>
                            <Input
                                type="text"
                                onChange={this.performSearch.bind(this)}
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
                                        onChange={this.performSearch.bind(this)}
                                        checked={this.state.searchByRadioBtn === 'firstName' ? true : false}
                                        value="firstName"
                                        type="radio"
                                        name="searchByRadioBtn" />
                                    FirstName
                             </Label>
                            </FormGroup>
                            <FormGroup className="ml-4" style={{ display: 'inline-block' }}>
                                <Label check>
                                    <Input
                                        onChange={this.performSearch.bind(this)}
                                        checked={this.state.searchByRadioBtn === 'lastName' ? true : false}
                                        value="lastName"
                                        type="radio"
                                        name="searchByRadioBtn" />
                                    LastName
                            </Label>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="fromTime">From:</Label>
                            <Input
                                type="time"
                                name="fromTime"
                                id="fromTime"
                                value={this.state.fromTime}
                                placeholder="time placeholder"
                                onChange={this.performSearch.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="toTime">To:</Label>
                            <Input
                                type="time"
                                name="toTime"
                                id="toTime"
                                value={this.state.toTime}
                                placeholder="time placeholder"
                                onChange={this.performSearch.bind(this)}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                    <Button color="primary" onClick={this.resetSearchForm.bind(this)}>Reset</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}


