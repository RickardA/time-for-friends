import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
    FormGroup, Label,
    Input,
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
        document.addEventListener('mousedown', this.clickListener.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clickListener.bind(this), false);
    }


    async getSuggestions(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        this.setState({
            inputFieldValue: event.target.value
        });
        let result = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=RaCeBN6d2qKOWzRWcBZu&app_code=_BOiSdF63exs1SfJ1tqmYg&query=${event.target.value}`, {
            method: 'GET',
        })
        result = await result.json();
        if (result.suggestions) {
            this.setState({
                suggestions: result.suggestions.filter(suggestion => suggestion.matchLevel === this.props.suggestOn)
            });
        } else {
            this.setState({
                suggestions: null
            })
        }
    }

    suggestionClicked(value) {
        this.setState({
            inputFieldValue: value,
            suggestions: ''
        });
    }

    handleInputClick(event) {
        this.getSuggestions(event);
    }

    clickListener(event) {
        if (!event.target.getAttribute('class') || !event.target.getAttribute('class').includes('suggestionItem')) {
            this.setState({
                suggestions: ''
            })
        }
    }

    render() {
        return (
            <FormGroup>
                <Label for={this.props.name}>{this.props.labelText}</Label>
                <Input
                    autoComplete="off"
                    type="text"
                    name={this.props.name}
                    id="inputField"
                    onChange={this.getSuggestions.bind(this)}
                    onClick={this.handleInputClick.bind(this)}
                    value={this.state.inputFieldValue}
                    ref="inputField"
                    placeholder={this.props.placeholder} />
                {this.state.suggestions ? <ListGroup style={{ zIndex: '2', position: 'absolute', height: '200px', overflow: 'auto', marginBottom: '2%', width: this.state.width * 0.98 }}>
                    {this.state.suggestions.map(suggestion =>
                        <ListGroupItem action className="suggestionItem" onClick={() => this.suggestionClicked(suggestion.address[this.props.suggestOn])} key={suggestion.locationId} value={suggestion.address[this.props.suggestOn]}>{suggestion.address[this.props.suggestOn]}</ListGroupItem>
                    )}</ListGroup> : null}
            </FormGroup>
        )
    }
}


