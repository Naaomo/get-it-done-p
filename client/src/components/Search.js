import React from 'react';
import './search.css';
import cleaning from './icons/cleaning.png';
import gardening from './icons/garden.png';
import ironing from './icons/household-appliance.png';
import plumbing from './icons/plumbing.png';
import cooking from './icons/baking.png';
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
    this.showCountryDropdown();


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

  async showCountryDropdown() {
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
  
  allCountries = () => {
      // fetch(`http://battuta.medunes.net/api/country/all/?key=80b5e35938b588a65a40bb55a483caa7`)
      //   .then(res => res.json())
      //   .then(jsonData => {
      //     console.log(jsonData)
      //   });
    };
  render() {
    const country = this.state.location;
        return (
          <> <div className="main-container">
            <div className="checkbox-container">         
                <input type="checkbox" onChange={this.handleChange} className="checkbox" id="1" name="cleaning" value="clearning"/>
                <div>
                  <img src={cleaning} className="icon cleaning" alt="cleaning icon"/>  
                  <label for="clearning">Cleaning </label>
                </div>                
                <input type="checkbox" onChange={this.handleChange} className="checkbox" id="2" name="gardening" value="gardening"/>
                <div>
                  <img src={gardening} className="icon gardening" alt="cleaning icon"/>   
                  <label for="clearning">Gardening</label>
                </div>
                <input type="checkbox" onChange={this.handleChange} className="checkbox" id="3" name="ironing" value="ironing"/>
                <div>  
                  <img src={ironing} className="icon ironing" alt="cleaning icon"/> 
                  <label for="clearning">Ironing</label>
                </div>
                <input type="checkbox" onChange={this.handleChange} className="checkbox" id="4" name="plumbing" value="plumbing"/>
                <div>
                  <img src={plumbing} className="icon plumbing" alt="cleaning icon"/> 
                  <label for="clearning">Plumbing</label>
                </div>
                <input type="checkbox" onChange={this.handleChange} className="checkbox" id="4" name="cooking" value="cooking"/>
                <div>
                  <img src={cooking} className="icon cooking" alt="cleaning icon"/> 
                  <label for="clearning">Cooking</label>
                </div>
             </div>
                <div>
                  <button className="nearby-button"  data-backdrop="false" onClick={() => this.getLocation()}>Find service nearby</button>
                  <select type="select">
                    <option selected hidden>Select your country</option>
                  {this.state.location.map((city, index) => { 
                  return <option key={index} value={index}>{city}</option>
                  })
                  } 
                {/* <button onClick={() => this.getLocation()}>Find service nearby</button>
                <select type="select">
                  <option selected hidden>Select your country</option>
                {this.state.location.map((city, index) => { 
                return <option key={index} value={index}>{city}</option>
                })
                }  */}
                 </select>
                <button onClick= {() => this.allCountries()}>button</button>
                <button onClick={() => this.handleClick()}>Search</button>
            </div> 
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
            </div>
        

            
            

            {/* <Modal show={this.state.showLocationPopup} 
                 onHide={!this.state.showLocationPopup}> */}
              

           {/* </Modal> */}
          </>
        );
      }
};

export default Search;