import React from 'react';
import ResultHeader from '../../components/ResultHeader'

function Result(props) {

    return (
        <div>
            <ResultHeader history={props.history}/>
        </div>
    );
}

export default Result;