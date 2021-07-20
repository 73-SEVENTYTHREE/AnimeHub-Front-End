import React from 'react';
import {Card, List, Typography} from "antd";
import {Link} from "react-router-dom";

function InfoItem (props) {
    const {title, content} = props;
    const style = {
        width:'50%',
        minWidth:'10rem',
        fontSize:'.8rem'
    }
    if(Array.isArray(content) && content.length > 1) style.width='100%'
    return (
        <Card style={{padding:'0', border:'0', marginRight:'.1rem', marginBottom:'.2rem'}}
              hoverable>
            <div className="ribbon-1" style={{...style}}>
                <div className="ribbon-box">
                    <div className="ribbon ribbon-mark bg-info">{title}</div>
                    {
                        Array.isArray(content) ? <List
                            dataSource={content}
                            size={'small'}
                            renderItem={item => (
                                <div>{item}<br/></div>
                            )}
                        />:content
                    }
                </div>
            </div>
        </Card>
    );
}

export default InfoItem;