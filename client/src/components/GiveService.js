import React from 'react';


class GiveService extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            serviceType: [],
            filteredService: [],
            isSubmited: "",
            errors: {}
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

    handleService = (e) => {
        const { value } = e.target;
        this.setState({
            serviceId: value
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }



    handleSubmit = () => {
        console.log(this.translateCookie())

        var err = {}
        if(!this.state.inputAddress){
            err.inputAddressErr = "This field cannot be empty"
        }
        if(!this.state.inputServiceDescription){
            err.inputServiceDescriptionErr = "This field cannot be empty"
        }

        if(!this.state.inputZip){
            err.inputZipErr = "This field cannot be empty"
        }else if(!this.state.inputZip.match(/^[0-9]*$/)){
            err.inputZipErr = "Please enter a valid zip code"
        }

        if(!this.state.inputPrice){
            err.inputPriceErr = "This field cannot be empty"
        }else if(!this.state.inputPrice.match(/^[0-9]*$/)){
            err.inputPriceErr = "Please enter a valid price"
        }

        if(!this.state.serviceId){
            err.serviceErr = "Please choose a service"
        }

        if(Object.keys(err).length === 0 && err.constructor === Object){
            const formData = {
                address : this.state.inputAddress,
                serviceDescription: this.state.inputServiceDescription,
                zip: this.state.inputZip,
                serviceId: this.state.serviceId,
                price: this.state.inputPrice,
                userId: this.translateCookie().userID
            }
          console.log(formData)
        }else{
            this.setState({
                errors : err
            })
        }
    }

    render() {
        return (
            <div className="container align-content-center">
                {/*<div className="form-row">*/}
                {/*    <div className="form-group col-md-6">*/}
                {/*        <label htmlFor="inputEmail4">Email</label>*/}
                {/*        <input type="email" className="form-control" id="inputEmail4" />*/}
                {/*    </div>*/}
                {/*    <div className="form-group col-md-6">*/}
                {/*        <label htmlFor="inputPassword4">Password</label>*/}
                {/*        <input type="password" className="form-control" id="inputPassword4" />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="inputAddress">Service Description</label>
                    <textarea className="form-control" rows="5" id="inputServiceDescription" onChange={(e) => this.handleInput(e)}></textarea>
                    {this.state.errors.inputServiceDescriptionErr && (
                        <p>{this.state.errors.inputServiceDescriptionErr}</p>
                    )}
                    {/*<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />*/}
                </div>

                <div className="form-group">
                    <label htmlFor="">Service Type</label>
                    <select className="custom-select rounded mb-2 mr-sm-2" onChange={(e) => this.handleService(e)}>
                        <option value="">Select Service Type</option>
                        {this.state.serviceType.map(item => {
                                return <option key={item.st_id} value={item.st_id}>{item.service}</option>
                            }
                        )}
                    </select>
                    {this.state.errors.serviceErr && (
                        <p>{this.state.errors.serviceErr}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(e) => this.handleInput(e)}/>
                    {this.state.errors.inputAddressErr && (
                        <p>{this.state.errors.inputAddressErr}</p>
                    )}
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="inputAddress2">Address 2</label>*/}
                {/*    <input type="text" className="form-control" id="inputAddress2"*/}
                {/*           placeholder="Apartment, studio, or floor" onChange={(e) => this.handleInput(e)}/>*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="inputZip">Zip</label>
                    <input type="text" className="form-control" id="inputZip" onChange={(e) => this.handleInput(e)}/>
                    {this.state.errors.inputZipErr && (
                        <p>{this.state.errors.inputZipErr}</p>
                    )}
                </div>
                {/*TODO FIX PRICE*/}
                <div className="form-group">
                    <label htmlFor="inputZip">Price</label>
                    <input type="text" className="form-control" id="inputPrice" onChange={(e) => this.handleInput(e)}/>
                    {this.state.errors.inputPriceErr && (
                        <p>{this.state.errors.inputPriceErr}</p>
                    )}
                </div>
                <button type="submit" className="btn btn-success" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        );
    }
}

export default GiveService;
