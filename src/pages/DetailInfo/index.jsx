import React, {useState} from 'react';
import {Row, Col, Tag, Tabs, Card, message, Popover} from 'antd';
import ResultHeader from "../../components/ResultHeader";
import NameDivider from "../../components/NameDivider";
import {useMount, useUnmount} from "ahooks";
import './index.css';
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import getBiliBiliDataByRealPersonName from "../../utils/getBiliBiliDataByRealPersonName";
import AnimeInfo from "../../components/AnimeInfo";
import RealPersonInfo from "../../components/RealPersonInfo";
import Meta from "antd/es/card/Meta";
import MusicInfo from "../../components/MusicInfo";
import axios from "axios";
import BookInfo from "../../components/BookInfo";
import GameInfo from "../../components/GameInfo";

const { TabPane } = Tabs;

function DetailInfo (props) {
    const {state}=props.location;
    let name, type, guid;

    if(state && state.name && state.type && state.guid){//判断当前有参数
        name = state.name;
        type = state.type;
        guid = state.guid;
        sessionStorage.setItem('name', name);// 存入到sessionStorage中
        sessionStorage.setItem('type', type);
        sessionStorage.setItem('guid', guid);
    }else {
        name = sessionStorage.getItem ('name');// 当state没有参数时，取sessionStorage中的参数
        type = sessionStorage.getItem('type');
        guid = sessionStorage.getItem('guid')
    }
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(false);//判断当前设备是否是移动端设备
    const [bilibiliData, setBiliBiliData] = useState({media_score:{score:'暂无', user_count:'暂无'}, org_title:''});
    const [info, setInfo] = useState({visuals:'', tags:[], related_subjects:[]});

    const handleResize = e => {
        const relevantContainer = document.getElementById('relevant-container');
        relevantContainer.style.top = window.getComputedStyle(document.getElementById('result-container')).height;
        const container = document.getElementById('detail-container');
        container.style.height = document.body.scrollHeight.toString() + 'px';
        setMobile(e.target.innerWidth <= 1000);
    }


    useMount(async () => {
        let data = (await axios.post ('/api/detail', {
            type: type,
            guid: guid
        })).data;
        if(data.code === 1){
            message.warning('数据获取错误')
        }
        setInfo(data.data);

        setMobile(document.documentElement.clientWidth <= 1000);
        window.addEventListener('resize', handleResize);
        let searchResult;
        switch (type) {
            case 'anime': {
                searchResult = await getBiliBiliDataByMediaName(name);
                break;
            }
            case 'real_person' : searchResult = await getBiliBiliDataByRealPersonName(name); break;
            case 'music': searchResult = {};break;
            case 'book' : searchResult = {};break;
            case 'game' : searchResult = {};break;
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
        const relevantContainer = document.getElementById('relevant-container');
        relevantContainer.style.top = window.getComputedStyle(document.getElementById('result-container')).height
        const container = document.getElementById('detail-container');
        container.style.height = document.body.scrollHeight.toString() + 'px';
    })

    useUnmount(() => {
        window.removeEventListener('resize', handleResize);
    })

    return (
        <div id={'detail-container'}>
            <ResultHeader history={props.history}/>
            <NameDivider title={info.primary_name} type={type}/>
            <div style={{backgroundColor:'white', height:'.1rem', marginBottom:'-1px'}}/>
            <div id={'result-container'}>
                {type === 'anime' ? <AnimeInfo data={info} bilibiliData={bilibiliData} mobile={mobile} loading={loading}/> : ''}
                {type === 'real_person' ? <RealPersonInfo data={bilibiliData} mobile={mobile} loading={loading}/> : ''}
                {type === 'music' ? <MusicInfo data={bilibiliData} mobile={mobile} loading={loading}/> : ''}
                {type === 'book' ? <BookInfo data={bilibiliData} mobile={mobile} loading={loading}/> : ''}
                {type === 'game' ? <GameInfo data={bilibiliData} mobile={mobile} loading={loading}/> : ''}
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
                                                >
                                                    <Meta title={<div style={{display:'flex', justifyContent:'center'}}><Tag>{item.type}</Tag></div>}
                                                          description={<div style={{display:'flex', justifyContent:'center'}}><p className={'relevant-title'}>{item.primary_name}</p></div>} />
                                                </Card>
                                            </Popover>
                                        )
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