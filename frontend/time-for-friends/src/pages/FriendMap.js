import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Map from '../components/Map';

@inject('store')
@observer
class FriendMap extends Component {

    componentDidMount() {
        this.props.store.getPersons();
    }

    render() {
        if (this.props.store.persons.status === 'done') {
            return (
                <Map
                    mapId="friendMap"
                    height="100vh"
                    center={{ lat: 50, lng: 50 }}
                    persons={this.props.store.persons.data}
                    infoBubble="true"
                    zoom="3" />
            );
        }else{
            return(<h1>Loading...</h1>)
        }
    }

}

export default FriendMap;

