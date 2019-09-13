import React, { Component } from 'react';
import FriendsForm from '../components/FriendsForm'

export default class Home extends Component {

    render() {
        return (
            <div style={{padding:'0 10vw 0 10vw'}}>
                <h1>Add friend</h1>
                <FriendsForm />
            </div>
        );
    }

}

