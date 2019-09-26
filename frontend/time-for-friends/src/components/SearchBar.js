import React, { Component } from 'react';
import { FormGroup, Label, Input, ButtonGroup, Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeZone from '../entities/Timezone'


export default class SearchBar extends Component {

    state = {
        nameSearchVal: '',
        searchByVal: 'firstName',
        sortByVal: 'firstName',
        fromTime: '00:00',
        toTime: '23:59',
        searchByDropdown: false,
        timezone: '',
        timezones: ''
    }

    async componentDidMount() {
        let timeZone = new TimeZone();
        this.setState({ timeZones: await timeZone.find() })
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
                this.props.handleSearch({ [this.state.searchByVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, 'timezone.offset': { $regex: `^${this.state.timezone}`}, actualTime: { $gte: timeSpan.from, $lte: timeSpan.to } },{[this.state.sortByVal]:1});
            } else {
                this.props.handleSearch({ [this.state.searchByVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, 'timezone.offset': { $regex: `^${this.state.timezone}`}, $or: [{ actualTime: { $gte: timeSpan.from } }, { actualTime: { $lte: timeSpan.to } }] },{[this.state.sortByVal]:1});
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
            timezone: ''
        })
        this.performSearch(event);
    }

    toggleSearchByDropdown() {
        this.setState({
            searchByDropdown: !this.state.searchByDropdown
        })
    }

    render() {
        if (this.state.timeZones) {
            return (
                <div className="d-flex flex-column pl-2 pr-2 pl-lg-5 pr-lg-5" style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'grey', borderRadius: '10px' }}>
                    <div className="d-flex flex-grow-1">
                        <h4>Search</h4>
                    </div>
                    <div className="d-flex flex-column flex-lg-row">
                        <div className="d-flex flex-grow-1 h-100">
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
                        <div className="d-flex flex-grow-1 mt-2 mt-lg-0 ml-lg-2">
                            <Input
                                type="select"
                                name="timezone"
                                value={this.state.timezone}
                                onChange={this.performSearch.bind(this)}
                                id="timeZone">
                                <option value="">Show all timezones</option>
                                {this.state.timeZones.map(obj => <option key={obj._id} value={obj.offset}>{obj.offset}</option>)}
                            </Input>
                        </div>
                        <div className="d-flex align-items-baseline justify-content-center flex-grow-1 ml-lg-2 mr-lg-2 mt-3 mt-lg-0">
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
                            <FontAwesomeIcon className="mr-2 ml-2" icon='clock' />
                            <FormGroup>
                                <Input
                                    type="time"
                                    name="toTime"
                                    id="toTime"
                                    value={this.state.toTime}
                                    placeholder="time placeholder"
                                    onChange={this.performSearch.bind(this)}
                                />
                            </FormGroup>
                        </div>
                        <Button className="mb-2 h-100" color="danger" onClick={this.resetSearchForm.bind(this)}>Reset search</Button>
                        <DropdownItem divider />
                    </div>
                    <div className="d-flex mb-2 flex-column align-items-center">
                        <Label style={{textDecoration:'underline'}}>Order By</Label>
                        <div className="d-flex justify-content-center">
                            <ButtonGroup>
                                <Button color="primary" name="sortByVal" value="firstName" onClick={this.performSearch.bind(this)} active={this.state.sortByVal === 'firstName'}>First Name</Button>
                                <Button color="primary" name="sortByVal" value="lastName" onClick={this.performSearch.bind(this)} active={this.state.sortByVal === 'lastName'}>Last Name</Button>
                                <Button color="primary" name="sortByVal" value="timezone" onClick={this.performSearch.bind(this)} active={this.state.sortByVal === 'timezone'}>Timezone</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <h1>Loading</h1>
            );
        }
    }
}


