import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography, List, Avatar} from "antd";
import {Link} from "react-router-dom";
import KnowledgeGraph from "../KnowledgeGraph";
import Tags from "../Tags";
import InfoTimeline from "../InfoTimeline";
import removeLastCharacter from "../../utils/removeLastCharacter";

const {TabPane} = Tabs

function BookInfo(props) {
    const {mobile, data} = props
    console.log(data);
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
        <Card style={{margin:'1rem 2rem 2rem 2rem', minHeight:'30rem'}} hoverable>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={mobile ? 24 : 6}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{margin:'0 auto'}}><Image width={'10rem'} src={data.visuals[0]}/></div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Divider orientation={'left'}>名称</Divider>
                            <div >
                                <Tag>原名</Tag>{data.primary_name}<br/>
                                <Tag>中文名</Tag>{data.zh_name}
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
                                <Typography.Title level={5} color={'blue'}>内容简介</Typography.Title>
                                <Typography.Paragraph><InfoTimeline descriptionArray={data.description.split('<br>')}/></Typography.Paragraph>
                                <Typography.Title level={5}>大家倾向于把{data.primary_name}标记为：</Typography.Title>
                                <div>
                                    {
                                        <Tags tags={data.tags}/>
                                    }
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24} style={{padding:'0 3rem 2rem 3rem'}}>
                <KnowledgeGraph guid={data.guid} name={data.primary_name}/>
            </Col>
        </Row>
    </div>
    );
}

export default BookInfo;