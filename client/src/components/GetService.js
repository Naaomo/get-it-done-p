import React from 'react';
import './getService.css'
import MapView from "./MapView";
import { Alert, Button, Modal } from 'react-bootstrap';

class GetService extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        showBooking: false,
        show: false,
        searchLocality: "",
        clickedService: {},
        userId: 0,
        time: "",
        date: ""
    }
  }
  componentDidMount() {
      if(this.props.providersList.length > 0){
          this.setState({searchLocality: this.props.providersList[0].loc_locality})
      }

  }

    handleModalShowing = () => {
    this.setState({
      showBooking: !this.state.showBooking
    })
  }
  handleClick = () => {
    this.setState({
      showBooking: !this.state.showBooking
    })
  }
  setShow = () => {
    this.setState({
      show: !this.state.show,
      showBooking: false
    })
    
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }
  handleServiceSelect(provider){
      this.setState({clickedService: provider});
      this.setState({
          showBooking: !this.state.showBooking
      });
  }
  async handleBookSubmit(provider){
      console.log(provider);
      let cookieArr = [];
      let cookieData = {};
      if(document.cookie){
          //userID=2; displayName=Naomi
          //!sometimes userID is missing upon refresh
          cookieArr = document.cookie.replace("'", "").replace(" ", "").split(';');

          cookieArr.forEach((e,i) => {
              var data = e.split('=')
              cookieData[data[0].trim()] = decodeURIComponent(data[1]);
          })
      }
      // TODO: Route booking to backend
      let response = await fetch("/services/book", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              u_id: cookieData.userID,
              sp_id: provider.sp_id,
              book_date: this.state.date,
              book_time: this.state.time,
              service_owner_id: provider.service_owner_id
          })
      });

      let json = await response.json();
      console.log(json);
      this.setShow();
  }

  render()
   {
       if(this.props.providersList.length < 1){
           return (
               <div className="text-center m-5">
                   <h1>Looks like there are no Do-ers in your area at the moment</h1>
               </div>
           )
       }
    const usDollar = {
    style: "currency",
    currency: "USD"
    }
   
    return (
      <div className="position-relative overflow-hidden">
          <div className="text-center mb-5"><h1><span>Do-ers in {this.state.searchLocality}</span></h1></div>
          <Alert show={this.state.show} variant="success">
              <div className="alert-close">
                  <p>Your booking request has been sent to the do-er.</p>
                  <p>{this.state.time} on {this.state.date} is booked.</p>
                  <Button variant="outline-success" onClick={() => this.setShow()}>close</Button>
              </div>
          </Alert>
          <div className="row border border-secondary">
              <div className="col-md-5">
                  {this.props.providersList.map(data => {
                      const currency = data.price.toLocaleString('en-US', usDollar)
                      return (
                          <div className="card">
                              <div className="card-body mb-4">
                                  <div className="row">
                                      <div className="media">
                                          <img src={data.profile_img} className="mr-3" alt={data.service_owner} />
                                              <div className="media-body">
                                                  <h5 className="mt-0">{data.service_owner} <img src={`./icons/${data.service_type}.png`} alt={`${data.service_type} icon`}/></h5>
                                                  <p>{data.description}</p>
                                                  <h6>{currency}</h6>
                                                  <button className="btn btn-sm btn-primary" onClick={()=>this.handleServiceSelect(data)}>Book Service</button>
                                              </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )
                  })}
              </div>
              <div className="col-md-7">
                  <MapView services = {this.props.providersList}/>
              </div>
          </div>
        <Modal show={this.state.showBooking}
           onHide={() => this.handleModalShowing()}>
            <Modal.Header>
                <Modal.Title>Book {this.state.clickedService.service_owner}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="form-group">
                        <label for="date">Pick a date</label>
                        <input type="date" onChange={e => {this.handleChange(e)}} className="form-control" id="date" name="date" />
                    </div>
                    <div className="form-group">
                        <label for="time">Select a time</label>
                        <input type="time" onChange={e => {this.handleChange(e)}} className="form-control" id="time" name="time" />
                    </div>
                    <div className="form-group">
                        <Button onClick={() => this.handleBookSubmit(this.state.clickedService)} className="btn btn-success rounded ">Book Now</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GetService;