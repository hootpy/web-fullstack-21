import React, {Component} from 'react';

import SearchField from './SearchField'
import logo from "../img/logo-techkids.png"
import ProfilePanel from './ProfilePanel'

class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="container">
                    <SearchField onSearchChanged = {this.props.onSearchChanged}/>
                    <div className='col-6 text-center'>
                        <img src={logo} alt="logo"/>
                    </div>
                    <ProfilePanel/>
                </div>
            </div>
        );
    }
}

export default NavBar;