import React, {useState} from 'react';
import ResultHeader from '../../components/ResultHeader'
import SearchResult from "../../components/SearchResult";
import {useMount} from "ahooks";

function Result(props) {
    const [SearchString, setSearchString] = useState(
        props.location.state && props.location.state.searchString?
            props.location.state.searchString:sessionStorage.getItem('searchString')
    );
    useMount(()=>{
        const {location}=props;
        if(location.state&&location.state.searchString){//判断当前有参数
            let searchString=location.state.searchString;
            sessionStorage.setItem('searchString',searchString);// 存入到sessionStorage中
        }
    })
    return (
        <div>
            <ResultHeader history={props.history} searchString={SearchString}/>
            <SearchResult searchString={SearchString}/>
        </div>
    );
}

export default Result;