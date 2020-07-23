import React from 'react';
import './getService.css'
import plant from './icons/plant.png'
import { Alert, Button, Modal } from 'react-bootstrap';

class GetService extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showBooking: false,
      show: false
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
  render()
   {
    const usDollar = {
    style: "currency",
    currency: "USD"
    }
   
    return (
      <div>
        <div className="main-container">
        <Alert show={this.state.show} variant="success">
          <div className="alert-close">
            <p>Your booking request has been sent to the do-er.</p>
            <Button variant="outline-success" onClick={() => this.setShow()}>close</Button>
          </div>
        </Alert>
          <div className="card-container-flex">
          {this.props.providersList.map(data => {
            const currency = data.price.toLocaleString('en-US', usDollar)
            return (
              <div className="card col-3 profile shadow-sm p-3 mb-5 bg-white rounded" key={data.sp_id} onClick={() => {this.handleClick()}}>
                <img className="card-img-top" 
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH20KsMqEsDNhgG_QAOTG1kQ5Y1lypixt56Q&usqp=CAU" 
                     alt="cooking" />
                <div class="card-body">
                <div className="icon-text">
                  <img className="icon" src={plant} alt="plant"/><p>{data.description}</p>
                </div>
                  <p>{data.loc_description} <span>{currency}</span></p>
                </div>
              </div>
            )
          })}
          </div>
        </div>
           <Modal show={this.state.showBooking} 
           onHide={() => this.handleModalShowing()}>
            <Modal.Header>
                <Modal.Title>See do-er's availability</Modal.Title>
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
                        <Button onClick={() => this.setShow()}className="btn btn-success rounded ">Book Now</Button>
                    </div>
                </div>
            </Modal.Body>
          </Modal> 
      </div>
    );
  }
}

export default GetService;