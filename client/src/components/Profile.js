import React, {Component} from 'react';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: [],
            bookingData: [],
            userData: this.props.cookieData
        }
    }

    componentDidMount() {
        console.log(this.state.userData)

        fetch(`/users/services/${this.state.userData.userID}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({profileData: json})
            })

        fetch(`/services/booking-history/${this.state.userData.userID}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({bookingData: json})
            })

    }

    deleteService = id => {
        fetch(`/users/services/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                u_id: this.state.userData.userID,
            })

        })
            .then(res => res.json())
            .then(res => {

                this.setState(prev => ({ bookingData: prev.bookingData.filter(book => book.id !== id) }))
            });
        document.location.reload();
    };

//not working, map not a function but upon refresh works
    // deleteService = id => {
    //     fetch(`/users/services/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             u_id: this.state.userData.userID,
    //         })
    //
    //     })
    //         .then(res => res.json())
    //         .then(json => this.setState({bookingData: json}));
    // };

    get = async () => {
        // const profileData = await fetch (`/services/${this.translateCookie().userID}`);
        const profileData = await fetch(`/services/${this.state.userData.userID}`);
        console.log(profileData)
    }

    render() {
        return (
            <div className="container">
                <div className="container text-center">
                    <img src={this.state.userData.profile_img} className="img-fluid mb-2"/>
                    {/*TODO Being able to update image*/}
                    <h3>Welcome back, {this.state.userData.displayName}!</h3>
                </div>
                <span>
                <div className="col-5 float-left">
                    <div className="card">
                        <div className="card-header">
                            Services you're providing
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="col">
                                    <div className="card border-light">
                                        {this.state.profileData.map((e, i) => {
                                            return (
                                                <div className="card">
                                                    <h5 className="card-header btn-info d-flex justify-content-between">{e.service}
                                                    <span>
                                                          <button
                                                              className="btn btn-danger-sm"
                                                              onClick={() => this.deleteService(e.sp_id)}>
                                                            X
                                                          </button>
                                                    </span>
                                                    </h5>

                                                    <div className="card-body">
                                                        {/*<p className="card-title">Service Description</p>*/}
                                                        <p className="card-text">{e.description}</p>
                                                        <p className="card-text">{e.loc_description}</p>
                                                        <p className="card-text text-right">${e.price}/hour</p>

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-5 float-right">
                    <div className="card">
                        <div className="card-header">
                            Services you booked
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="col">
                                    <div className="card border-light">
                                        {this.state.bookingData.map((e, i) => {
                                            let date = new Date(e.book_date).toLocaleDateString(('en-GB'), {weekday:'long',year: 'numeric', month: 'numeric', day: 'numeric'})
                                            date = date.replace(/\//g,".")
                                            // date = date.split("/").join(".")
                                            // let date = new Date(e.book_date).toLocaleDateString('ko-KR')
                                            // date = date.slice(0, date.length - 1)

                                            return (
                                                <div className="card">
                                                    <h5 className="card-header btn-info">{e.service}</h5>
                                                    <div className="card-body">
                                                        <p className="card-text">{e.description}</p>
                                                        <p className="card-text">{date} @
                                                            <span className="card-text">{new Date(e.book_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        </p>
                                                        <p className="card-title">{e.loc_description}</p>
                                                        <p className="card-text text-right">${e.price}/hour</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                    </span>
                {/*    end div*/}
            </div>
        );
    }
}

export default Profile;