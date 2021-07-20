import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography, List, Avatar, Empty} from "antd";
import {Link} from "react-router-dom";
import KnowledgeGraph from "../KnowledgeGraph";
import Tags from "../Tags";
import InfoTimeline from "../InfoTimeline";
import removeLastCharacter from "../../utils/removeLastCharacter";
import Meta from "antd/es/card/Meta";

const {TabPane} = Tabs

function BookInfo(props) {
    const {mobile, data} = props
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
                    <Tabs defaultActiveKey="1" type={'card'} onChange={(key) => {
                        setTimeout(() => {
                            const relevantContainer = document.getElementById('relevant-container');
                            let resultContainer = document.getElementById('result-container');
                            relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                            const container = document.getElementById('detail-container');
                            container.style.height = document.body.scrollHeight.toString() + 'px';
                        }, 200)
                    }}>
                        <TabPane key={'1'} tab={"书籍简介"}>
                            <div style={{display:'flex',flexDirection:'column',padding:'1rem'}}>
                                <Typography.Title level={5} color={'blue'}>内容简介</Typography.Title>
                                <Typography.Paragraph><InfoTimeline descriptionArray={data.description.split('<br>')}/></Typography.Paragraph>
                                <Typography.Title level={5}>大家倾向于把{data.primary_name}标记为：</Typography.Title>
                                <div>
                                    {
                                        <Tags tags={data.tags} history={props.history}/>
                                    }
                                </div>
                            </div>
                        </TabPane>
                        <TabPane key="2" tab={"人物介绍"}>
                            <div style={{marginTop:'2rem', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                            {
                                data.chara_list.map(item =>
                                    (
                                        <div style={{width:'70%'}}>
                                            <Meta
                                                avatar={
                                                    <Avatar src={item.visuals} draggable/>
                                                }
                                                style={{minWidth:'15rem', marginRight:'2rem'}}
                                                title={<Link to={{pathname:'result', state:{searchString:item.primary_name}}}>{item.primary_name}</Link>}
                                                description={<div>
                                                    <Tag>中文名：{item.zh_name}</Tag>
                                                    <Divider style={{padding:'0', margin:'1rem'}}/>
                                                </div>}
                                            />
                                        </div>
                                    )
                                )
                            }
                                {
                                    data.chara_list.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无人物介绍'}/>:''
                                }
                            </div>
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