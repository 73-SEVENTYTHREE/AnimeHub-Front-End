import React, {useEffect, useState} from 'react';
import {Row, Col, Tag, Tabs, Card, message, Popover, Empty} from 'antd';
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
import {useUpdate} from "ahooks";

const { TabPane } = Tabs;

function DetailInfo (props) {
    const {state}=props.location;
    const update = useUpdate();
    let guid;
    if(state && state.guid){//判断当前有参数
        guid = state.guid
        sessionStorage.setItem('guid', state.guid);
    }else {
        guid = sessionStorage.getItem('guid');
    }
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(false);//判断当前设备是否是移动端设备
    const [bilibiliData, setBiliBiliData] = useState({media_score:{score:'暂无', user_count:'暂无'}, org_title:''});
    const [info, setInfo] = useState({visuals:'', tags:[], related_subjects:[], extra_data:[], chara_list:[], comment_box:[], guid:1, jobs:[], description:'',
                            recently_participated:[],writer:[], press:[], names:[], typo:'', primary_name:'', pri_name:''});
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
            console.log(1)
            const relevantContainer = document.getElementById('relevant-container');
            let resultContainer = document.getElementById('result-container');
            relevantContainer.style.top = resultContainer.offsetHeight + 'px'
            const container = document.getElementById('detail-container');
            container.style.height = document.body.scrollHeight.toString() + 'px';
            window.addEventListener('resize', handleResize);
        }, 200)
        return () => window.removeEventListener('resize', handleResize);
    }, [guid])

    return (
        <div id={'detail-container'}>
            <ResultHeader history={props.history}/>
            <NameDivider title={info.primary_name} type={info.typo}/>
            <div style={{backgroundColor:'white', height:'.1rem', marginBottom:'-1px'}}/>
            <div id={'result-container'}>
                {info.typo === 'anime' ? <AnimeInfo data={info} bilibiliData={bilibiliData} mobile={mobile} loading={loading} history={props.history} name={info.primary_name}/> : ''}
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
                            <TabPane tab={<strong style={{fontSize:'1.3rem'}}>相关词条</strong>} key="1" style={{paddingBottom:'1rem'}}>
                                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
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
                                                        props.history.push({pathname:'detailInfo',state:{guid:item.guid}});
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