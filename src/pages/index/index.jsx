import React from 'react';
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import HotWords from "../../components/HotWords";
import './index.css'

function Index (props) {
    return (
        <div>
            <div id='content'>
                <div id="top">
                    <Header/>
                    <SearchBar/>
                </div>
                <HotWords/>
            </div>
        </div>
    );
}

export default Index;