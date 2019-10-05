import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Error from '../components/Error';

@inject('store')
@observer
class FriendMap extends Component {

    componentDidMount() {
        this.props.store.getPersons();
    }

    render() {

        let map;

        if (this.props.store.persons.status === 'done') {
            map = <Map
                mapId="friendMap"
                height="70vh"
                center={{ lat: 50, lng: 50 }}
                persons={this.props.store.persons.data}
                infoBubble="true"
                zoom="3" />
        } else if (this.props.store.persons.status === 'loading') {
            map = <Loading />
        } else {
            map = <Error title="Something went wrong..." description="Couldn't load your friends, please try again!" />
        }

        return (
            <div className="ml-md-5 mr-md-5 mb-4 mr-1 ml-1">
                <div className="mt-4 mb-4">
                    <SearchBar />
                </div>

                {map}
            </div>
        );
    }
}

export default FriendMap;

