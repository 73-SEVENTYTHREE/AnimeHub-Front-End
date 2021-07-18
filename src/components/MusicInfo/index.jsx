import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography} from "antd";
import data from './testdata';
import {Link} from "react-router-dom";

const {TabPane} = Tabs

function MusicInfo(props) {
    const {mobile} = props
    return (
        <Card style={{margin:'1rem 2rem 2rem 2rem', minHeight:'60rem'}} hoverable>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{height:'60rem'}}>
                <Col span={mobile ? 24 : 6}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{margin:'0 auto'}}><Image width={'10rem'} src={data.visuals[0]}/></div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Divider orientation={'left'}>歌曲名称</Divider>
                            <div >
                                <Tag>原名:</Tag>{data.primary_name}<br/>
                                <Tag>中文名:</Tag>{data.zh_name}
                            </div>
                            <Divider orientation={'left'}>歌手</Divider>
                            <div>
                                {data.singer.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}><Link>{item}</Link></span>
                                    }else{
                                        return <span key={index}>、<Link>{item}</Link></span>
                                    }
                                })}
                            </div>
                            <Divider orientation={'left'}>编曲人</Divider>
                            <div>
                                {data.arranger.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}><Link>{item}</Link></span>
                                    }else{
                                        return <span key={index}>、<Link>{item}</Link></span>
                                    }
                                })}
                            </div>
                            <Divider orientation={'left'}>作曲人</Divider>
                            <div>
                                {data.composer.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}><Link>{item}</Link></span>
                                    }else{
                                        return <span key={index}>、<Link>{item}</Link></span>
                                    }
                                })}
                            </div>
                            <Divider orientation={'left'}>作词人</Divider>
                            <div>
                                {data.lyrics.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}><Link>{item}</Link></span>
                                    }else{
                                        return <span key={index}>、<Link>{item}</Link></span>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </Col>
                <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}}/>
                <Col span={mobile ? 24:17}>
                    <Tabs defaultActiveKey="1">
                        <TabPane key={'1'} tab={"歌曲简介"}>
                            <div style={{display:'flex',flexDirection:'column',padding:'1rem'}}>
                                <Typography.Title level={4} color={'blue'}>简介:</Typography.Title>
                                <Typography.Paragraph>{data.description}</Typography.Paragraph>
                                <Typography.Title level={5}>大家倾向于把这首歌标记为：</Typography.Title>
                                <div>
                                    {data.tags.map((item, index)=>{
                                        return <Tag key={index}>{item}</Tag>
                                    })}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Card>
    );
}

export default MusicInfo;