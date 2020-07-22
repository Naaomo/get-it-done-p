import React from 'react';
// import {withRouter} from "react-router-dom";
import './mapView.css';
import {Map, Marker, TileLayer} from "react-leaflet";


class MapView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            serviceLocations: [],
            locality: ""
        }
    }

    componentDidMount() {
        this.getServiceLocations();
    }

    async getServiceLocations(){
        const serviceList = await fetch(`/services/servicebyidandloc/3/EhhPcmdsZSBSb2FkLCBBY2NyYSwgR2hhbmEiLiosChQKEgn90RfH8ZnfDxFdemNNIEN0gRIUChIJc6e3soSQ3w8R0y0OZdhO0b4`);
        const services = await serviceList.json();
        console.log(services);
        this.setState({serviceLocations: services});
        this.setState({locality: services[0].loc_locality});
    }

    render() {
        return (
            <div>
                <div><h1>{`Services found in ${this.state.locality}`}</h1></div>
                <div>
                    <Map center={[5.577895400000001, -0.2305186]} zoom={15}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {this.state.serviceLocations.map(service => <Marker key={service.sp_id} position={[service.loc_lat, service.loc_lng]} />)}
                    </Map>
                </div>
            </div>
        );
    }
}

export default MapView;