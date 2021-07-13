import React, {useEffect, useRef, useState} from 'react';
import './index.css';
import {message} from "antd";

function SearchBar (props) {
    const [inputString, setInputString] = useState('');
    const inputElement = useRef();
    const onFocus = (e) => {
        let hotWords = document.getElementById('hotwords');
        hotWords.style.transition = 'filter 1s';
        hotWords.style.filter = 'blur(3px)';
        let bg = document.getElementById('bg');
        bg.style.filter = 'blur(3px)';
    }
    const onBlur = (e) => {
        let hotWords = document.getElementById('hotwords');
        hotWords.style.transition = 'filter 1s';
        hotWords.style.filter = 'blur(0px)';
        let bg = document.getElementById('bg');
        bg.style.filter = 'blur(0px)';
    }
    const handleSubmit = () => {
        if(inputString === ''){
            message.warning('请输入搜索内容！', 1);
            return;
        }
        props.history.push({pathname:'result',state:{searchString:inputString}});
    }
    return (
        <div className="search bar2">
            <div className={'form'} id={'indexSearchBox'}>
                <input type="text"
                       placeholder="请输入搜索内容..."
                       onFocus={onFocus}
                       onBlur={onBlur}
                       id={'indexInput'}
                       ref={inputElement}
                       onChange={() => setInputString(inputElement.current.value)}
                />
                    <button type="submit"
                            id={'indexButton'}
                            onClick={handleSubmit}
                    />
            </div>
        </div>
    );
}

export default SearchBar;