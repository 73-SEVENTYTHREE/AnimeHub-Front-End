import React from 'react';
import {Avatar, Empty, Timeline} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

function CommentTimeLine (props) {
    return (
        <div>
            {
                props.comments.length === 0 ? <Empty style={{marginTop:'4rem'}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无相关评论'}/>:
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
            }
        </div>

    );
}

export default CommentTimeLine;