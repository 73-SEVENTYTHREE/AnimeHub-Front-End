import React from 'react';
import {Empty, Timeline} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

function InfoTimeline (props) {
        const {descriptionArray} = props;
    return (
        <div>
            {
                descriptionArray.length === 1 && descriptionArray[0] === "" ? <Empty style={{marginTop:'4rem'}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无相关信息'}/>:
                    <Timeline>
                        {

                            descriptionArray.map(item => item === "\r\n" ? "":(
                                <Timeline.Item style={{minHeight:'2rem'}} dot={<InfoCircleOutlined className="timeline-clock-icon"/>}>{item.replace('\r\n', '')}</Timeline.Item>
                            ))
                        }
                    </Timeline>
            }
        </div>
    );
}
export default InfoTimeline;