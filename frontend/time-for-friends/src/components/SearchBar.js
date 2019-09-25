import React, { Component } from 'react';
import { FormGroup, Label, Input,ButtonGroup ,Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
                this.props.handleSearch({ [this.state.searchByVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, actualTime: { $gte: timeSpan.from, $lte: timeSpan.to } }, { timezone: 1,firstName:1 });
            } else {
                this.props.handleSearch({ [this.state.searchByVal]: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }, $or: [{ actualTime: { $gte: timeSpan.from } }, { actualTime: { $lte: timeSpan.to } }] }, { timezone: 1,firstName:1 });
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

    sortButtonPressed(event){
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="d-flex flex-column pl-2 pr-2 pl-lg-5 pr-lg-5" style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'grey', borderRadius: '10px' }}>
                <div className="d-flex flex-grow-1">
                    <h4>Search</h4>
                </div>
                <div className="d-flex flex-column flex-md-row">
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
                    <div className="d-flex align-items-baseline justify-content-center flex-grow-1 mt-2 mt-md-0">
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
                </div>
                <div className="d-flex mb-2 flex-column align-items-center">
                    <Label>Sort By:</Label>
                    <div className="d-flex justify-content-center">
                    <ButtonGroup>
                        <Button color="primary" value="firstName" onClick={this.sortButtonPressed.bind(this)}>First name</Button>
                        <Button color="primary" value="lastName" onClick={this.sortButtonPressed.bind(this)}>Last name</Button>
                        <Button color="primary" value="timezone" onClick={this.sortButtonPressed.bind(this)}>Timezone</Button>
                    </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}


