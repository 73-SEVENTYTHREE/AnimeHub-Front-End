import React from 'react';
import TV from "../../images/icons/tv.png";
import {Tag} from "antd";

function TypeTag (props) {
    const type = props.type;
    return (
        <Tag icon={<img src={TV} alt={'tv'} style={{display:'inline-block', width:'.6rem'}}/>}
             style={{height:'1.4rem', width:'3.5rem', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
            &nbsp;番剧
        </Tag>
    );
}

export default TypeTag;