import React, { Component } from 'react';
import moment from 'moment-timezone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Clock extends Component {

    state = {
        time: this.props.timezone ? moment().tz(this.props.timezone).format('YYYY-MM-DD HH:mm:ss') : ''
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount(){
        clearInterval(this.intervalID);
    }

    tick(){
        this.setState({
            time: this.props.timezone ? moment().tz(this.props.timezone).format('YYYY-MM-DD HH:mm:ss') : ''
        })
    }

    render() {
        return (
            <p><FontAwesomeIcon icon='clock' /> {this.state.time}</p>
        );
    }
}

