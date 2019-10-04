import React, { Component } from 'react';
import noMap from '../resources/No_map.png';

export default class Map extends Component {

    state = {
        app_id: 'RaCeBN6d2qKOWzRWcBZu',
        app_code: '_BOiSdF63exs1SfJ1tqmYg',
        center: {
            lat: this.props.center.lat,
            lng: this.props.center.lng,
        },
        zoom: this.props.zoom,
        error: false,
    }

    componentDidMount() {
        
        if (this.state.center.lng !== null && this.state.center.lat !== null && typeof this.state.center.lng !== 'undefined' && typeof this.state.center.lat !== 'undefined') {
            try {
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
                
                if(this.props.persons && Array.isArray(this.props.persons)){
                    for(let person of this.props.persons){
                        console.log("marker")
                        let markCoords = {
                            lat: person.address.lat,
                            lng: person.address.long
                        }
                        let marker = new window.H.map.Marker(markCoords);
    
                        map.addObject(marker);
                    }
                }else if (this.props.persons) {
                    let markCoords = {
                        lat: this.props.persons.address.lat,
                        lng: this.props.persons.address.long
                    }
                    let marker = new window.H.map.Marker(markCoords);

                    map.addObject(marker);
                }
                this.setErrorState(false);
            } catch (err) {
                this.setErrorState(true);
                console.log(err)
            }
        } else {
            this.setErrorState(true);
        }
    }

    setErrorState(state) {
        this.setState((prevState) => {
            return {
                ...prevState,
                error: state,
            }
        })
    }

    render() {
        if (this.state.error === false) {
            return (
                <div id={this.props.mapId} style={{ width: '100%', height: this.props.height, background: 'grey' }}>
                </div>);
        } else {
            return (
                <img src={noMap} alt="No map available" style={{ width: '100%', height: this.props.height }}></img>
            )
        }
    }

}

