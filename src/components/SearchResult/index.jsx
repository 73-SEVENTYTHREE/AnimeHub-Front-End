import React from 'react';
import {Row,Col} from 'antd';

function SearchResult(props) {
    return (
        <div>
            <Row>
                <Col span={4}>
                    <div style={{backgroundColor:'#bfa',height:'100px'}}>筛选栏</div>
                </Col>
                <Col span={16}>
                    <div style={{backgroundColor:'#fff',height:'100px'}}>主展示栏</div>
                </Col>
                <Col span={4}>
                    <div style={{backgroundColor:'#000',height:'100px'}}>其他展示栏</div>
                </Col>
            </Row>
        </div>
    );
}

export default SearchResult;