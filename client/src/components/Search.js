import React from 'react';
import './search.css';
import { Button, Modal } from 'react-bootstrap';
import Geonames from 'geonames.js'; 

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
    console.log("something");
    this.showDropdown()
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

  }
  
  render() {
    const country = this.state.country;
        return (
          <>
            <input type="text" name="country" onChange={this.handleChange}/>
            {/* <select type="select" onChange={this.onSelected}>
              {this.state.location.map((city, index) => { 
               return <option key={index} value={index}>{city}</option>
              })
             }
             </select> */}
            
            <input type="text" name="serviceType" onChange={this.handleChange}/>
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