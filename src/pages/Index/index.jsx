import React from 'react';
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import HotWords from "../../components/HotWords";
import './index.css'

function Index (props) {
    return (
        <div id={'content'}>
            <div id="bg"/>
            <div id="top">
                <Header/>
                <SearchBar history={props.history}/>
            </div>
            <HotWords/>
        </div>
    );
}

export default Index;