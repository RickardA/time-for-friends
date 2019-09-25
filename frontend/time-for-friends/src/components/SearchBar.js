import React, { Component } from 'react';
import { FormGroup, Label, Input, Container, Row, Col, Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class SearchBar extends Component {

    state = {
        nameSearchVal: '',
        searchByVal: 'firstName',
        fromTime: '00:00',
        toTime: '23:59',
        searchByDropdown: false,
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
                this.props.handleSearch({ [this.state.searchByVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, actualTime: { $gte: timeSpan.from, $lte: timeSpan.to } }, { [this.state.searchByVal]: 1 });
            } else {
                this.props.handleSearch({ [this.state.searchByVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, $or: [{ actualTime: { $gte: timeSpan.from } }, { actualTime: { $lte: timeSpan.to } }] }, { [this.state.searchByVal]: 1 });
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

        return { from: fromTimes, to: toTimes }
    }

    resetSearchForm(event) {
        this.setState({
            nameSearchVal: '',
            searchByVal: 'firstName',
            fromTime: '00:00',
            toTime: '23:59',
        })
        this.performSearch(event);
    }

    toggleSearchByDropdown() {
        this.setState({
            searchByDropdown: !this.state.searchByDropdown
        })
    }

    render() {
        return (
            <div className="d-flex flex-column pl-5" style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'grey', borderRadius: '10px' }}>
                <h4>Search</h4>
                <div className="d-flex flex-wrap">
                    <div className="flex-grow-1 mr-5 h-100">
                        <InputGroup >
                            <Input
                                type="text"
                                onChange={this.performSearch.bind(this)}
                                value={this.state.nameSearchVal}
                                name="nameSearchVal"
                                id="nameSearch"
                                placeholder="Enter text here" />
                            <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={this.state.searchByDropdown}
                                toggle={this.toggleSearchByDropdown.bind(this)}>
                                <DropdownToggle
                                    color="primary"
                                    name="searchByDropdown"
                                    caret>
                                    Search By
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        name="searchByVal"
                                        value="firstName"
                                        onClick={this.performSearch.bind(this)}>
                                        First name {this.state.searchByVal === 'firstName' ? <FontAwesomeIcon style={{ color: 'green' }} icon='check' /> : null}
                                    </DropdownItem>
                                    <DropdownItem
                                        name="searchByVal"
                                        value="lastName"
                                        onClick={this.performSearch.bind(this)}>
                                        Last name {this.state.searchByVal === 'lastName' ? <FontAwesomeIcon style={{ color: 'green' }} icon='check' /> : null}
                                    </DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </InputGroup>
                    </div>
                    <div className="d-flex flex-wrap flex-grow-1 ml-5 align-items-baseline">
                    <FormGroup>
                        <Input
                            type="time"
                            name="fromTime"
                            id="fromTime"
                            value={this.state.fromTime}
                            placeholder="time placeholder"
                            onChange={this.performSearch.bind(this)}
                        />
                    </FormGroup>
                    <FontAwesomeIcon icon='clock' className="ml-2 mr-2"/>
                    <FormGroup className="mr-5">
                        <Input
                            type="time"
                            name="toTime"
                            id="toTime"
                            value={this.state.toTime}
                            placeholder="time placeholder"
                            onChange={this.performSearch.bind(this)}
                        />
                    </FormGroup>
                    <Button className="ml-5" color="danger" onClick={this.resetSearchForm.bind(this)}>Reset search</Button>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}


