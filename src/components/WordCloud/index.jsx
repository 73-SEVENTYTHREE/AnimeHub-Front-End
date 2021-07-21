import React from 'react';
import ReactWordcloud from "react-wordcloud";

let words = [
    {
        text: 'told',
        value: 164,
        guid:'fake',
    },
    {
        text: 'mistake',
        value: 111,
    },
    {
        text: 'thought',
        value: 116,
    },
    {
        text: 'bad',
        value: 117,
    },
]

const options = {
    enableTooltip: false,
    deterministic: false,
    fontSizes: [30,50],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
};

let callbacks = {
}

function WordCloud(props) {
    if(props.words) words = props.words;
    if(props.callbacks) callbacks = props.callbacks;
    return (
        <div style={{width:'100%',height:'100%'}}>
            <ReactWordcloud words={words} options={options} callbacks={callbacks}/>
        </div>
    );
}

export default WordCloud;