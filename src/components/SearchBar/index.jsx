import React, {useEffect, useState} from 'react';
import './index.css';
import {states} from './data'

function SearchBar (props) {
    return (
        <div className="search bar2">
            <form>
                <input type="text" placeholder="请输入您要搜索的内容..." />
                    <button type="submit"/>
            </form>
        </div>
    );
}

export default SearchBar;