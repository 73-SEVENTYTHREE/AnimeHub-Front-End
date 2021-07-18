import React, {useState} from 'react';
import {Divider} from "antd";
import TypeTag from "../TypeTag";

function NameDivider (props) {
    return (
        <div style={{overflow:'auto'}}>
            <Divider orientation="left" style={{fontSize:'1.4rem', marginTop:'1.5rem'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                    {props.title}
                    &nbsp;
                    <TypeTag type={props.type}/>
                </div>
            </Divider>
        </div>
    );
}

export default NameDivider;