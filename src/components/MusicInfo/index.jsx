import React from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography} from "antd";
import {Link} from "react-router-dom";
import removeLastCharacter from "../../utils/removeLastCharacter";
import KnowledgeGraph from "../KnowledgeGraph";
import Tags from "../Tags";
import InfoTimeline from "../InfoTimeline";
import WordCloud from "../WordCloud";

const {TabPane} = Tabs

function MusicInfo(props) {
    const {mobile,data} = props
    const keys = Object.keys(data.extra_data)
    // console.log(keys)
    // console.log(data)
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
            <Card style={{margin:'2rem 2rem 2rem 2rem'}} hoverable>
                <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                    <Col span={mobile ? 24 : 6}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{margin:'0 auto'}}><Image width={'10rem'} src={removeLastCharacter(data.visuals)}/></div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Divider orientation={'left'}>歌曲名称</Divider>
                                <div>
                                    <Tag style={{marginBottom:'.5rem'}}>原名</Tag>{data.primary_name}<br/>
                                    <Tag>中文名</Tag>{data.zh_name}
                                </div>
                                <Divider orientation={'left'}>歌手</Divider>
                                <div>
                                    {data.singer===undefined?'暂无':
                                        data.singer===null?'暂无':data.singer.map((item,index) => {
                                        if(index===0){
                                            return <span key={index}><Link>{item}</Link></span>
                                        }else{
                                            return <span key={index}>、<Link>{item}</Link></span>
                                        }
                                    })}
                                </div>
                                <div>
                                    {data.arranger===undefined?'':
                                        data.arranger===null?'':
                                        <div>
                                            <Divider orientation={'left'}>编曲人</Divider>
                                            {
                                                data.arranger.map((item, index) => {
                                                    if (index === 0) {
                                                        return <span key={index}><Link>{item}</Link></span>
                                                    } else {
                                                        return <span key={index}>、<Link>{item}</Link></span>
                                                    }
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                                <div>
                                    {data.composer===undefined?'':
                                        data.composer===null?'':
                                        <div>
                                            <Divider orientation={'left'}>作曲人</Divider>
                                            {
                                                data.composer.map((item,index) => {
                                                    if(index===0){
                                                    return <span key={index}><Link>{item}</Link></span>
                                                }else{
                                                    return <span key={index}>、<Link>{item}</Link></span>
                                                }
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                                <div>
                                    {data.extra_data===undefined?'':
                                        data.extra_data===null?'':
                                            <div>
                                                <Divider orientation={'left'}>其他信息</Divider>
                                                {
                                                    keys.map((item, index)=>{
                                                        return(
                                                            <div style={{marginBottom:'.5rem'}}>
                                                                <Tag>{item}</Tag>
                                                                {data.extra_data[item]}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                    }
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
                                    <Typography.Paragraph><InfoTimeline descriptionArray={data.description.split('<br>')}/></Typography.Paragraph>
                                    <Typography.Title level={5}>大家倾向于把{data.primary_name}标记为：</Typography.Title>
                                    <div style={{width:'60%', margin:'2rem auto 0 auto'}}>
                                        <Tags tags={data.tags} history={props.history}/>
                                        <WordCloud words={data.tags.map(item => ({text:item, value:Math.random()}))}/>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Card>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={24} style={{padding:'0 3rem 2rem 3rem'}}>
                    <KnowledgeGraph guid={data.guid} name={data.primary_name}/>
                </Col>
            </Row>
        </div>
    );
}

export default MusicInfo;