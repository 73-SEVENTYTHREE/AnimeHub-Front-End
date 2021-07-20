import React, {useRef, useState} from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './index.css';
import {List, message, Skeleton} from "antd";
import {useUpdate} from "ahooks";
import PubSub from 'pubsub-js';
import axios from "axios";

function ResultHeader(props) {
    const [inputString, setInputString] = useState(props.searchString ? props.searchString:'');
    const [relevantWords, setRelevantWords] = useState([]);
    const inputElement = useRef();
    const handleChange = async e => {
        setInputString(e.target.value);
        let words = (await axios.post ('/api/inputCompleting', {searchString: inputElement.current.value})).data.data;
        setRelevantWords(words);

    }

    const handleSubmit = () => {
        //获取当前路由地址
        const currentUrl = props.history.location.pathname
        const str = inputElement.current.value;
        if(str === ''){
            message.warning('请输入搜索内容！', 1);
            return;
        }
        //如果不是result路由，则代表当前在详情页，直接跳转至对应路由即可
        if (currentUrl !== '/result'){
            props.history.push({pathname:'result',state:{searchString:str}});
        }
        //如果当前页面就是result路由，则无需跳转，直接将参数传给SearchResultList组件
        else{
            sessionStorage.setItem('searchString',str);
            PubSub.publish('ChangeInput', str);
        }
        setRelevantWords([]);
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
                        onChange={handleChange}
                       onKeyDown={(e) => {
                           if(e.code === 'Enter'){
                               handleSubmit();
                           }
                       }}
                       onBlur={e => {
                           setRelevantWords([])
                       }}
                       autoComplete="off"
                />
                <button id={'searchButton'} onClick={handleSubmit}/>
                {
                    relevantWords.length === 0 ? "" :<List id={'word-complete'}
                                                            size="small"
                                                            bordered
                                                            dataSource={relevantWords}
                                                            onClick={e => {
                                                                const str = e.target.textContent;
                                                                inputElement.current.value = str;
                                                                setInputString(str);
                                                                handleSubmit();
                                                                setRelevantWords([])
                                                            }}
                                                            renderItem={item => <List.Item style={{borderRadius:'10px'}} className={'word-item'}>{item}</List.Item>}/>
                }
            </div>
        </div>
    );
}
export default ResultHeader;