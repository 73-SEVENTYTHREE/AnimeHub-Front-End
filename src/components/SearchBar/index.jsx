import React, {useEffect, useState} from 'react';
import './index.css';

function SearchBar (props) {
    const onFocus = (e) => {
        let hotWords = document.getElementById('hotwords');
        hotWords.style.transition = 'filter 1s';
        hotWords.style.filter = 'blur(3px)';
    }
    const onBlur = (e) => {
        let hotWords = document.getElementById('hotwords');
        hotWords.style.transition = 'filter 1s';
        hotWords.style.filter = 'blur(0px)';
    }
    return (
        <div className="search bar2">
            <form id={'indexSearchBox'}>
                <input type="text" placeholder="请输入您要搜索的内容..." onFocus={onFocus} onBlur={onBlur}/>
                    <button type="submit"/>
            </form>
        </div>
    );
}

export default SearchBar;