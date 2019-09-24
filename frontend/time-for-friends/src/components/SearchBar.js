import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


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
            this.props.handleSearch({ firstName: { $regex: `^${this.state.nameSearchVal}.*`, $options: 'i' } });
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="6">
                        <FormGroup>
                            <Input type="text" onChange={this.handleSearchByName.bind(this)} value={this.nameSearchVal} name="nameSearchVal" id="nameSearch" placeholder="Search" />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup check tag="fieldset">
                            <Label check>
                                <Input type="radio" name="radio1" />
                                FirstName
                             </Label>
                            <Label check>
                                <Input type="radio" name="radio1" />
                                LastName
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}


