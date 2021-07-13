import React, {useEffect, useState} from 'react';
import './index.css';

function SearchBar (props) {
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
    return (
        <div className="search bar2">
            <div className={'form'} id={'indexSearchBox'}>
                <input type="text" placeholder="请输入搜索内容..." onFocus={onFocus} onBlur={onBlur} id={'indexInput'}/>
                    <button type="submit" id={'indexButton'} onClick={()=>props.history.push({pathname:'result',state:{searchString:'工作细胞'}})}/>
            </div>
        </div>
    );
}

export default SearchBar;