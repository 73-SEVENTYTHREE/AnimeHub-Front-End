import React from 'react';
import { Row, Col, Divider } from 'antd';
import ResultHeader from "../../components/ResultHeader";
import './index.css';


function DetailInfo (props) {
    const style = { background: '#0092ff', padding: '8px 0' };
    return (
        <div>
            <ResultHeader/>
            <Divider orientation="left">Responsive</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={18}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>
        </div>
    );
}

export default DetailInfo;