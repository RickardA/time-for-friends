import React, { Component } from 'react';

export default class AutoCompleteGroup extends Component {

    bindSuggestion(value,name,suggestions){
        if(this.props.onLocationId){
            this.props.onLocationId(null,'','locationId');
        }
        if(name === 'city'){
            const suggestion = suggestions.find(suggestion => {
                return suggestion.address.city === value
            })
            if (suggestion) {
                this.refs.country.setInputValue(suggestion.address.country,'country')
                if(this.props.onLocationId){
                    this.props.onLocationId(null,suggestion.locationId,'locationId');
                }
            }
        }
    } 


    render() {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              bindSuggestion:this.bindSuggestion.bind(this),
              ref:child.props.name
            });
          });
        return (
            <div>
                {children}
            </div>
        )
    }
}


