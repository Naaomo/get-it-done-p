import React from 'react';

// import {withRouter} from "react-router-dom";
import './mapView.css';
import {Map, Marker, TileLayer, Popup} from "react-leaflet";


class MapView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            serviceLocations: [],
            startLat: 5.577895400000001,
            startLng: -0.2305186,
            zoom: 15,
            activeService: null
        }
    }

    componentDidMount() {
        // this.getServiceLocations();
        this.setState({
            startLat: this.props.services[0].loc_lat,
            startLng: this.props.services[0].loc_lng,
        })
    }

    async getServiceLocations(){
        const serviceList = await fetch(`/services/servicebyidandloc/3/EhhPcmdsZSBSb2FkLCBBY2NyYSwgR2hhbmEiLiosChQKEgn90RfH8ZnfDxFdemNNIEN0gRIUChIJc6e3soSQ3w8R0y0OZdhO0b4`);
        const services = await serviceList.json();
        console.log(services);
        this.setState({serviceLocations: services});
        this.setState({locality: services[0].loc_locality});
    }

    render() {
        const usDollar = {style: "currency", currency: "USD"}
        return (
            <div>
                <div>
                    <Map center={[this.state.startLat, this.state.startLng]} zoom={this.state.zoom}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {this.props.services.map(service => (
                            <Marker
                                key={service.sp_id}
                                position={[service.loc_lat, service.loc_lng]}
                                onClick={() => this.setState({activeService: service})}
                            />
                            )
                        )}
                        {this.state.activeService && (
                            <Popup position={[this.state.activeService.loc_lat, this.state.activeService.loc_lng]} onClose={() => this.setState({activeService: null})}>
                                <div><h5>{this.state.activeService.price.toLocaleString('en-US', usDollar)}</h5></div>
                            </Popup>
                        )}
                    </Map>
                </div>
            </div>
        );
    }
}

export default MapView;