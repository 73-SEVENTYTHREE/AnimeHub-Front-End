import React from 'react';
import {Card, Col, Divider, Row} from "antd";

function RealPersonInfo (props) {
    const {data, mobile} = props;
    return (
        <Card style={{margin:'1rem 2rem 2rem 2rem', minHeight:'60rem'}} hoverable>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{height:'60rem'}}>
                <Col className="gutter-row" span={mobile ? 24 : 6}>
                    <div id={'person-description'}>

                    </div>
                </Col>
                <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}}/>
                <Col className="gutter-row" span={mobile ? 24:17}>
                        222
                </Col>
            </Row>
        </Card>

    );
}

export default RealPersonInfo;