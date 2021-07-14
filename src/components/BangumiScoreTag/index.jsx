/**
 * Bangumi番剧评分展示组件
 * 需要传入的参数：1. score:得分；2. user_count：评分人数
 * 2021/07/13
 * Author:Wei Liu
 * */
import React, {useState} from 'react';
import {Popover, Tag} from "antd";
import Bangumi from "../../images/icons/bangumi.png";

const BangumiScoreTag = (props) => {
    const [hoverBangumi, setHoverBangumi] = useState(false);
    const handleHoverChange = visible => {
        setHoverBangumi(visible);
    }
    const style = props.style === undefined ?
        {
            fontSize:'.8rem',
            padding:'.2rem',
            width:'3.5rem'
        }:
        props.style;
    const logoStyle = props.logoStyle === undefined ?
        {
            width:'1rem'
        }:
        props.logoStyle;
    return(
        <Popover
            style={{ width: 500 }}
            content={`${props.score}分 / ${props.user_count}人点评`}
            title="Bangumi评分"
            trigger="hover"
            visible={hoverBangumi}
            onVisibleChange={handleHoverChange}>
            <Tag icon={<img src={Bangumi} alt={'bangumi'} style={{...logoStyle}}/>}
                 style={{display:'flex', alignItems:'center', justifyContent:'center', ...style}}
                 color={'#EE868E'}
            >

                &nbsp;{props.score}
            </Tag>
        </Popover>
    )
}

export default BangumiScoreTag;