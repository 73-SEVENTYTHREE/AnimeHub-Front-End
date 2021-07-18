import {Button, Card, Col, Descriptions, Image, Row, Skeleton, Tabs} from "antd";
import Tags from "../Tags";
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import BangumiScoreTag from "../BangumiScoreTag";
import removeLastCharacter from "../../utils/removeLastCharacter";
import {PlayCircleOutlined} from "@ant-design/icons";
import WordCloud from "../WordCloud";
const { TabPane } = Tabs;
function AnimeInfo (props) {
    const data = props.data;
    const mobile = props.mobile;
    const loading = props.loading;
    const bilibiliData = props.bilibiliData;
    const names = data.names;
    const zh_name = data.zh_name;
    const animation_company = data.animation_company;
    const made = data.made;
    const chara_list = data.chara_list;
    const director = data.director;
    const episode_count = data.episode_count;
    const music_composer = data.music_composer;
    const producer = data.producer;
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
                                <Button style={{backgroundColor:'#EA7A99', border:'0'}}
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
                            <Card hoverable title="作品评分" extra={<Score/>} style={{ marginBottom:'1rem', height:'100%', maxHeight:'60rem', border:'0'}} headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}>
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
                                    <Tags tags={data.tags}/>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 18} style={mobile ? {} : {minHeight:'40rem'}}>
                        <div className="card-container">
                            <Tabs type="card" tabBarStyle={{borderRadius:'0px'}}>
                                <TabPane tab="作品详情" key="1" style={{borderRadius:'0 10px 10px 10px'}}>
                                    {
                                        loading ? <Skeleton active />:
                                            <Descriptions
                                                bordered
                                                size={'small'}
                                                style={{maxHeight:'45rem', overflow:'auto'}}
                                                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                            >
                                                <Descriptions.Item label={'中文名'}>{zh_name}</Descriptions.Item>
                                                <Descriptions.Item label={'别名'}>{names}</Descriptions.Item>
                                                <Descriptions.Item label={'动画制作公司'}>{animation_company}</Descriptions.Item>
                                                <Descriptions.Item label={'音乐制作人'}>{music_composer}</Descriptions.Item>
                                                <Descriptions.Item label={'全局制作'}>{made}</Descriptions.Item>
                                                {/*<Descriptions.Item label={'声优表'}>{chara_list}</Descriptions.Item>*/}
                                                <Descriptions.Item label={'导演'}>{director}</Descriptions.Item>
                                                <Descriptions.Item label={'别名'}>{names}</Descriptions.Item>
                                                <Descriptions.Item label={'动画制作人'}>{producer}</Descriptions.Item>
                                                <Descriptions.Item label={'话数'}>{episode_count}</Descriptions.Item>
                                            </Descriptions>
                                    }


                                </TabPane>
                                <TabPane tab="虚拟角色" key="2" style={{borderRadius:'10px'}}>
                                    <p>虚拟角色</p>
                                </TabPane>
                                <TabPane tab="制作人员" key="3" style={{borderRadius:'10px'}}>
                                    <p>制作人员</p>
                                </TabPane>
                                <TabPane tab="动漫评论" key="4" style={{borderRadius:'10px'}}>
                                    <p>动漫评论</p>
                                </TabPane>
                                <TabPane tab="知识图谱" key="5" style={{borderRadius:'10px'}}>
                                    <p>知识图谱</p>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default AnimeInfo;