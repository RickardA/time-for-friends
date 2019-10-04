import React, { Component } from 'react';
import {Spinner} from 'reactstrap';

class Loading extends Component {

    render() {
       return(
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100%'}}>
            <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
       )
    }


}

export default Loading;

