import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography, List, Avatar} from "antd";
import {Link} from "react-router-dom";

const {TabPane} = Tabs

function BookInfo(props) {
    const {mobile, data} = props
    console.log(data);
    return (
        <Card style={{margin:'1rem 2rem 2rem 2rem', minHeight:'60rem'}} hoverable>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{height:'60rem'}}>
                <Col span={mobile ? 24 : 6}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{margin:'0 auto'}}><Image width={'10rem'} src={data.visuals[0]}/></div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Divider orientation={'left'}>名称</Divider>
                            <div >
                                <Tag>原名:</Tag>{data.primary_name}<br/>
                                <Tag>中文名:</Tag>{data.zh_name}
                            </div>
                            <Divider orientation={'left'}>作者</Divider>
                            <div>
                                {data.writer.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}><Link>{item}</Link></span>
                                    }else{
                                        return <span key={index}>、<Link>{item}</Link></span>
                                    }
                                })}
                            </div>
                            <Divider orientation={'left'}>出版社</Divider>
                            <div>
                                {data.press.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}><Link>{item}</Link></span>
                                    }else{
                                        return <span key={index}>、<Link>{item}</Link></span>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </Col>
                <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}}/>
                <Col span={mobile ? 24:17}>
                    <Tabs defaultActiveKey="1">
                        <TabPane key={'1'} tab={"书籍简介"}>
                            <div style={{display:'flex',flexDirection:'column',padding:'1rem'}}>
                                <Typography.Title level={5} color={'blue'}>内容简介:</Typography.Title>
                                <Typography.Paragraph>{data.description}</Typography.Paragraph>
                                <Typography.Title level={5}>大家倾向于把{data.primary_name}标记为：</Typography.Title>
                                <div>
                                    {data.tags.map((item, index)=>{
                                        return <Tag key={index}>{item}</Tag>
                                    })}
                                </div>
                            </div>
                        </TabPane>
                        <TabPane key="2" tab={"人物介绍"}>
                            <List
                                itemLayout="horizontal"
                                dataSource={data.chara_list}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.visuals} />}
                                            title={<a href="https://ant.design">{item.primary_name}</a>}
                                            description={
                                                <div>
                                                    <Tag>中文名：{item.zh_name}</Tag>
                                                    <Tag>{item.role}</Tag>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Card>
    );
}

export default BookInfo;