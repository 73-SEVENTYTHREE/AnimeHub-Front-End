import React, {useEffect, useRef, useState} from 'react';
import './index.css';
import {List, message, Skeleton} from "antd";
import {useMount, useUnmount} from "ahooks";
import axios from "axios";


function SearchBar (props) {
    const [inputString, setInputString] = useState('');
    const [relevantWords, setRelevantWords] = useState([]);
    const inputElement = useRef();
    const onFocus = (e) => {
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
        // setRelevantWords([])
    }
    const handleSubmit = () => {
        const str = inputElement.current.value;
        if(str === ''){
            message.warning('请输入搜索内容！', 1);
            return;
        }
        props.history.push({pathname:'result',state:{searchString:str}});
    }

    const handleChange = async e => {
        setInputString(e.target.value);
        let words = (await axios.post ('/api/inputCompleting', {searchString: inputElement.current.value})).data.data;
        setRelevantWords(words);
    }

    useMount(() => {
        document.addEventListener('keydown', e => console.log())
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
                       autoComplete="off"
                />
                    <button type="submit"
                            id={'indexButton'}
                            onClick={handleSubmit}
                    />
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
                                                            }}
                                                            renderItem={item => <List.Item style={{borderRadius:'10px'}} className={'word-item'}>{item}</List.Item>}/>
                }
            </div>
        </div>
    );
}

export default SearchBar;