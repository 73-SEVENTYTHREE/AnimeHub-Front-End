import React, {useState} from 'react';
import {Row, Col, Tag, Tabs, Card, message} from 'antd';
import ResultHeader from "../../components/ResultHeader";
import NameDivider from "../../components/NameDivider";
import {useMount, useUnmount} from "ahooks";
import './index.css';
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import getBiliBiliDataByRealPersonName from "../../utils/getBiliBiliDataByRealPersonName";
import AnimeInfo from "../../components/AnimeInfo";
import RealPersonInfo from "../../components/RealPersonInfo";
import MusicInfo from "../../components/MusicInfo";
import Meta from "antd/es/card/Meta";

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

    const handleResize = e => {
        setMobile(e.target.innerWidth <= 1000);
    }


    useMount(async () => {
        setMobile(document.documentElement.clientWidth <= 1000);
        window.addEventListener('resize', handleResize);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        let searchResult;
        switch (type) {
            case 'anime': {
                searchResult = await getBiliBiliDataByMediaName(name);
                break;
            }
            case 'real_person' : searchResult = await getBiliBiliDataByRealPersonName(name); break;
            case 'music': searchResult = {};break;
            default: {
                message.warning('错误的类型');
                searchResult = {}
                break;
            }
        }
        console.log(searchResult);
        if(searchResult.result !== undefined){
            setBiliBiliData(searchResult.result[0]);
        }
        const relevantContainer = document.getElementById('relevant-container');
        relevantContainer.style.top = window.getComputedStyle(document.getElementById('result-container')).height
        console.log(relevantContainer.style)
    })

    useUnmount(() => {
        window.removeEventListener('resize', handleResize);
    })

    return (
        <div>
            <ResultHeader history={props.history}/>
            <NameDivider title={name} type={type}/>
            <div style={{backgroundColor:'white', height:'.1rem', marginBottom:'-1px'}}/>
            <div id={'result-container'}>
                {type === 'anime' ? <AnimeInfo data={bilibiliData} mobile={mobile} loading={loading}/> : ''}
                {type === 'real_person' ? <RealPersonInfo data={bilibiliData}/> : ''}
                {type === 'music' ? <MusicInfo data={bilibiliData}/> : ''}
            </div>
            <div id={'relevant-container'}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<strong style={{fontSize:'1.3rem'}}>相关词条</strong>} key="1" style={{paddingBottom:'1rem'}}>
                                <div style={{display:'flex', flexWrap:'wrap'}}>
                                    {
                                        [1,2,3,3,4,1,1,1,1,1,1,1].map(item =>
                                            <Card
                                                hoverable
                                                className={'relevant-card'}
                                                cover={<div className="relevant-image"
                                                            style={{backgroundImage:`url("${bilibiliData.cover}")`}}/>}
                                            >
                                                <Meta title={<div style={{display:'flex', justifyContent:'center'}}><Tag>番外篇</Tag></div>}
                                                      description={<div style={{display:'flex', justifyContent:'center', overflow:'auto'}}>www.instagram.com</div>} />
                                            </Card>
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