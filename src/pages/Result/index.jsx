import React, {useState} from 'react';
import ResultHeader from '../../components/ResultHeader'
import SearchResult from "../../components/SearchResult";
import {useMount} from "ahooks";

function Result(props) {
    //更改state的初始值，修复了渲染两次导致参数缺失的bug
    const [SearchString, setSearchString] = useState(
        props.location.state && props.location.state.searchString?
            props.location.state.searchString:sessionStorage.getItem('searchString')
    );
    useMount(()=>{
        //这里就不更新SearchString了，只需要将其存进sessionStorage即可
        const {location}=props;
        if(location.state&&location.state.searchString){//判断当前有参数
            let searchString=location.state.searchString;
            sessionStorage.setItem('searchString',searchString);// 存入到sessionStorage中
        }
    })
    return (
        <div>
            <ResultHeader history={props.history} searchString={SearchString}/>
            <SearchResult history={props.history} searchString={SearchString}/>
        </div>
    );
}

export default Result;