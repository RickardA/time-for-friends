import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
    FormGroup, Label,
    Input, ButtonGroup,
    Button, InputGroup,
    InputGroupButtonDropdown, DropdownToggle,
    DropdownMenu, DropdownItem,
    ListGroup, ListGroupItem
} from 'reactstrap';


export default class AutoComplete extends Component {

    state = {
        width: 0,
        suggestions: null,
        inputFieldValue: ''
    }

    componentDidMount() {
        const DOMNode = ReactDOM.findDOMNode(this.refs.inputField)
        this.setState({
            width: DOMNode.clientWidth
        });
        console.log(DOMNode.clientWidth)
    }


    async getSuggestions(event) {
        //this.props.onChange(event);
        this.setState({
            inputFieldValue: event.target.value
        });
        let result = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=RaCeBN6d2qKOWzRWcBZu&app_code=_BOiSdF63exs1SfJ1tqmYg&query=${event.target.value}`, {
            method: 'GET',
        })
        result = await result.json();
        console.log(result)
        if (result.suggestions) {
            this.setState({
                suggestions: result.suggestions.filter(suggestion => suggestion.matchLevel === 'country')
            });
        } else {
            this.setState({
                suggestions: null
            })
        }
        console.log(this.state.suggestions)
    }

    suggestionClicked(event) {
        event.preventDefault();
        console.log(event.target.getAttribute('value'))
    }

    render() {
        return (
            <FormGroup>
                <Label for={this.props.name}>{this.props.labelText}</Label>
                <Input
                    type="text"
                    name={this.props.name}
                    id="inputField"
                    onChange={this.getSuggestions.bind(this)}
                    value={this.state.inputFieldValue}
                    ref="inputField"
                    placeholder={this.props.placeholder} />
                {this.state.suggestions ? <ListGroup style={{ zIndex: '2', position: 'absolute', height: '200px', overflow: 'auto', width: this.state.width }}>
                    {this.state.suggestions.map(suggestion =>
                        <ListGroupItem action onClick={this.suggestionClicked.bind(this)} key={suggestion.locationId} value={suggestion.address.country}>{suggestion.address.country}</ListGroupItem>
                    )}</ListGroup> : null}
            </FormGroup>
        )
    }
}


