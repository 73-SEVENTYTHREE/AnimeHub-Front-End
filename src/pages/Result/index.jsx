import React from 'react';
import ResultHeader from '../../components/ResultHeader'
import SearchResult from "../../components/SearchResult";
import {useMount} from "ahooks";
import {useState} from 'react';

function Result(props) {
    let [searchString,setSearchString] = useState('')
    useMount(()=>{
        const {location}=props;
        let searchString1;

        if(location.state&&location.state.searchString){//判断当前有参数
            searchString1=location.state.searchString;
            sessionStorage.setItem('searchString',searchString1);// 存入到sessionStorage中
        }
        searchString1 = sessionStorage.getItem('searchString')
        setSearchString(searchString1)
        console.log(searchString1)
    })
    return (
        <div>
            <ResultHeader history={props.history}/>
            <SearchResult searchString={searchString}/>
        </div>
    );
}

export default Result;