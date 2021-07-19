import {Button, Card, Col, Descriptions, Image, Row, Skeleton, Tabs, Avatar, Timeline, Divider} from "antd";
import Meta from "antd/es/card/Meta";
import Tags from "../Tags";
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import BangumiScoreTag from "../BangumiScoreTag";
import removeLastCharacter from "../../utils/removeLastCharacter";
import KnowledgeGraph from "../KnowledgeGraph";
import {ClockCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import InfoItem from "../InfoItem";
import {Link} from "react-router-dom";
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
            <div id={'result-container-bg'} style={{ background:`url("${data.visuals.substring(0, data.visuals.length - 1)}")`}}/>
            <div style={{padding: '0 1.2rem'}}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingTop:'1rem'}}>
                    <Col className="gutter-row" span={24} style={mobile ? {marginBottom:'2rem'} : {}}>
                        <Card hoverable title="剧情概览" extra={bilibiliData.goto_url ?
                                <Button style={{backgroundColor:'#EA7A99', border:'0', display:'flex', alignItems:'center'}}
                                        type={'primary'}
                                        onClick={() => window.location.href=bilibiliData.goto_url}><PlayCircleOutlined />
                                    B站播放</Button>:''} style={{marginBottom:'2rem', overflow:'scroll', border:'0'}} headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}>
                            {
                                loading ? <Skeleton active />:<div dangerouslySetInnerHTML={{__html:data.description}}/>
                            }
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 6} style={mobile ? {marginBottom:'2rem'} : {minHeight:'40rem'}}>
                        <div className="card-container">
                            <Card hoverable title="作品评分" extra={<Score/>} style={{ marginBottom:'1rem', height:'100%', maxHeight:'50rem', border:'0'}} headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}>
                                <div style={{minHeight:'40rem', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'space-around'}}>
                                    <div style={{margin:'1rem', display:'flex', justifyContent:'center'}}>
                                        <Image src={removeLastCharacter(data.visuals)}
                                               style={{borderRadius:'10px', width:'13rem'}}
                                               placeholder = {
                                                   <Skeleton.Image active={true} style={{width:'15rem', height:'20rem'}}/>
                                               }
                                        />
                                    </div>
                                    {/*<WordCloud words={data.tags.map(item => ({text:item, value:Math.floor(Math.random()*256)}))}/>*/}
                                    <Tags tags={data.tags} history={props.history}/>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 18} style={mobile ? {} : {minHeight:'40rem'}}>
                        <div className="card-container">
                            <Tabs type="card" size={'small'} onChange={(key) => {
                                setTimeout(() => {
                                    const relevantContainer = document.getElementById('relevant-container');
                                    let resultContainer = document.getElementById('result-container');
                                    relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                                    const container = document.getElementById('detail-container');
                                    container.style.height = document.body.scrollHeight.toString() + 'px';
                                }, 200)
                            }}>
                                <TabPane tab="作品详情" key="1" style={{borderRadius:'0 10px 10px 10px'}}>
                                    {
                                        loading ? <Skeleton active />:
                                            <div>
                                                <div style={{display:'flex', alignContent:'flex-start',justifyContent:'space-around', alignItems:'self-start', flexWrap:'wrap',marginTop:'1rem', overflow:'auto'}}>
                                                    <div style={{width:'70%',height:'100%', display:'flex', flexWrap:'wrap', justifyContent:'space-around', alignContent:'flex-start', alignItems:'self-start'}}>
                                                        {zh_name ? <InfoItem title={'中文名'} content={zh_name} history={props.history}/> :''}
                                                        {animation_company ? <InfoItem title={'动画制作公司'} content={animation_company} history={props.history}/> :''}
                                                        {director ? <InfoItem title={'导演'} content={director} history={props.history}/> :''}
                                                        {made ? <InfoItem title={'全局制作'} content={made} history={props.history}/> :''}
                                                        {producer ? <InfoItem title={'动画制作人'} content={producer} history={props.history}/> :''}
                                                        {episode_count ? <InfoItem title={'话数'} content={episode_count} history={props.history}/> :''}
                                                    </div>
                                                    <div style={{width:'30%',height:'100%', display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
                                                        {names[0] !== "" ? <InfoItem title={'别名'} content={names} history={props.history}/> :''}
                                                        <div style={{display:'flex', width:'40%', height:'100%', alignContent:'flex-start',justifyContent:'space-around', alignItems:'self-start', flexWrap:'wrap'}}>
                                                            {music_composer ? <InfoItem title={'音乐制作人'} content={music_composer} history={props.history}/> :''}

                                                        </div>
                                                    </div>
                                                </div>
                                                <Descriptions
                                                    style={{margin:'0rem 2rem 2rem 2rem', maxHeight:'40rem', overflow:'auto'}}
                                                    bordered
                                                    size={'small'}
                                                    column={{ xxl: 5, xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
                                                    // layout="vertical"
                                                >
                                                    {
                                                        keys.map(item => <Descriptions.Item label={item} style={{fontSize:'.8rem'}}>{item === '官方网站' ? <a href={data.extra_data[item]}>{data.extra_data[item]}</a>:data.extra_data[item]}</Descriptions.Item>)
                                                    }
                                                </Descriptions>
                                            </div>
                                    }

                                </TabPane>
                                <TabPane tab="虚拟角色" key="2" style={{borderRadius:'10px'}}>
                                    <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignContent:'center', height:'100%'}}>
                                        {
                                            chara_list.map(item =>
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
                                                                <Divider/>
                                                            </div>}
                                                        />
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab="动漫评论" key="3" style={{borderRadius:'10px'}}>
                                    <Timeline mode="left" style={{paddingTop:'2rem'}}>
                                        {
                                            comments.map(item => <Timeline.Item  style={{marginLeft:'-65%'}} label={item.comment_time} dot={<ClockCircleOutlined style={{ fontSize: '16px'}}/>} >
                                                <Meta
                                                    avatar={
                                                        <Avatar src={item.comment_visuals} draggable/>
                                                    }
                                                    title={item.commenter_name}
                                                    description={item.comment_texts}
                                                />
                                            </Timeline.Item>)
                                        }
                                    </Timeline>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={24} style={mobile ? {marginBottom:'2rem'} : {marginBottom:'2rem'}}>
                        <Card title={'知识图谱'} hoverable style={{border:'0', minHeight:'40rem'}} headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}>
                            <KnowledgeGraph guid={guid}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default AnimeInfo;