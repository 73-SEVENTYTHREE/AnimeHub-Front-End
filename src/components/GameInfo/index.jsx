import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography, List, Avatar} from "antd";
import {Link} from "react-router-dom";
import removeLastCharacter from "../../utils/removeLastCharacter";
import BangumiScoreTag from "../BangumiScoreTag";
import KnowledgeGraph from "../KnowledgeGraph";

const {TabPane} = Tabs

function GameInfo(props) {
    const {mobile,data} = props
    const keys = Object.keys(data.extra_data)
    console.log(data)
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
            <Card style={{margin:'1rem 2rem 2rem 2rem', minHeight:'45rem'}} hoverable>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={mobile ? 24 : 8}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{margin:'0 auto'}}><Image width={'10rem'} src={removeLastCharacter(data.visuals)}/></div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Divider orientation={'left'}>游戏名</Divider>
                                <div>
                                    <Tag>中文名称</Tag>
                                    {data.zh_name}<br/>
                                    <Tag>原名</Tag>
                                    {data.primary_name}<br/>
                                    <Tag>别名</Tag>
                                    {
                                        data.names.map((item,index)=>{
                                            if(index===0){
                                                return <span>{item}</span>
                                            }else{
                                                return <span>、{item}</span>
                                            }
                                        })
                                    }
                                </div>
                                <Divider orientation={'left'}>基本信息</Divider>
                                {
                                    data.genre===undefined?'':
                                        data.genre===null?'':
                                            <div>
                                                <Tag>游戏类型</Tag>
                                                {data.genre}
                                            </div>
                                }
                                {
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <Tag>游戏评分</Tag>
                                        <BangumiScoreTag score={data.score_general} user_count={data.vote_count}
                                                         style={{fontSize:'0.7rem',padding:'0.1rem',width:'2.9rem',height:'1.3rem'}}
                                                         logoStyle={{width:'.8rem'}}/>
                                    </div>
                                }
                                {
                                    data.start_date===undefined?'':
                                        data.start_date===null?'':
                                            <div>
                                                <Tag>发售日期</Tag>
                                                {data.start_date}
                                            </div>
                                }
                                {
                                    data.platform===undefined?'':
                                        data.platform===null?'':
                                            <div>
                                                <Tag>发售平台</Tag>
                                                {data.platform.map((item,index)=>{
                                                    if(index===0){
                                                        return <span>{item}</span>
                                                    }else{
                                                        return <span>、{item}</span>
                                                    }
                                                })}
                                            </div>
                                }
                                {
                                    data.engine===undefined?'':
                                        data.engine===null?'':
                                            <div>
                                                <Tag>游戏引擎</Tag>
                                                {data.engine}
                                            </div>
                                }
                            </div>
                            <div>
                                {data.extra_data===undefined?'':
                                    data.extra_data===null?'':
                                        <div>
                                            <Divider orientation={'left'}>其他信息</Divider>
                                            {
                                                keys.map((item, index)=>{
                                                    return(
                                                        <div>
                                                            <Tag>{item}</Tag>
                                                            {data.extra_data[item]}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </Col>
                    <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}}/>
                    <Col span={mobile ? 24:15}>
                        <Tabs defaultActiveKey="1">
                            <TabPane key={'1'} tab={"游戏简介"}>
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
                            <TabPane key="2" tab={"游戏人物"}>
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

export default GameInfo;