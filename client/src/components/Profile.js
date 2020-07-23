import React, {Component} from 'react';
import './profile.css';
//TODO redirect over here when click on the hello button
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData : [],
            userData: this.props.cookieData
        }
    }
    /*description: "Will make your roses feel the love"
    loc_description: "Orgle Rd, Accra, Ghana"
    price: 10
    service: "Gardening"
    st_id: 3*/

    componentDidMount() {
        console.log(this.state.userData)
        const get = async() => {
            fetch (`/users/services/${this.state.userData.userID}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    this.setState({profileData: json})
                })
        }
        (async function (component) {
            await get()
        })()
    }

    get = async() => {
        const profileData = await fetch (`/services/${this.translateCookie().userID}`);
        console.log(profileData)
    }

    render() {
        return (
            <div>
                {/*this.state.userdata.whatevercookieimg*/}
                <img src="https://i.pinimg.com/280x280_RS/be/3c/fc/be3cfcf670b49e279b59aa21257596ee.jpg" alt=""/>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Hello, {this.state.userData.displayName}
                        </h5>
                    </div>
                </div>
                {/*not a function???*/}
                {this.state.profileData.map((e,i) => {
                    return (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{e.service}</h5>
                                <p className="card-text">{e.description}</p>
                                <p className="card-text">{e.loc_description}</p>
                                <p className="card-text">{e.price}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Profile;