import React from 'react';
import {Timeline} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

function InfoTimeline (props) {
        const {descriptionArray} = props;
    return (
        <Timeline>
                {
                descriptionArray.map(item => item === "\r\n" ? "":(
                    <Timeline.Item style={{minHeight:'2rem'}} dot={<InfoCircleOutlined className="timeline-clock-icon"/>}>{item.replace('\r\n', '')}</Timeline.Item>
                ))
                }
        </Timeline>
    );
}
export default InfoTimeline;