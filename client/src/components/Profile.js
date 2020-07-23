import React, {Component} from 'react';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData : [],
            userData: this.props.cookieData
        }
    }

    componentDidMount() {
        console.log(this.state.userData)
        const get = async() => {
            fetch (`/users/services/${this.state.userData.userID}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    //this is not working???
                    this.setState({profileData: json})
                })
        }
        (async function (component) {
            await get()
        })()
    }
//is this the same as the component did mount?
    get = async() => {
        // const profileData = await fetch (`/services/${this.translateCookie().userID}`);
        const profileData = await fetch (`/services/${this.state.userData.userID}`);
        console.log(profileData)
    }

    render() {
        return (
            <div className="container">
                <div className="container text-center">
                    <img src= {this.state.userData.profile_img} className="img-fluid"/>
                    {/*Being able to update image*/}
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
                                        {this.state.profileData.map((e,i) => {
                                            return (
                                                <div className="card">
                                                    <h5 className="card-header btn-info">{e.service}</h5>
                                                    <div className="card-body">
                                                        <p className="card-title">{e.loc_description}</p>
                                                        <p className="card-text">{e.description}</p>
                                                        <p className="card-text">${e.price}</p>
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

            {/*  TODO  Booked services, move to top later*/}

                <div className="col-5 float-right">
                    <div className="card">
                        <div className="card-header">
                            Services you booked
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="col">
                                    <div className="card border-light">
                                        {this.state.profileData.map((e,i) => {
                                            return (
                                                <div className="card">
                                                    <h5 className="card-header btn-info">{e.service}</h5>
                                                    <div className="card-body">
                                                        <p className="card-title">{e.loc_description}</p>
                                                        <p className="card-text">{e.description}</p>

                                                        <p className="card-text">${e.price}</p>
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