import React from 'react';
import {Row,Col} from 'antd';

function SearchResult(props) {
    return (
        <div>
            <Row>
                <Col span={4}>
                    <div style={{backgroundColor:'#bfa',height:'100px'}}></div>
                </Col>
                <Col span={16}>
                    <div style={{backgroundColor:'#fff',height:'100px'}}></div>
                </Col>
                <Col span={4}>
                    <div style={{backgroundColor:'#000',height:'100px'}}></div>
                </Col>
            </Row>
        </div>
    );
}

export default SearchResult;