import React, {useState} from 'react';
import {Row, Col, Divider, Tag, Tabs, Card, Image, Popover, Descriptions} from 'antd';
import ResultHeader from "../../components/ResultHeader";
import TypeTag from "../../components/TypeTag";
import tagInfo from './tagInfo';
import workData from './workDetails'
import Tags from "../../components/Tags";
import BiliBiliScoreTag from "../../components/BiliBiliScoreTag";
import BangumiScoreTag from "../../components/BangumiScoreTag";
import {useMount, useUnmount} from "ahooks";
import './index.css';
import axios from "axios";
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";

const { TabPane } = Tabs;

function DetailInfo (props) {
    const {location}=props;
    let name;

    if(location.state&&location.state.name){//判断当前有参数
        name=location.state.name;
        sessionStorage.setItem('name',name);// 存入到sessionStorage中
    }else {
        name = sessionStorage.getItem ('name');// 当state没有参数时，取sessionStorage中的参数
    }
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(false);
    const [bilibiliData, setBiliBiliData] = useState({media_score:{score:'暂无', user_count:'暂无'}, org_title:''});

    const keys = Object.keys(workData);

    const Score = () => <div style={{width:'9rem', display:'flex', justifyContent:'space-between'}}>
            <BiliBiliScoreTag score={bilibiliData.media_score.score} user_count={bilibiliData.media_score.user_count}/>
            <BangumiScoreTag score={'暂无'} user_count={'暂无'}/>
        </div>


    const handleResize = e => setMobile(e.target.innerWidth <= 1000);

    useMount(async () => {
        setMobile(document.documentElement.clientWidth <= 1000);
        window.addEventListener('resize', handleResize);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        let searchResult = await getBiliBiliDataByMediaName(name);
        console.log(searchResult)
        if(searchResult.result !== undefined){
            setBiliBiliData(searchResult.result[0]);
        }
        const relevantContainer = document.getElementById('relevant-container');
        relevantContainer.style.top = window.getComputedStyle(document.getElementById('result-container')).height;
    })

    useUnmount(() => {
        window.removeEventListener('resize', handleResize);
    })

    return (
        <div>
            <ResultHeader history={props.history}/>
            <Divider orientation="left" style={{fontSize:'1.4rem', marginTop:'1.5rem'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                    {bilibiliData.org_title.replace(/<[^<>]+>/g,'')}
                    &nbsp;
                    <TypeTag/>
                </div>
            </Divider>
            <div style={{backgroundColor:'white', height:'.7rem', marginBottom:'-1px'}}/>
            <div id={'result-container'}>
                <div id={'result-container-bg'} style={{ background:`url("${bilibiliData.cover}")`}}/>
                <div style={{padding: '0 1.2rem'}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingTop:'1rem'}}>
                        <Col className="gutter-row" span={mobile ? 24 : 6} style={mobile ? {marginBottom:'2rem'} : {}}>
                            <div className="card-container">
                                <Card title="剧情概览" style={{marginBottom:'2rem', overflow:'scroll', maxHeight:'18rem'}} headStyle={{fontSize:'1.3rem'}}>
                                    {bilibiliData.desc}
                                </Card>
                                <Card title="作品评分" extra={<Score/>} style={{ marginBottom:'1rem', maxHeight:'35rem'}} headStyle={{fontSize:'1.3rem'}}>
                                    <div style={{margin:'1rem', display:'flex', justifyContent:'center'}}>
                                        <Image src={bilibiliData.cover}
                                               style={{borderRadius:'10px', width:'15rem'}}
                                               placeholder = {
                                                   <Image
                                                       width={'10rem'}
                                                       src="error"
                                                       fallback="data:image/png;base64,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"
                                                   />
                                               }
                                        />
                                    </div>
                                    <Tags tags={tagInfo}/>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={mobile ? 24 : 18}>
                            <div className="card-container">
                                <Tabs type="card">
                                    <TabPane tab="作品详情" key="1">

                                        <Descriptions
                                            bordered
                                            size={'small'}
                                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                        >
                                            {
                                                keys.map(item =>
                                                    <Descriptions.Item label={item}>{workData[item]}</Descriptions.Item>
                                                )
                                            }
                                        </Descriptions>

                                    </TabPane>
                                    <TabPane tab="作品时间轴" key="2">
                                        <p>Content of Tab Pane 1</p>
                                        <p>Content of Tab Pane 1</p>
                                        <p>Content of Tab Pane 1</p>
                                    </TabPane>
                                    <TabPane tab="章节概要" key="3">
                                        <p>Content of Tab Pane 1</p>
                                        <p>Content of Tab Pane 1</p>
                                        <p>Content of Tab Pane 1</p>
                                    </TabPane>
                                    <TabPane tab="角色声优" key="4">
                                        <p>Content of Tab Pane 2</p>
                                        <p>Content of Tab Pane 2</p>
                                        <p>Content of Tab Pane 2</p>
                                    </TabPane>
                                    <TabPane tab="制作人员" key="5">
                                        <p>Content of Tab Pane 3</p>
                                        <p>Content of Tab Pane 3</p>
                                        <p>Content of Tab Pane 3</p>
                                    </TabPane>
                                    <TabPane tab="评论" key="6">
                                        <p>Content of Tab Pane 3</p>
                                        <p>Content of Tab Pane 3</p>
                                        <p>Content of Tab Pane 3</p>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            {
                mobile ? <div id="relevant-container"/> :
                    <div id="relevant-container">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingTop:'1rem'}}>
                            <Col className="gutter-row" span={24}>
                                <div id="otherInfo">
                                    <Card title="相关推荐" bordered={false} headStyle={{fontSize:'1.3rem'}}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    );
}
export default DetailInfo;