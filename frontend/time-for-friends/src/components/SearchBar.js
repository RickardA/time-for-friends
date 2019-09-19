import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


export default class SearchBar extends Component {

    state = {
        nameSearchVal: ''
    }

    componentDidMount() {
    }

    handleSearchByName(event) {
        event.preventDefault();
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value }, () => {
            this.props.handleSearch({ firstName: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' }});
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="nameSearch">Search by First Name</Label>
                        <Input type="text" onChange={this.handleSearchByName.bind(this)} value={this.nameSearchVal} name="nameSearchVal" id="nameSearch" placeholder="e.g. Nisse" />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}


