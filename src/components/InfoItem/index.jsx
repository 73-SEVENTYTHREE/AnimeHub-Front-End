import React from 'react';
import {Card, List, Typography} from "antd";
import {Link} from "react-router-dom";

function InfoItem (props) {
    const {title, content} = props;
    const style = {
        minWidth:'10rem',
        fontSize:'.8rem'
    }
    return (
        <Card style={{padding:'0', border:'0', marginRight:'.1rem', marginBottom:'1rem'}}
              hoverable>
            <div className="ribbon-1" style={{...style}}>
                <div className="ribbon-box">
                    <div className="ribbon ribbon-mark bg-info">{title}</div>
                    {
                        Array.isArray(content) ? content.join('、'):content
                    }
                </div>
            </div>
        </Card>
    );
}

export default InfoItem;