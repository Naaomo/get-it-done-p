import React from 'react';
import './getService.css'
import plant from './plant.png'
class GetService extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

 
  render() {
    const usDollar = {
    style: "currency",
    currency: "USD"
    }
    return (

        <div className="main-container">
          <div className="card-conatiner">
          {this.props.providersList.map(data => {
            const currency = data.price.toLocaleString('en-US', usDollar)
            return (
              <div className="card col-3 profile shadow-sm p-3 mb-5 bg-white rounded" key={data.sp_id}>
                <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH20KsMqEsDNhgG_QAOTG1kQ5Y1lypixt56Q&usqp=CAU" alt="cooking" />
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
          <div className="card-conatiner">
          {this.props.providersList.map(data => {
            const currency = data.price.toLocaleString('en-US', usDollar)
            return (
              <div className="card col-3 profile shadow-sm p-3 mb-5 bg-white rounded" key={data.sp_id}>
                <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH20KsMqEsDNhgG_QAOTG1kQ5Y1lypixt56Q&usqp=CAU" alt="cooking" />
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
    );
  }
}

export default GetService;