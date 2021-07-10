import React from 'react';
import logo from './logo.png';
import './index.css'

function Header (props) {
    return (
        <div>
            <img src={logo} id={'logo'} alt={'logo'}/>
        </div>
    );
}

export default Header;