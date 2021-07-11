import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';

function ResultHeader(props) {
    return (
        <div>
            <div style={{backgroundColor:'black'}}>
                <Link to={"/index"}>
                    <img style={{width:'10rem',height:'3.5rem',paddingLeft:'.5rem'}} src={logo} alt="logo"/>
                </Link>
            </div>
            <div className="search bar2">
                <div className={'form'} id={'indexSearchBox'}>
                    <input style={{}} type="text" placeholder="请输入搜索内容..."/>
                    <button onClick={()=>{ window.location.href = '/result' }}/>
                </div>
            </div>
        </div>
    );
}

export default ResultHeader;