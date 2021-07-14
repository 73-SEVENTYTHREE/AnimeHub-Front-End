import React, {useState} from 'react';
import {Row, Col, Divider, Tag, Tabs, Card, Image, Descriptions, Skeleton} from 'antd';
import ResultHeader from "../../components/ResultHeader";
import tagInfo from './tagInfo';
import workData from './workDetails'
import Tags from "../../components/Tags";
import BiliBiliScoreTag from "../../components/BiliBiliScoreTag";
import BangumiScoreTag from "../../components/BangumiScoreTag";
import NameDivider from "../../components/NameDivider";
import {useMount, useUnmount} from "ahooks";
import './index.css';
import axios from "axios";
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";

const { TabPane } = Tabs;

function DetailInfo (props) {
    const {state}=props.location;
    let name, type;

    if(state && state.name && state.type){//判断当前有参数
        name = state.name;
        type = state.type;
        sessionStorage.setItem('name', name);// 存入到sessionStorage中
        sessionStorage.setItem('type', type);
    }else {
        name = sessionStorage.getItem ('name');// 当state没有参数时，取sessionStorage中的参数
        type = sessionStorage.getItem('type')
    }
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(false);//判断当前设备是否是移动端设备
    const [bilibiliData, setBiliBiliData] = useState({media_score:{score:'暂无', user_count:'暂无'}, org_title:''});

    const keys = Object.keys(workData);

    const Score = () => <div style={{width:'8rem', display:'flex', justifyContent:'space-between'}}>
            <BiliBiliScoreTag score={bilibiliData.media_score.score} user_count={bilibiliData.media_score.user_count}/>
            <BangumiScoreTag score={'暂无'} user_count={'暂无'}/>
        </div>


    const handleResize = e => {
        setMobile(e.target.innerWidth <= 1000);
    }

    useMount(async () => {
        setMobile(document.documentElement.clientWidth <= 1000);
        window.addEventListener('resize', handleResize);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        let searchResult = await getBiliBiliDataByMediaName(name);
        if(searchResult.result !== undefined){
            setBiliBiliData(searchResult.result[0]);
        }
        const relevantContainer = document.getElementById('relevant-container');
        relevantContainer.style.top = window.getComputedStyle(document.getElementById('result-container-bg')).height
        console.log(relevantContainer.style)
    })

    useUnmount(() => {
        window.removeEventListener('resize', handleResize);
    })

    return (
        <div>
            <ResultHeader history={props.history}/>
            <NameDivider title={bilibiliData.org_title} type={type}/>
            <div style={{backgroundColor:'white', height:'.1rem', marginBottom:'-1px'}}/>
            <div id={'result-container'}>
                <div id={'result-container-bg'} style={{ background:`url("${bilibiliData.cover}")`}}/>
                <div style={{padding: '0 1.2rem'}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{paddingTop:'1rem'}}>
                        <Col className="gutter-row" span={mobile ? 24 : 6} style={mobile ? {marginBottom:'2rem'} : {}}>
                            <div className="card-container">
                                <Card title="剧情概览" style={{marginBottom:'2rem', overflow:'scroll', maxHeight:'18rem'}} headStyle={{fontSize:'1.3rem'}}>
                                    {
                                        loading ? <Skeleton active />:bilibiliData.desc
                                    }
                                </Card>
                                <Card title="作品评分" extra={<Score/>} style={{ marginBottom:'1rem', maxHeight:'40rem'}} headStyle={{fontSize:'1.3rem'}}>
                                    <div style={{margin:'1rem', display:'flex', justifyContent:'center', minHeight:'20rem'}}>
                                        <Image src={bilibiliData.cover}
                                               style={{borderRadius:'10px', width:'15rem'}}
                                               placeholder = {
                                                   <Skeleton.Image active={true} style={{width:'15rem', height:'20rem'}}/>
                                               }
                                        />
                                    </div>
                                    <Tags tags={tagInfo}/>
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={mobile ? 24 : 18}>
                            <div className="card-container">
                                <Tabs type="card" size={'large'}>
                                    <TabPane tab="作品详情" key="1">
                                        {
                                            loading ? <Skeleton active />:
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
                                        }


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
            <div id={'relevant-container'}>
                2222
            </div>
        </div>
    );
}
export default DetailInfo;