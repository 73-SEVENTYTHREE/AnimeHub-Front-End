import {
    Button,
    Card,
    Col,
    Descriptions,
    Image,
    Row,
    Skeleton,
    Tabs,
    Avatar,
    Timeline,
    Divider,
    message,
    Empty, Tag
} from "antd";
import Meta from "antd/es/card/Meta";
import Tags from "../Tags";
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import BangumiScoreTag from "../BangumiScoreTag";
import removeLastCharacter from "../../utils/removeLastCharacter";
import KnowledgeGraph from "../KnowledgeGraph";
import {PlayCircleOutlined} from "@ant-design/icons";
import CommentTimeLine from "../CommentTimeLine";
import InfoItem from "../InfoItem";
import {Link} from "react-router-dom";
import axios from "axios";
import React from "react";
const { TabPane } = Tabs;
function AnimeInfo (props) {
    const data = props.data;
    const mobile = props.mobile;
    const loading = props.loading;
    const bilibiliData = props.bilibiliData;
    const guid = data.guid;
    const names = data.names;
    const zh_name = data.zh_name;
    const animation_company = data.animation_company;
    const made = data.made;
    const chara_list = data.chara_list;
    const director = data.director;
    const episode_count = data.episode_count;
    const music_composer = data.music_composer;
    const producer = data.producer;
    const comments = data.comment_box;
    const keys = Object.keys(data.extra_data);
    const generateRandomColor = () => {
        const r = Math.floor(Math.random()*200);
        const g = Math.floor(Math.random()*200);
        const b = Math.floor(Math.random()*200);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    }
    const Score = () => <div style={{width:'8rem', display:'flex', justifyContent:'space-between'}}>
        <BiliBiliScoreTag score={bilibiliData.media_score.score} user_count={bilibiliData.media_score.user_count}/>
        <BangumiScoreTag score={data.score_general} user_count={data.vote_count}/>
    </div>

    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
            <div style={{padding: '0 1.2rem'}}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingTop:'1rem'}}>
                    <Col className="gutter-row" span={24} style={mobile ? {marginBottom:'2rem'} : {}}>
                        <Card hoverable title="剧情概览" extra={bilibiliData.goto_url ?
                                <Button style={{backgroundColor:'#EA7A99', border:'0', display:'flex', alignItems:'center'}}
                                        type={'primary'}
                                        onClick={() => window.location.href=bilibiliData.goto_url}><PlayCircleOutlined />
                                    B站播放</Button>:''} style={{marginBottom:'2rem', border:'0'}} headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}>
                            {
                                loading ? <Skeleton active />:<div dangerouslySetInnerHTML={{__html:data.description}}/>
                            }
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 6} style={mobile ? {marginBottom:'2rem'} : {minHeight:'40rem'}}>
                        <div className="card-container">
                            <Card hoverable title="作品评分" extra={<Score/>} style={{ marginBottom:'1rem', border:'0'}} headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}>
                                <div style={{minHeight:'40rem', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'space-around'}}>
                                    <div style={{margin:'1rem', display:'flex', justifyContent:'center'}}>
                                        <Image src={removeLastCharacter(data.visuals)}
                                               style={{borderRadius:'10px', width:'13rem',minHeight:'20rem'}}
                                               placeholder = {
                                                   <Skeleton.Image active={true} style={{width:'13rem', height:'20rem'}}/>
                                               }
                                        />
                                    </div>
                                    <Tags tags={data.tags} history={props.history}/>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 18} style={mobile ? {} : {minHeight:'40rem'}}>
                        <div className="card-container">
                            <Tabs size={'small'} onChange={(key) => {
                                setTimeout(() => {
                                    const relevantContainer = document.getElementById('relevant-container');
                                    let resultContainer = document.getElementById('result-container');
                                    relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                                    const container = document.getElementById('detail-container');
                                    container.style.height = document.body.scrollHeight.toString() + 'px';
                                }, 200)
                            }} style={{backgroundColor:'white',height:'100%', padding:'1rem 1.5rem 0 1.5rem', borderRadius:'10px', marginBottom:'2rem', minHeight:'40rem', border:'1px #f3f3f3 solid'}}>
                                <TabPane tab="作品详情" key="1" style={{borderRadius:'0 10px 10px 10px'}}>
                                    {
                                        loading ? <Skeleton active />:
                                            <div>
                                                <div style={{display:'flex', alignContent:'flex-start',justifyContent:'space-around', alignItems:'self-start', flexWrap:'wrap',marginTop:'1rem', overflow:'auto'}}>
                                                    {zh_name ? <InfoItem title={'中文名'} content={zh_name} history={props.history}/> :''}
                                                    {animation_company ? <InfoItem title={'动画制作公司'} content={animation_company} history={props.history}/> :''}
                                                    {director ? <InfoItem title={'导演'} content={director} history={props.history}/> :''}
                                                    {made ? <InfoItem title={'全局制作'} content={made} history={props.history}/> :''}
                                                    {producer ? <InfoItem title={'动画制作人'} content={producer} history={props.history}/> :''}
                                                    {episode_count ? <InfoItem title={'话数'} content={episode_count} history={props.history}/> :''}
                                                    {names[0] !== "" ? <InfoItem title={'别名'} content={names} history={props.history}/> :''}
                                                    {music_composer ? <InfoItem title={'音乐制作人'} content={music_composer} history={props.history}/> :''}

                                                </div>
                                                <Divider orientation={'left'}>其他信息</Divider>
                                                <div style={{display:'flex', marginBottom:'2rem', justifyContent:`space-around`}}>
                                                    {
                                                        mobile ? <div>
                                                                {(keys.map(item => (
                                                                    <div style={{marginBottom:'.3rem'}}>
                                                                        <Tag>{item}</Tag>
                                                                        {
                                                                            item === '官方网站' ? <a href={data.extra_data[item]}>{data.extra_data[item]}</a>:data.extra_data[item]
                                                                        }
                                                                    </div>
                                                                )))}
                                                            </div>:
                                                            (<div style={{display:'flex', justifyContent:`space-around`}}>
                                                                <div style={{width:'45%'}}>
                                                                    {
                                                                        keys.slice(0, Math.floor(keys.length / 2)).map(item => (
                                                                            <div style={{marginBottom:'.3rem'}}>
                                                                                <Tag>{item}</Tag>
                                                                                {
                                                                                    item === '官方网站' ? <a href={data.extra_data[item]}>{data.extra_data[item]}</a>:data.extra_data[item]
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <Divider type={'vertical'} style={{height:'100%'}}/>
                                                                <div style={{width:'45%'}}>
                                                                    {
                                                                        keys.slice(Math.floor(keys.length / 2), keys.length).map(item => (
                                                                            <div style={{marginBottom:'.3rem'}}>
                                                                                <Tag>{item}</Tag>
                                                                                {
                                                                                    item === '官方网站' ? <a href={data.extra_data[item]}>{data.extra_data[item]}</a>:data.extra_data[item]
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>)
                                                    }
                                                </div>
                                            </div>
                                    }

                                </TabPane>
                                <TabPane tab="虚拟角色" key="2" style={{borderRadius:'10px'}}>
                                    <div style={{marginTop:'2rem', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                                        {
                                            chara_list.map(item =>
                                                (
                                                    <Card hoverable style={{marginBottom:'1rem', marginRight:'1rem'}}
                                                          onClick={async () => {
                                                              let data = (await axios.post ('/api/detailByGuid', {
                                                                  guid:item.guid
                                                              })).data;
                                                              if(data.code === 1) {
                                                                  message.warning('暂无此页面')
                                                                  return;
                                                              }
                                                              props.history.push({pathname:`/detailInfo/${item.guid}`});
                                                              document.body.scrollTop = document.documentElement.scrollTop = 0;
                                                          }}
                                                    >
                                                        <Meta
                                                            avatar={
                                                                <Avatar src={item.visuals} draggable/>
                                                            }
                                                            style={{minWidth:'15rem', marginRight:'2rem'}}
                                                            title={<Link>{item.primary_name}</Link>}
                                                            description={<div>
                                                                中文名：{item.zh_name}<br/>声优：{item.cv}
                                                            </div>}
                                                        />
                                                    </Card>
                                                )
                                            )
                                        }
                                        {
                                            chara_list.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无相关角色'}/>:''
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab="动漫评论" key="3" style={{borderRadius:'10px', paddingLeft:'1rem', minHeight:'40rem', overflowY:'scroll', overflowX:'hidden'}}>
                                    <CommentTimeLine comments={comments}/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    {
                        mobile ? '':<Col className="gutter-row" span={24} style={mobile ? {marginBottom:'2rem'} : {marginBottom:'2rem'}}>
                            <KnowledgeGraph guid={guid} name={props.name}/>
                        </Col>
                    }
                </Row>
            </div>
        </div>
    );
}

export default AnimeInfo;