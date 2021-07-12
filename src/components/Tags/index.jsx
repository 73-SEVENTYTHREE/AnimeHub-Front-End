import React from 'react';
import { Tag, Card } from 'antd';

function Tags (props) {
    const tags = props.tags
    return (
        <div style={{display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', marginBottom:'-0.4rem'}}>
            {
                tags.map(item =>
                    <Tag style={{marginBottom:'.4rem'}}>
                        {item}
                    </Tag>
                )
            }
        </div>
    );
}
export default Tags;