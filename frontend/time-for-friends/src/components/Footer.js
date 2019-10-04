import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return ( 
            <div id="footer" className="d-flex flex-column align-items-center justify-content-center" style={{backgroundColor: '#333',height:'60px'}}>
                <p style={{color:'white',margin:'0'}}>© 2019 Time For Friends</p>
            </div>  
        );
    }

}

