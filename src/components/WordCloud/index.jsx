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

function WordCloud(props) {
    return (
        <div style={{width:'100%',height:'10rem'}}>
            <ReactWordcloud words={words} options={options}/>
        </div>
    );
}

export default WordCloud;