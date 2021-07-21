import React, {useRef, useState} from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './index.css';
import {Button, List, message, Skeleton} from "antd";
import {useMount, useUpdate} from "ahooks";
import PubSub from 'pubsub-js';
import axios from "axios";

function ResultHeader(props) {
    const [inputString, setInputString] = useState(props.searchString ? props.searchString:'');
    const [relevantWords, setRelevantWords] = useState([]);
    const inputElement = useRef();
    const handleChange = async e => {
        if(e.target.value !== ""){
            setInputString(e.target.value);
            let words = (await axios.post ('/api/inputCompleting', {searchString: inputElement.current.value})).data.data;
            setRelevantWords(words);
        }
        else{
            let historyWords = localStorage.getItem('historyWords');
            const arr = [...new Set(JSON.parse(historyWords))];
            if(historyWords){
                setRelevantWords([...new Set(arr)]);
            }
        }
    }

    const handleSubmit = () => {
        //获取当前路由地址
        const currentUrl = props.history.location.pathname
        const str = inputElement.current.value;
        if(str === ''){
            message.warning('请输入搜索内容！', 1);
            return;
        }
        let historyWords = localStorage.getItem('historyWords');
        if(historyWords){
            let arr = [...new Set(JSON.parse(historyWords))];
            arr.unshift(str);
            arr = [...new Set(arr)];
            localStorage.setItem('historyWords',JSON.stringify(arr.length > 10 ? arr.slice(0, 10):arr));
        }
        else{
            localStorage.setItem('historyWords', JSON.stringify([str]));
        }
        //如果不是result路由，则代表当前在详情页，直接跳转至对应路由即可
        console.log(currentUrl)
        if (currentUrl !== '/result'){
            props.history.push({pathname:'/result',state:{searchString:str}});
        }
        //如果当前页面就是result路由，则无需跳转，直接将参数传给SearchResultList组件
        else{
            sessionStorage.setItem('searchString',str);
            PubSub.publish('ChangeInput', str);
        }
        setRelevantWords([]);
    }
    useMount(() => {
        document.addEventListener('click', ev =>{
            setRelevantWords([]);
        });
    })
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
                       onClick={e => {
                           e.nativeEvent.stopImmediatePropagation()
                       }}
                       onFocus={(e) =>{
                           if (e.target.value === ""){
                               let historyWords = localStorage.getItem('historyWords');
                               if(historyWords){
                                   setRelevantWords(JSON.parse(historyWords));
                               }
                           }
                       }}
                       autoComplete="off"
                />
                <button id={'searchButton'} onClick={handleSubmit}/>
                {
                    relevantWords.length === 0 ? "" :<div id={'word-complete'} style={{border:'1px solid #f3f3f3'}}><List
                                                            size="small"
                                                                split={false}
                                                            dataSource={relevantWords}
                                                            onClick={e => {
                                                                e.nativeEvent.stopImmediatePropagation()
                                                                const str = e.target.textContent;
                                                                inputElement.current.value = str;
                                                                setInputString(str);
                                                                handleSubmit();
                                                                setRelevantWords([])
                                                            }}
                                                            onScroll={e => e.nativeEvent.stopImmediatePropagation()}
                                                            renderItem={(item, index) => <List.Item style={{borderRadius:`${index === 0 ? '10px 10px 0 0':'0 0 0 0'}`}} className={'word-item'}>{item}</List.Item>}/>
                        {inputElement.current.value !== '' ? <div/>:<Button style={{border:'0', float:'right', fontSize:'.8rem'}}
                                                                            onClick={e => {
                                                                                e.nativeEvent.stopImmediatePropagation();
                                                                                localStorage.removeItem('historyWords')
                                                                                setRelevantWords([]);
                                                                            }}
                                                            >清除历史记录</Button>}
                    </div>
                }
            </div>
        </div>
    );
}
export default ResultHeader;