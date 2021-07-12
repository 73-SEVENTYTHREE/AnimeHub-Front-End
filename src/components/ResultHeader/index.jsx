import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './index.css';

function ResultHeader(props) {
    return (
        <div style={{backgroundColor:'rgb(55,133,140)', display:'flex', alignItems:'center', height:'4rem'}}>
            <Link to={"/index"}>
                <img style={{width:'10rem',paddingLeft:'.6rem'}} src={logo} alt="logo"/>
            </Link>
            <div className={'search-bar-container'} style={{width:'35rem',height:'2.5rem'}}>
                <input id={'searchInput'}  type="text" placeholder="请输入搜索内容..."/>
                <button id={'searchButton'} onClick={()=>{  props.history.push('result') }}/>
            </div>
        </div>
    );
}
export default ResultHeader;