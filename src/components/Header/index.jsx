import React from 'react';
import logo from './AnimeHub.png'
import './index.css'

function Header (props) {
    return (
        <div style={{overflow:'hidden'}}>
            <img src={logo} id={'logo'} alt={'logo'}/>
        </div>
    );
}

export default Header;