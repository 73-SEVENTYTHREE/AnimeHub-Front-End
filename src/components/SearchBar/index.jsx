import React, {useEffect, useRef, useState} from 'react';
import './index.css';
import {Button, List, message, Skeleton} from "antd";
import {useMount, useUnmount} from "ahooks";
import axios from "axios";


function SearchBar (props) {
    const [inputString, setInputString] = useState('');
    const [relevantWords, setRelevantWords] = useState([]);
    const inputElement = useRef();
    const onFocus = (e) => {
        if (e.target.value === ""){
            let historyWords = localStorage.getItem('historyWords');
            if(historyWords){
                setRelevantWords(JSON.parse(historyWords));
            }
        }
        let hotWords = document.getElementById('hotwords');
        hotWords.style.transition = 'filter 1s';
        hotWords.style.filter = 'blur(2px)';
        let bg = document.getElementById('bg');
        bg.style.filter = 'blur(2px)';
    }
    const onBlur = (e) => {
        let hotWords = document.getElementById('hotwords');
        hotWords.style.transition = 'filter 1s';
        hotWords.style.filter = 'blur(0px)';
        let bg = document.getElementById('bg');
        bg.style.filter = 'blur(0px)';
    }
    const handleSubmit = () => {
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
        sessionStorage.setItem('searchTabDefaultKey','1')
        sessionStorage.setItem('currentPage','1')
        props.history.push({pathname:'result',state:{searchString:str}});
    }

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

    useMount(() => {
        document.addEventListener('click', ev =>{
            setRelevantWords([]);
        });
    })
    return (
        <div className="search bar2">
            <div className={'form'} id={'indexSearchBox'}>
                <input type="text"
                       placeholder="请输入搜索内容..."
                       onFocus={onFocus}
                       onBlur={onBlur}
                       id={'indexInput'}
                       ref={inputElement}
                       onChange={handleChange}
                       onKeyDown={(e) => {
                           if(e.code === 'Enter'){
                               handleSubmit();
                           }
                       }}
                       onClick={e => e.nativeEvent.stopImmediatePropagation()}
                       autoComplete="off"
                />
                    <button type="submit"
                            id={'indexButton'}
                            onClick={handleSubmit}
                    />
                {
                    relevantWords.length === 0 ? "" :(<div id={'word-complete'}><List
                                                            size="small"

                                                            dataSource={relevantWords}
                                                            split={false}
                                                            onClick={e => {
                                                                e.nativeEvent.stopImmediatePropagation()
                                                                const str = e.target.textContent;
                                                                inputElement.current.value = str;
                                                                setInputString(str);
                                                                handleSubmit();
                                                            }}
                                                            renderItem={(item, index) =>
                                                                <List.Item style={{borderRadius:`${index === 0 ? '10px 10px 0 0':'0 0 0 0'}`}} className={'word-item'}>{item}</List.Item>}/>
                        {inputElement.current.value !== '' ? <div/>:<Button style={{border:'0', float:'right', fontSize:'.8rem'}}
                                                                            onClick={e => {
                                                                                e.nativeEvent.stopImmediatePropagation();
                                                                                localStorage.removeItem('historyWords')
                                                                                setRelevantWords([]);
                                                                            }}
                        >清除历史记录</Button>}
                    </div>)
                }
            </div>
        </div>
    );
}

export default SearchBar;