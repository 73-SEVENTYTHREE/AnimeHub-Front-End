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
        //获取当前路由地址
        const currentUrl = props.history.location.pathname
        if(inputString === ''){
            message.warning('请输入搜索内容！', 1);
            return;
        }
        //如果不是result路由，则代表当前在详情页，直接跳转至对应路由即可
        if (currentUrl !== '/result'){
            props.history.push({pathname:'result',state:{searchString:inputString}});
        }
        //如果当前页面就是result路由，则无需跳转，直接将参数传给SearchResultList组件
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
                        onChange={() => setInputString(inputElement.current.value)}
                       onKeyDown={(e) => {
                           if(e.code === 'Enter'){
                               handleSubmit();
                           }
                       }}
                />
                <button id={'searchButton'} onClick={handleSubmit}/>
            </div>
        </div>
    );
}
export default ResultHeader;