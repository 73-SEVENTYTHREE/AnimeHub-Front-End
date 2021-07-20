import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography, List, Avatar, Empty} from "antd";
import {Link} from "react-router-dom";
import removeLastCharacter from "../../utils/removeLastCharacter";
import BangumiScoreTag from "../BangumiScoreTag";
import KnowledgeGraph from "../KnowledgeGraph";
import InfoTimeline from "../InfoTimeline";
import CommentTimeLine from "../CommentTimeLine";
import Meta from "antd/es/card/Meta";
import Tags from "../Tags";
import {useMount} from "ahooks";
import WordCloud from "../WordCloud";

const {TabPane} = Tabs

function GameInfo(props) {
    const {mobile,data} = props
    const keys = Object.keys(data.extra_data)
    useMount(() => {
        setTimeout(() => {
            const divider = document.getElementById('game-card-divider');
            divider.style.height = window.getComputedStyle(document.getElementById('game-card')).height;
        }, 200)
    })
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
            <Card style={{margin:'2rem', minHeight:'45rem'}} hoverable id={'game-card'}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={mobile ? 24 : 8}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{margin:'0 auto'}}><Image width={'10rem'} src={removeLastCharacter(data.visuals)}/></div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Divider orientation={'left'}>游戏名</Divider>
                                <div>
                                    <Tag style={{marginBottom:'.5rem'}}>中文名称</Tag>
                                    {data.zh_name}<br/>
                                    <Tag style={{marginBottom:'.5rem'}}>原名</Tag>
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
                                                <Tag style={{marginBottom:'.5rem'}}>游戏类型</Tag>
                                                {data.genre}
                                            </div>
                                }
                                {
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <Tag style={{marginBottom:'.5rem'}}>游戏评分</Tag>
                                        <BangumiScoreTag score={data.score_general} user_count={data.vote_count}
                                                         style={{fontSize:'0.7rem',marginBottom:'.5rem', padding:'0.1rem',width:'2.9rem',height:'1.3rem'}}
                                                         logoStyle={{width:'.8rem'}}/>
                                    </div>
                                }
                                {
                                    data.start_date===undefined?'':
                                        data.start_date===null?'':
                                            <div>
                                                <Tag style={{marginBottom:'.5rem'}}>发售日期</Tag>
                                                {data.start_date}
                                            </div>
                                }
                                {
                                    data.platform===undefined?'':
                                        data.platform===null?'':
                                            <div>
                                                <Tag style={{marginBottom:'.5rem'}}>发售平台</Tag>
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
                                                <Tag style={{marginBottom:'.5rem'}}>游戏引擎</Tag>
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
                                                        <div style={{display: 'inline-block',
                                                            whiteSpace: 'nowrap',
                                                            width: '100%',
                                                            overflow: 'hidden',
                                                            textOverflow:'ellipsis'}}>
                                                            <Tag style={{marginBottom:'.5rem'}}>{item}</Tag>
                                                            {item === "官方网站" ? <a href={data.extra_data[item]}>{data.extra_data[item]}</a>: data.extra_data[item]}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </Col>
                    <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}} id={'game-card-divider'}/>
                    <Col span={mobile ? 24:15}>
                        <Tabs defaultActiveKey="1"  onChange={() => {
                            setTimeout(() => {
                                const relevantContainer = document.getElementById('relevant-container');
                                let resultContainer = document.getElementById('result-container');
                                relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                                const container = document.getElementById('detail-container');
                                container.style.height = document.body.scrollHeight.toString() + 'px';
                            }, 200)
                        }}>
                            <TabPane key={'1'} tab={"游戏简介"}>
                                <div style={{display:'flex',flexDirection:'column',padding:'1rem 1rem 0 1rem'}}>
                                    <Typography.Title level={5} color={'blue'}>内容简介:</Typography.Title>
                                    <Typography.Paragraph><InfoTimeline descriptionArray={data.description.split('<br>')}/></Typography.Paragraph>
                                    <Typography.Title level={5}>大家倾向于把{data.primary_name}标记为：</Typography.Title>
                                    <div style={{width:'60%', margin:'2rem auto 0 auto'}}>
                                        <Tags tags={data.tags} history={props.history}/>
                                        <WordCloud words={data.tags.map(item => ({text:item, value:Math.random()}))}/>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="游戏角色" key="2" style={{borderRadius:'10px'}}>
                                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignContent:'center', height:'100%', marginTop:'2rem'}}>
                                    {
                                        data.chara_list.map(item =>
                                            (
                                                <div>
                                                    <Meta
                                                        avatar={
                                                            <Avatar src={item.visuals} draggable/>
                                                        }
                                                        style={{minWidth:'15rem', marginRight:'2rem', marginBottom:'2rem'}}
                                                        title={<Link to={{pathname:'result', state:{searchString:item.primary_name}}}>{item.primary_name}</Link>}
                                                        description={<div>
                                                            中文名：{item.zh_name}<br/>声优：{item.cv}
                                                            <Divider style={{padding:'0', margin:'1rem'}}/>
                                                        </div>}
                                                    />
                                                </div>
                                            )
                                        )
                                    }
                                    {
                                        data.chara_list.length === 0 ? <Empty style={{marginTop:'4rem'}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无角色介绍'}/>:''
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

export default GameInfo;