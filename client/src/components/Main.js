import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import './main.css';
import { withRouter } from "react-router-dom";


class Main extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      serviceType: [],
      filteredService: [],
      isSubmited: ""
    }
  }

  componentDidMount = () => {
    this.getServiceType();
  }

  getServiceType = async () => {
    const serviceList = await fetch('/services/servicetype');
    const serviceData = await serviceList.json();
    console.log(serviceData);
    this.setState({
      serviceType: serviceData
    })
  }

  handleSearch = () => {
    // const providerList = await fetch (`/services/${service_and_location}`);
    // const providersData = await providerList.json();
    const { filteredService } = this.state;
    const providersData = {
      name : "Baba",
      img : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQd53UVQa5PwLX8dDlA3CkMOuPxY1H4uHPvbQ&usqp=CAU",
      location: "Paseo de Extremadura Madrid",
      price: "$30"
    }
    filteredService.push(providersData);
    this.setState({
      filteredService: filteredService,
    })
    this.props.history.push('/getService')
  }

  handleService = (e) => {
    const { value } = e.target; 
    this.setState({
      filterService: value
    })
  }

    render() {

        return (
            <div className="main-section position-relative overflow-hidden p-3 p-md-5 m-md-3">
                <div className="container d-flex flex-column">
                    <div className="row my-auto">
                        <div className="col-lg-5 col-md-12 col-sm-12 pt-16 pt-lg-6 my-auto">
                            <h1 className="display-4 mb-2">Need help ?</h1>
                            <h4 className="mb-2">Let someone give you a hand for a price</h4>
                            <p className="lead">
                                Get It Done connects you to people around you willing to help with your chores ('Do-ers'). For the right price, of course.
                            </p>
                            <p>Find a Do-er now</p>
                            <div>
                                <div className="input-group mb-3">
                                    {/*<input type="text" className="form-control rounded mb-2 mr-sm-2" placeholder="Location" />*/}
                                    <GooglePlacesAutocomplete
                                        apiKey="AIzaSyB8O0QjLaPA4gUeud_KDDtaQH7COiTZ75Y"
                                        inputClassName="form-control rounded mb-2 mr-sm-2"
                                        onSelect={console.log}
                                    />
                                    <select className="custom-select rounded mb-2 mr-sm-2" onChange={(e) => this.handleService(e)}>
                                      {this.state.serviceType.map(item => {
                                        return <option key={item.st_id} value={item.service}>{item.service}</option>
                                      }
                                      )}
                                    </select>
                                    <button className="btn btn-success mb-2" onClick={() => {this.handleSearch()}}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                            <path fillRule="evenodd"
                                                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                        </svg>
                                        &nbsp;&nbsp;Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 ml-auto my-auto">
                            <img className="w-auto" alt="Illustration" src="./images/bg_01.svg"/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Main);
