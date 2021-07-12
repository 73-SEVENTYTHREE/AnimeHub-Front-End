import React from 'react';
import ResultHeader from '../../components/ResultHeader'
import SearchResult from "../../components/SearchResult";

function Result(props) {

    return (
        <div>
            <ResultHeader history={props.history}/>
            <SearchResult></SearchResult>
        </div>
    );
}

export default Result;