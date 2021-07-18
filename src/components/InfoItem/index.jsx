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
    // if(Array.isArray(content) && content.length === 1) style.width='50%'
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
                                <Link to={{pathname:'result',state:{searchString:item}}} style={{fontSize:'.8rem'}}>{item}<br/></Link>
                            )}
                        />:<Link to={{pathname:'result',state:{searchString:content}}} style={{fontSize:'.8rem'}}>{content}</Link>
                    }
                </div>
            </div>
        </Card>
    );
}

export default InfoItem;