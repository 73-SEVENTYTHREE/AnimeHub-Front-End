import React from 'react';
import removeLastCharacter from "../../utils/removeLastCharacter";
import {Avatar, Card, Col, Divider, Empty, Image, Row, Tabs, Tag, Typography} from "antd";
import {Link} from "react-router-dom";
import InfoTimeline from "../InfoTimeline";
import Tags from "../Tags";
import Meta from "antd/es/card/Meta";
import KnowledgeGraph from "../KnowledgeGraph";
import CommentTimeLine from "../CommentTimeLine";
import {UserOutlined} from "@ant-design/icons";

const {TabPane} = Tabs

function CompanyInfo (props) {
    const {data, mobile} = props
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
            <Card style={{margin:'2rem 2rem 2rem 2rem', minHeight:'30rem'}} hoverable>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={mobile ? 24 : 6}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{margin:'0 auto'}}><Image width={'10rem'} src={removeLastCharacter(data.visuals)}/></div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Divider orientation={'left'}>名称</Divider>
                                <div>
                                    <Tag style={{marginBottom:'.5rem'}}>原名</Tag>{data.primary_name}<br/>
                                    <Tag style={{marginBottom:'.5rem'}}>中文名</Tag>{data.zh_name}<br/>
                                    <Tag>别名</Tag>{data.names.join('、')}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}}/>
                    <Col span={mobile ? 24:17}>
                        <Tabs defaultActiveKey="1" type={'card'} onChange={(key) => {
                            setTimeout(() => {
                                const relevantContainer = document.getElementById('relevant-container');
                                let resultContainer = document.getElementById('result-container');
                                relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                                const container = document.getElementById('detail-container');
                                container.style.height = document.body.scrollHeight.toString() + 'px';
                            }, 200)
                        }}>
                            <TabPane key={'1'} tab={"公司简介"}>
                                <div style={{display:'flex',flexDirection:'column',padding:'1rem', maxHeight:'50rem', overflow:'auto'}}>
                                    <Typography.Paragraph><InfoTimeline descriptionArray={data.description.split('<br>')}/></Typography.Paragraph>
                                </div>
                            </TabPane>
                            <TabPane tab="最近作品" key="2" style={{height:'100%'}}>
                                <div style={{marginTop:'2rem', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                                    {
                                        data.recently_participated.map(item =>
                                            (
                                                <div style={{width:'80%'}}>
                                                    <Meta
                                                        avatar={
                                                            <Avatar icon={item.visuals === "https:" ? <UserOutlined />:''} src={item.visuals} draggable/>
                                                        }
                                                        style={{minWidth:'15rem', marginRight:'2rem'}}
                                                        title={<Link to={{pathname:'result', state:{searchString:item.pri_name}}}>{item.pri_name}</Link>}
                                                        description={<div>
                                                            {item.badge_job}
                                                            <Divider style={{padding:'0', margin:'1rem'}}/>
                                                        </div>}
                                                    />
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="吐槽评论" key="3" style={{paddingLeft:'1rem', maxHeight:'60rem', overflow:'auto'}}>
                                <CommentTimeLine comments={data.comment_box}/>
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

export default CompanyInfo;