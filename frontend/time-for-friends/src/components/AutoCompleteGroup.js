import React, { Component } from 'react';

export default class AutoCompleteGroup extends Component {

    state = {
        prevSuggestion: null
    }

    async bindSuggestion(value, name, suggestions) {
        value = value.toLowerCase();
        if (this.props.onLocationId) {
            this.props.onLocationId(null, '', 'locationId');
        }
        if (name === 'city') {
            const suggestion = suggestions.find(suggestion => {
                return suggestion.address.city.toLowerCase() === value
            })
            if (suggestion) {
                this.refs.country.setInputValue(suggestion.address.country, 'country')
                if (this.props.onLocationId) {
                    this.props.onLocationId(null, suggestion.locationId, 'locationId');
                }
            }
            this.setState((prevState) => {
                return {
                    ...prevState,
                    prevSuggestion: suggestion
                }
            })
        } else if (name === 'country') {
            if (this.state.prevSuggestion && this.state.prevSuggestion.address.country.toLowerCase() === value) {
                if (this.props.onLocationId) {
                    this.props.onLocationId(null, this.state.prevSuggestion.locationId, 'locationId');
                }
            } else {
                let result = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=RaCeBN6d2qKOWzRWcBZu&app_code=_BOiSdF63exs1SfJ1tqmYg&language=en&query=${value}+${this.refs.city.getInputValue()}`, {
                    method: 'GET',
                })
                result = await result.json();
                if (result.suggestions) {
                    const suggestion = result.suggestions.filter(
                            suggestion => suggestion.matchLevel === 'city' &&
                            suggestion.address.city.toLowerCase() === this.refs.city.getInputValue() &&
                            suggestion.address.country.toLowerCase() === value);
                    if (suggestion.length > 0 && this.props.onLocationId) {
                        this.props.onLocationId(null, suggestion[0].locationId, 'locationId');
                    }
                }
            }
        }
    }


    render() {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                bindSuggestion: this.bindSuggestion.bind(this),
                ref: child.props.name
            });
        });
        return (
            <div>
                {children}
            </div>
        )
    }
}


