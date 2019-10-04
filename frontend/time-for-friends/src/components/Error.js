import React, { Component } from 'react';

class Error extends Component {

    render() {
       return(
        <div className="d-flex flex-column justify-content-center align-items-center p-4" style={{height:'100%'}}>
            <h1 className="h1">{this.props.title}</h1>
            <p className="">{this.props.description}</p>
        </div>
       )
    }


}

export default Error;

