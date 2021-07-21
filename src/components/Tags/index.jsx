import React from 'react';
import { Tag, Card } from 'antd';

function Tags (props) {
    const tags = props.tags
    const generateRandomColor = () => {
        const r = Math.floor(Math.random()*200);
        const g = Math.floor(Math.random()*200);
        const b = Math.floor(Math.random()*200);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    }
    return (
        <div style={{display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', marginBottom:'-0.4rem'}}>
            {
                tags.map(item =>
                    <Tag style={{marginBottom:'.4rem'}} color={generateRandomColor()} onClick={() => {
                        props.history.push({pathname:'/result',state:{searchString:item}});
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                    }}>
                        {item}
                    </Tag>
                )
            }
        </div>
    );
}
export default Tags;