import React from 'react';
import './search.css';
// import { Button, Modal } from 'react-bootstrap';
// import Geonames from 'geonames.js'; 
import 'opencage-api-client';
const OCD_API_KEY = process.env.REACT_APP_OCD_API_KEY;


// const geonames = new Geonames({
//   username: 'mina066',
//   lan: 'en',
//   encoding: 'JSON'
// });

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showLocation: false,
      location: [],
      cityNearby: [],
      data: [],
      selectedData: [],
      name: []
    }
  
  };


  handleChange = event => {
    const { name, value } = event.target;
    console.log(name)
    this.setState({
      [name]: value
    })
  }
  async componentDidMount() {
    // const response = await fetch(`/users`);
    // const jsonData = await response.json();
    const {data} = this.state;
    let dataObject = [
      {
      location: "4002 Leon",
      serviceType: "cleaning", 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDnokzAPE-GU5ph0WgreTD6TyI7Y-FyMDauA&usqp=CAU',
      price: '$30'
    },
      {
        location: "9012 Malaga",
      serviceType: "cleaning", 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDnokzAPE-GU5ph0WgreTD6TyI7Y-FyMDauA&usqp=CAU',
      price: '$30'
    },
    { location: "0001 Murcia",
      serviceType: "cleaning", 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDnokzAPE-GU5ph0WgreTD6TyI7Y-FyMDauA&usqp=CAU',
      price: '$30'
    },
    {
    location: "6013 Valencia",
    serviceType: "cleaning", 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDnokzAPE-GU5ph0WgreTD6TyI7Y-FyMDauA&usqp=CAU',
    price: '$30'
  },
  {
    location: "6013 Valencia",
    serviceType: "cleaning", 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDnokzAPE-GU5ph0WgreTD6TyI7Y-FyMDauA&usqp=CAU',
    price: '$30'
  }
]
  
    data.push(dataObject)
    this.setState({
      data: dataObject
    })
    this.showDropdown();


  }

  getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    } 
    }

  showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OCD_API_KEY}`)
    .then(response =>  response.json()) 
    .then(data => {
      console.log(data.results[0].components.city);
      const { cityNearby } = this.state;
      cityNearby.push(data.results[0].components.city)
      this.setState({
        cityNearby: cityNearby
      })
    })  
    }


  async handleClick() {
    const selected = this.state.selected;
    try{
      const response = await fetch(`user/${selected}`);
      const jsonData = await response.json();
      this.setState({
        selectedData: jsonData
      })
      if(!jsonData.ok) {
        throw Error(jsonData.statusText)
      }
    } catch(error) {
      console.log(error);
    }
  }

  // locationPopup = () => {
  //   return this.setState({
  //     showLocation: !this.state.showLocation
  //   })
  // }

  async showDropdown() {
      const location = await fetch('https://api.first.org/data/v1/countries');
      const result = await location.json();
      Object.keys(result.data).forEach((key, index) => {
        const { location } = this.state;
        location.push(result.data[key].country)
        this.setState({
          location: location
      })
    })
      // let countries = [];
      // let countryData = Object.values(result.data);
      // for (let country of countryData){
      // countries.push(country.country);
      // }
      // console.log(countries);
  }
  
  render() {
   
        return (
          <>
            <div className="checkbox-container">         
              <input type="checkbox" onChange={this.handleChange} className="checkbox" id="1" name="cleaning" value="clearning"/>
                <label for="clearning">Cleaning</label>
              <input type="checkbox" onChange={this.handleChange} className="checkbox" id="2" name="gardening" value="gardening"/>
                <label for="clearning">Gardening</label>
              <input type="checkbox" onChange={this.handleChange} className="checkbox" id="3" name="moving" value="moving"/>
                <label for="clearning">Moving</label>
              <input type="checkbox" onChange={this.handleChange} className="checkbox" id="4" name="plumbing" value="plumbing"/>
                <label for="clearning">Plumbing</label>
                <br></br>
            </div> 
            <div>
              <button onClick={() => this.getLocation()}>Find service nearby</button>
              <select type="select">
                <option selected hidden>Select your country</option>
              {this.state.location.map((city, index) => { 
               return <option key={index} value={index}>{city}</option>
              })
              } 
            </select>
            </div>
            
            <button onClick={() => this.handleClick()}>Search</button>
            {/* <Modal show={this.state.showLocationPopup} 
                 onHide={!this.state.showLocationPopup}> */}
              

           {/* </Modal> */}
            <div className="card-container">
              {this.state.data.map((each) => {
                return (
                  <div className="card head" style={{width: '13rem'}}>
                    <img className="card-img-top" src={each.image} alt="Card image cap"/>
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                )
              })}
          </div>
          </>
        );
      }
};

export default Search;