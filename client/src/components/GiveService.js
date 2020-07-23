import React from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import './giveService.css';

class GiveService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            serviceType: [],
            u_id: 5,
            place_id: "",
            service_id: "1",
            price: null,
            contact: null,
            description: null,
            images: [],
        }
    }
    componentDidMount = () => {
        this.getServiceType();
        this.getCookies();
    }

    //submission error???
    getCookies(){
        console.log("Cookies are: " + window.document.cookie);
        let cookieString = window.document.cookie;
        if(cookieString) {
            let cookies = cookieString.split('; ');
            console.log("Logged In");
            console.log(cookies);
            this.setState({u_id: cookies[0].split('=')[1]});
            this.setState({userName: decodeURI(cookies[1].split('=')[1])});
        }
    }

    getServiceType = async () => {
        const serviceList = await fetch('/services/servicetype');
        const serviceData = await serviceList.json();
        console.log(serviceData);
        this.setState({
            serviceType: serviceData
        })
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    async handleServiceSubmit(){
        console.log(JSON.stringify({
            u_id: this.state.u_id,
            st_id: this.state.service_id,
            price: this.state.price,
            description: this.state.description,
            contact: this.state.contact,
            place_id: this.state.place_id
            }));
        let response = await fetch("/services/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                u_id: this.state.u_id,
                st_id: this.state.service_id,
                price: this.state.price,
                description: this.state.description,
                contact: this.state.contact,
                place_id: this.state.place_id
            })
        });

        let json = await response.json();
        console.log(json);
    }
    uploadImages = (e) => {
      console.log(e.target.files[0])
      const {images} = this.state;
      images.push(URL.createObjectURL(e.target.files[0]))
      this.setState({
        images: images
      })
    }
    deleteImg = (e) => {
      const del = e.target.value;
      const images  = this.state.images
      images.splice(del, 1)
      this.setState({
        images : images
      })
    }
    render() {
     
        return (
            <div className="container align-content-center">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Service Type</label>
                        <select className="custom-select rounded mb-2 mr-sm-2" name="service_id" onChange={(e) => this.handleInputChange(e)}>
                            {this.state.serviceType.map(item => {
                                    return <option key={item.st_id} value={item.st_id}>{item.service}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Location</label>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyB8O0QjLaPA4gUeud_KDDtaQH7COiTZ75Y"
                            inputClassName="form-control"
                            onSelect={({ place_id }) => (this.setState({ place_id: place_id}))}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Price per hour</label>
                        <input className="form-control" type="number" name="price" onChange={(e) => this.handleInputChange(e)}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Contact Number</label>
                        <input className="form-control" type="tel" name="contact" onChange={(e) => this.handleInputChange(e)}/>
                    </div>
                </div>
                <div class="input-group mb-3">
                  <div class="custom-file">
                    <input type="file" onChange={(e) => {this.uploadImages(e)}}class="custom-file-input" id="inputGroupFile02"/>
                    <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                  </div>
                </div>
                    <div className="preview-container">
                       { this.state.images.map((item, index) => {
                        
                            return (
                              <div className="x-button-container">
                                <img src={item} key={index} value={index} className="upload-img"/>
                                <button value={index} className="x-button" onClick={(e)=> this.deleteImg(e)}>X</button>
                              </div>
                            )
                        }) 
                        }
                    </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Description</label>
                    <textarea className="form-control" name="description" placeholder="Give your customers some details about your service" rows="5" onChange={(e) => this.handleInputChange(e)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={()=>this.handleServiceSubmit()}>Add Service</button>
            </div>
        );
    }
}

export default GiveService;
