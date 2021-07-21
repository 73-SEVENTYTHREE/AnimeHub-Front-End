import React, {useEffect, useState} from 'react';
import {Row, Col, Tag, Tabs, Card, message, Popover, Empty, Avatar, Divider, Button} from 'antd';
import ResultHeader from "../../components/ResultHeader";
import NameDivider from "../../components/NameDivider";
import './index.css';
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import getBiliBiliDataByRealPersonName from "../../utils/getBiliBiliDataByRealPersonName";
import AnimeInfo from "../../components/AnimeInfo";
import RealPersonInfo from "../../components/RealPersonInfo";
import CharacterInfo from "../../components/CharacterInfo";
import CompanyInfo from "../../components/CompanyInfo";
import Meta from "antd/es/card/Meta";
import MusicInfo from "../../components/MusicInfo";
import axios from "axios";
import BookInfo from "../../components/BookInfo";
import GameInfo from "../../components/GameInfo";
import {Link} from "react-router-dom";
import TypeTag from "../../components/TypeTag";
import removeLastCharacter from "../../utils/removeLastCharacter";

const { TabPane } = Tabs;

function DetailInfo (props) {
    const {params}=props.match;
    console.log(params)
    let guid;
    if(params && params.guid){//判断当前有参数
        guid = params.guid
        sessionStorage.setItem('guid', params.guid);
    }else {
        guid = sessionStorage.getItem('guid');
    }
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(false);//判断当前设备是否是移动端设备
    const [bilibiliData, setBiliBiliData] = useState({media_score:{score:'暂无', user_count:'暂无'}, org_title:''});
    const [info, setInfo] = useState({visuals:'', tags:[], related_subjects:[], extra_data:[], chara_list:[], comment_box:[], guid:1, jobs:[], description:'',
                            recently_participated:[],writer:[], press:[], names:[], typo:'', primary_name:'', pri_name:''});
    const [recommendItems, setRecommendItems] = useState([])
    const [visuals, setVisuals] = useState([]);
    const generateRandomColor = () => {
        const r = Math.floor(Math.random()*200);
        const g = Math.floor(Math.random()*200);
        const b = Math.floor(Math.random()*200);
        return `rgba(${r}, ${g}, ${b}, 0.1)`;
    }
    const handleResize = e => {
        const relevantContainer = document.getElementById('relevant-container');
        if (relevantContainer !== null){
            relevantContainer.style.top = document.getElementById('result-container').offsetHeight + 'px'
            const container = document.getElementById('detail-container');
            container.style.height = document.body.scrollHeight.toString() + 'px';
            setMobile(e.target.innerWidth <= 1000);
        }
    }
    useEffect(async () => {
        let data = (await axios.post ('/api/detailByGuid', {
            guid
        })).data;
        if (data.data && data.data.related_subjects === null) data.data.related_subjects = [];
        setInfo(data.data);
        setMobile(document.documentElement.clientWidth <= 1000);
        let searchResult;
        switch (data.data.typo) {
            case 'anime': {
                searchResult = await getBiliBiliDataByMediaName(data.data.zh_name);
                break;
            }
            case 'real_person' : searchResult = await getBiliBiliDataByRealPersonName(data.data.zh_name); break;
            case 'music': searchResult = {};break;
            case 'book' : searchResult = {};break;
            case 'game' : searchResult = {};break;
            case 'character' : searchResult = {};break;
            case 'company' : searchResult = {};break;
            default: {
                message.warning('错误的类型');
                searchResult = {}
                break;
            }
        }
        setLoading(false);
        console.log(searchResult, data);
        if(searchResult.result !== undefined){
            setBiliBiliData(searchResult.result[0]);
        }
        setTimeout(() => {
            const relevantContainer = document.getElementById('relevant-container');
            if(relevantContainer){
                let resultContainer = document.getElementById('result-container');
                relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                const container = document.getElementById('detail-container');
                container.style.height = document.body.scrollHeight.toString() + 'px';
                window.addEventListener('resize', handleResize);
            }
        }, 200)
        let recommend_items = (await axios.post ('/api/recommend', {guid:Number(guid), count:20})).data
        setRecommendItems(recommend_items);
        let recommend_query = recommend_items.map(item => ({guid:Number(item.targetGuid), type:item.targetType}));
        let arr = recommend_query.filter(item => item.guid > 0);
        let visuals = (await axios.post('/api/visuals', arr)).data;
        if(visuals.code === 1){
            message.warning('获取推荐词条图片出错')
        }
        else{
            setVisuals(visuals.data);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [guid])

    return (
        <div id={'detail-container'}>
            <ResultHeader history={props.history}/>
            <NameDivider title={info.primary_name} type={info.typo}/>
            <div style={{backgroundColor:'white', height:'.1rem', marginBottom:'-1px'}}/>
            <div id={'result-container'}>
                {info.typo === 'anime' ? <AnimeInfo data={info} bilibiliData={bilibiliData} mobile={mobile} loading={loading} history={props.history} name={info.zh_name}/> : ''}
                {info.typo === 'real_person' ? <RealPersonInfo data={info} mobile={mobile} loading={loading} history={props.history}/> : ''}
                {info.typo === 'music' ? <MusicInfo data={info} bilibiliData={bilibiliData} mobile={mobile} loading={loading} history={props.history}/> : ''}
                {info.typo === 'book' ? <BookInfo data={info} mobile={mobile} loading={loading} history={props.history}/> : ''}
                {info.typo === 'game' ? <GameInfo data={info} mobile={mobile} loading={loading} history={props.history}/> : ''}
                {info.typo === 'character' ? <CharacterInfo data={info} mobile={mobile} loading={loading} history={props.history}/> : ''}
                {info.typo === 'company' ? <CompanyInfo data={info} mobile={mobile} loading={loading} history={props.history}/> : ''}
            </div>
            <div id={'relevant-container'}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<strong style={{fontSize:'1.3rem'}}>词条推荐</strong>} key="1" style={{paddingBottom:'1rem', height:'auto'}}>
                                {
                                    recommendItems.length === 0 ? '':
                                        <Button style={{float:'right'}} onClick={async () => {
                                            let recommend_items = (await axios.post ('/api/recommend', {guid:Number(guid), count:20})).data
                                            setRecommendItems(recommend_items);
                                            let recommend_query = recommend_items.map(item => ({guid:Number(item.targetGuid), type:item.targetType}));
                                            let arr = recommend_query.filter(item => item.guid > 0);
                                            let visuals = (await axios.post('/api/visuals', arr)).data;
                                            if(visuals.code === 1){
                                                message.warning('获取推荐词条图片出错')
                                            }
                                            else{
                                                setVisuals(visuals.data);
                                            }
                                        }}>换一批</Button>
                                }
                                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around', marginTop:'3rem'}}>
                                    {
                                        recommendItems.map(item => (
                                            <Popover content={item.description}>
                                                <Card hoverable style={{padding:'0', backgroundColor:generateRandomColor(), marginBottom:'1rem'}}
                                                      onClick={async () => {
                                                          if(item.targetGuid < 0){
                                                              message.warning('暂无此页面');
                                                              return;
                                                          }
                                                          let data = (await axios.post ('/api/detailByGuid', {
                                                              guid:item.targetGuid
                                                          })).data;
                                                          if(data.code === 1) {
                                                              message.warning('暂无此页面')
                                                              return;
                                                          }
                                                          props.history.push({pathname:`/detailInfo/${item.targetGuid}`});
                                                          window.location.reload();
                                                      }}
                                                >
                                                    <Meta
                                                        avatar={
                                                            <Avatar src={
                                                                visuals.filter(i => i.guid===item.targetGuid).length === 0 ? '':
                                                                    removeLastCharacter(visuals.filter(i => i.guid===Number(item.targetGuid))[0].image_url)
                                                            } draggable
                                                                    size={{ xs: 24, sm: 32, md: 40, lg: 56, xl: 64, xxl: 80 }}
                                                            />
                                                        }
                                                        style={{minWidth:'15rem', marginRight:'2rem', marginBottom:'2rem'}}
                                                        title={<div style={{display:'flex'}}><Link>{item.target}{item.targetType==='entity' ? '':<TypeTag type={item.targetType}/>}</Link></div>}
                                                        description={<div>
                                                            {item.rela}
                                                        </div>}
                                                    />
                                                </Card>
                                            </Popover>
                                        ))
                                    }
                                    {
                                        recommendItems.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无推荐词条'}/>:''
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab={<strong style={{fontSize:'1.3rem'}}>相关词条</strong>} key="2" style={{paddingBottom:'1rem', height:'auto'}}>
                                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', marginTop:'3rem'}}>
                                    {
                                        info.related_subjects.map(item =>
                                            <Popover content={item.primary_name}>
                                                <Card
                                                    hoverable
                                                    className={'relevant-card'}
                                                    cover={<div className="relevant-image"
                                                                style={{backgroundImage:`url("${item.visuals}")`}}/>}
                                                    onClick={async () => {
                                                        let data = (await axios.post ('/api/detailByGuid', {
                                                            guid:item.guid
                                                        })).data;
                                                        if(data.code === 1) {
                                                            message.warning('暂无此页面')
                                                            return;
                                                        }
                                                        props.history.replace({pathname:`/detailInfo/${item.guid}`});
                                                        window.location.reload();
                                                    }}
                                                >
                                                    <Meta title={<div style={{display:'flex', justifyContent:'center'}}><Tag>{item.type}</Tag></div>}
                                                          description={<div style={{display:'flex', justifyContent:'center'}}><p className={'relevant-title'}>{item.primary_name}</p></div>} />
                                                </Card>
                                            </Popover>
                                        )
                                    }
                                    {
                                        info.related_subjects.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无相关词条'}/>:''
                                    }
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default DetailInfo;