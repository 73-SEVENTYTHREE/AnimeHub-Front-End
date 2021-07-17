import React from 'react';
import {Card, Col, Divider, Row, Tag, Timeline, List, Avatar} from "antd";
import './index..css'
import {useMount} from "ahooks";
import { Tabs } from 'antd';
import InfoTimeline from "../InfoTimeline";
import PersonWorks from "../PersonWorks";
import Comments from "../Comments";
import {TwitterOutlined, UserOutlined, WeiboOutlined} from "@ant-design/icons";
import KnowledgeGraph from "../KnowledgeGraph";

const { TabPane } = Tabs;

function RealPersonInfo (props) {
    const {data, mobile} = props;
    useMount(() => {
        const divider = document.getElementById('person-card-divider');
        divider.style.height = window.getComputedStyle(document.getElementById('person-card')).height;
    })
    return (
        <Card style={{margin:'1rem 2rem 2rem 2rem'}} hoverable id={'person-card'}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={mobile ? 24 : 6}>
                    <div id={'person-description'}>
                        <div className="relevant-image"
                             style={{backgroundImage:`url("http://lain.bgm.tv/pic/crt/l/ae/ff/4765_prsn_67Kc7.jpg?r=1490851915")`,
                                 borderRadius:'10px',
                                width:'80%',height:'2rem'}}/>
                        <div id={'personal-info'}>
                            简体中文名: 花泽香菜<br/>
                            <Divider className={'personal-info-divider'}/>
                            别名: 花澤香菜 、はなざわ かな 、Hanazawa Kana 、香菜、KANA、香菜ちゃん、香菜たん、もふもふ、花澤潤ちゃん、Hanakana、ハナザー、ざーさん<br/>
                            <Divider className={'personal-info-divider'}/>
                            性别: 女<br/>
                            <Divider className={'personal-info-divider'}/>
                            生日: 1989年2月25日<br/>
                            <Divider className={'personal-info-divider'}/>
                            血型: AB型<br/>
                            <Divider className={'personal-info-divider'}/>
                            身高: 156.7cm<br/>
                            <Divider className={'personal-info-divider'}/>
                            体重: 45kg<br/>
                            <Divider className={'personal-info-divider'}/>
                            引用来源: anidb.net<br/>
                            <Divider className={'personal-info-divider'}/>
                            性格: 有点怕生<br/>
                            <Divider className={'personal-info-divider'}/>
                            趣味: 泡澡<br/>
                            <Divider className={'personal-info-divider'}/>
                            特技: 物体模仿。其他还有魔术、管理。<br/>
                            <Divider className={'personal-info-divider'}/>
                            喜欢的男生: 西装革履，戴眼镜，装束得体，黑头发<br/>
                            <Divider className={'personal-info-divider'}/>
                            喜欢的女生: 像川澄绫子、户松遥、竹达彩奈、小仓唯、石原夏织<br/>
                            <Divider className={'personal-info-divider'}/>
                            学历: 文学部日本文学专业大学生<br/>
                            <Divider className={'personal-info-divider'}/>
                            星座: 双鱼<br/>
                            <Divider className={'personal-info-divider'}/>
                            出道时间: 2006<br/>
                            <Divider className={'personal-info-divider'}/>
                            <UserOutlined />&nbsp;<a href={'https://www.hanazawakana-music.net'}>https://www.hanazawakana-music.net</a><br/>
                            <Divider className={'personal-info-divider'}/>
                            <TwitterOutlined />&nbsp;<a href={'https://twitter.com/hanazawa_staff'}>https://twitter.com/hanazawa_staff</a><br/>
                            <Divider className={'personal-info-divider'}/>
                            <WeiboOutlined />&nbsp;<a href={'https://www.weibo.com/u/7036200791'}>https://www.weibo.com/u/7036200791</a><br/>
                            <Divider className={'personal-info-divider'}/>
                        </div>
                    </div>
                </Col>
                <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}} id={'person-card-divider'}/>
                <Col className="gutter-row" span={mobile ? 24:17}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="详细信息" key="1" style={{paddingLeft:'1rem', maxHeight:'60rem', overflow:'auto'}}>
                            <Tag color="cyan" style={{marginBottom:'1rem', height:'2rem', width:'11rem', fontSize:'1.2rem', display:'flex', alignItems:'center', justifyContent:'center'}}>职业: 声优 音乐人</Tag>
                            <InfoTimeline/>
                        </TabPane>
                        <TabPane tab="出演作品" key="2">
                            <PersonWorks/>
                        </TabPane>
                        <TabPane tab="吐槽评论" key="3">
                            <Comments/>
                        </TabPane>
                        <TabPane tab="知识图谱" key="4">
                            <KnowledgeGraph/>
                        </TabPane>
                    </Tabs>

                </Col>
            </Row>
        </Card>
    );
}

export default RealPersonInfo;