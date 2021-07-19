import React from 'react';
import {Avatar, Timeline} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

function CommentTimeLine (props) {
    console.log(props);
    return (
        <Timeline mode="left" style={{paddingTop:'2rem'}}>
            {
                Array.isArray(props.comments) ? props.comments.map(item => <Timeline.Item  style={{marginLeft:'-65%'}} label={item.comment_time} dot={<ClockCircleOutlined style={{ fontSize: '16px'}}/>} >
                    <Meta
                        avatar={
                            <Avatar src={item.comment_visuals} draggable/>
                        }
                        title={item.commenter_name}
                        description={item.comment_texts}
                    />
                </Timeline.Item>):''
            }
        </Timeline>
    );
}

export default CommentTimeLine;