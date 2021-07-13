/**
 * BiliBili番剧评分展示组件
 * 需要传入的参数：1. score:得分；2. user_count：评分人数
 * 2021/07/13
 * Author:Wei Liu
 * */
import React, {useState} from 'react';
import {Popover, Tag} from "antd";
import BiliBili from "../../images/icons/bilibili.png";

const BiliBiliScoreTag = (props) => {
    const [hoverBiliBili, setHoverBiliBili] = useState(false);
    const handleHoverChange = visible => {
        setHoverBiliBili(visible);
    }
    const style = props.style === undefined ?
        {
            fontSize:'.5rem',
            padding:'.2rem',
            width:'3.5rem'
        }:
        props.style;
    const logoStyle = props.logoStyle === undefined ?
        {
            width:'1rem'
        }:
        props.logoStyle;
    return (
        <Popover
            style={{ width: 500 }}
            content={`${props.score}分 / ${props.user_count}人点评`}
            title="BiliBili评分"
            trigger="hover"
            visible={hoverBiliBili}
            onVisibleChange={handleHoverChange}>
            <Tag icon={<img src={BiliBili} alt={'bilibili'} style={{...logoStyle}}/>}
                 style={{display:'flex', alignItems:'center', justifyContent:'center', ...style}}
                 color={'#EA7A99'}
            >

                &nbsp;{props.score}
            </Tag>
        </Popover>
    )
}
export default BiliBiliScoreTag;