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
        lastOpenInfoBubble: null,
    }

    componentDidMount() {
        this.createMap();
    }

    createMap() {
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

                let behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
                let ui = window.H.ui.UI.createDefault(map, layer);

                this.addMarkers(map, ui);

                this.setErrorState(false);
            } catch (err) {
                this.setErrorState(true);
            }
        } else {
            this.setErrorState(true);
        }
    }

    addMarkers(map, ui) {
        if (this.props.persons && Array.isArray(this.props.persons)) {
            for (let person of this.props.persons) {
                map.addObject(this.createMarker(map, ui, person));
            }
        } else if (this.props.persons) {
            map.addObject(this.createMarker(map, ui, this.props.persons));
        }
    }

    checkIfMarkerExists(map, markCoords) {
        let existingMarkers = map.getObjects();
        if (existingMarkers.length > 0) {
            let matchingMarker = existingMarkers.filter(marker => {
                return marker.b.lat === markCoords.lat && marker.b.lng === markCoords.lng;
            })
            if (matchingMarker.length > 0) {
                return matchingMarker;
            }
        }
        return null;
    }

    createMarker(map, ui, person) {
        let markCoords = {
            lat: person.address.lat,
            lng: person.address.long
        }
        let existingMarker = this.checkIfMarkerExists(map, markCoords);
        let marker = new window.H.map.Marker(markCoords);
        if (this.props.infoBubble === 'true') {
            if (existingMarker) {
                marker.setData(existingMarker[0].P.replace('</p>', `<br> ${person.firstName} ${person.lastName}</p>`));
            } else {
                marker.setData(`<p style="font-size:13px">${person.firstName} ${person.lastName}</p>`);
            }

            marker.addEventListener('tap', event => {
                const bubble = new window.H.ui.InfoBubble(event.target.getGeometry(),
                    {
                        content: event.target.getData()
                    }
                )
                if (this.state.lastOpenInfoBubble) {
                    this.state.lastOpenInfoBubble.close();
                }
                ui.addBubble(bubble);
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        lastOpenInfoBubble: bubble,
                    }
                })
            }, false);
        }
        return marker;
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

