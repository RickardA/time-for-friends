import React, { Component } from 'react';
import noMap from '../resources/No_map.png';

export default class Map extends Component {

    state = {
        app_id: 'RaCeBN6d2qKOWzRWcBZu',
        app_code: '_BOiSdF63exs1SfJ1tqmYg',
        center: {
            lat: this.props.lat,
            lng: this.props.long,
        },
        zoom: this.props.zoom,
    }


    componentDidMount() {
        if (this.state.center.lat !== null && this.state.center.long !== null) {
            let platform = new window.H.service.Platform(this.state);

            let layer = platform.createDefaultLayers();
            let container = document.getElementById(this.props.mapId);

            let map = new window.H.Map(
                container,
                layer.normal.map, {
                center: this.state.center,
                zoom: this.state.zoom
            }
            );

            let marker = new window.H.map.Marker(this.state.center)

            map.addObject(marker)
        }
    }

    render() {
        if (this.state.center.lat !== null && this.state.center.long !== null) {
            return (
                <div id={this.props.mapId} style={{ width: '100%', height: this.props.height, background: 'grey' }}>
                </div>);
        }else{
            return(
                <img src={noMap} alt="No map available" style={{width:'100%', height:this.props.height}}></img>
            )
        }
    }

}

