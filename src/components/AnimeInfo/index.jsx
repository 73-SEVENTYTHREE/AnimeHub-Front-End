import {Card, Col, Descriptions, Image, Row, Skeleton, Tabs} from "antd";
import Tags from "../Tags";
import workData from "../../pages/DetailInfo/workDetails";
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import BangumiScoreTag from "../BangumiScoreTag";
import removeLastCharacter from "../../utils/removeLastCharacter";
const { TabPane } = Tabs;

function AnimeInfo (props) {
    const data = props.data;
    const mobile = props.mobile;
    const loading = props.loading;
    const bilibiliData = props.bilibiliData;
    const keys = Object.keys(workData);
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
                        <Card hoverable title="剧情概览" style={{marginBottom:'2rem', overflow:'scroll'}} headStyle={{fontSize:'1.3rem'}}>
                            {
                                loading ? <Skeleton active />:<div dangerouslySetInnerHTML={{__html:data.description}}/>
                            }
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 8} style={mobile ? {marginBottom:'2rem'} : {}}>
                        <div className="card-container">

                            <Card hoverable title="作品评分" extra={<Score/>} style={{ marginBottom:'1rem'}} headStyle={{fontSize:'1.3rem'}}>
                                <div style={{minHeight:'40rem', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'space-around'}}>
                                    <div style={{margin:'1rem', display:'flex', justifyContent:'center', minHeight:'20rem'}}>
                                        <Image src={removeLastCharacter(data.visuals)}
                                               style={{borderRadius:'10px', width:'15rem'}}
                                               placeholder = {
                                                   <Skeleton.Image active={true} style={{width:'15rem', height:'20rem'}}/>
                                               }
                                        />
                                    </div>
                                    <Tags tags={data.tags}/>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={mobile ? 24 : 16}>
                        <div className="card-container">
                            <Tabs type="card" size={'small'} style={{borderRadius:'0px'}}>
                                <TabPane tab="作品详情" key="1">
                                    {
                                        loading ? <Skeleton active />:
                                            <Descriptions
                                                bordered
                                                size={'small'}
                                                style={{maxHeight:'45rem', overflow:'auto'}}
                                                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                            >
                                                {
                                                    keys.map(item =>
                                                        <Descriptions.Item label={item}>{workData[item]}</Descriptions.Item>
                                                    )
                                                }
                                            </Descriptions>
                                    }


                                </TabPane>
                                <TabPane tab="虚拟角色" key="2">
                                    <p>虚拟角色</p>
                                </TabPane>
                                <TabPane tab="制作人员" key="3">
                                    <p>制作人员</p>
                                </TabPane>
                                <TabPane tab="动漫评论" key="4">
                                    <p>动漫评论</p>
                                </TabPane>
                                <TabPane tab="知识图谱" key="5">
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