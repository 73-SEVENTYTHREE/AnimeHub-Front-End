import React from 'react';
import ResultHeader from '../../components/ResultHeader'
import SearchResult from "../../components/SearchResult";
import {useMount} from "ahooks";

function Result(props) {
    useMount(()=>{
        const {location}=props;
        let searchString;

        if(location.state&&location.state.searchString){//判断当前有参数
            searchString=location.state.searchString;
            sessionStorage.setItem('searchString',searchString);// 存入到sessionStorage中
        }
    })
    return (
        <div>
            <ResultHeader history={props.history}/>
            <SearchResult searchString={props.location.state.searchString}/>
        </div>
    );
}

export default Result;