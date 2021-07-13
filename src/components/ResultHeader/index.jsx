import React, {useRef, useState} from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './index.css';
import {message} from "antd";
import {useUpdate} from "ahooks";
import PubSub from 'pubsub-js';

function ResultHeader(props) {
    const [inputString, setInputString] = useState(props.searchString ? props.searchString:'');
    const inputElement = useRef();
    const handleSubmit = () => {
        const currentUrl = props.history.location.pathname
        if(inputString === ''){
            message.warning('请输入搜索内容！', 1);
            return;
        }
        if (currentUrl !== '/result'){
            props.history.push({pathname:'result',state:{searchString:inputString}});
        }
        else{
            sessionStorage.setItem('searchString',inputString);
            PubSub.publish('ChangeInput', inputString);
        }
    }
    return (
        <div id={'banner'}>
            <div id="banner-bg" />
            <Link to={"/Index"}>
                <img style={{width:'10rem',paddingLeft:'.6rem'}} src={logo} alt="logo"/>
            </Link>
            <div className={'search-bar-container'}>
                <input id={'searchInput'}  type="text"
                       defaultValue={props.searchString === undefined ? '':props.searchString}
                        placeholder={props.searchString === undefined ? '请输入搜索内容...':''}
                        ref={inputElement}
                        onChange={() => setInputString(inputElement.current.value)}/>
                <button id={'searchButton'} onClick={handleSubmit}/>
            </div>
        </div>
    );
}
export default ResultHeader;