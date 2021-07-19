import React from 'react';
import {Timeline} from "antd";

function InfoTimeline (props) {
        const {descriptionArray} = props;
    return (
        <Timeline>
                {
                descriptionArray.map(item => item === "\r\n" ? "":(
                    <Timeline.Item>{item}</Timeline.Item>
                ))
                }
        </Timeline>
    );
}

export default InfoTimeline;