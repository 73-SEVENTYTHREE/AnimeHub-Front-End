import React, {useEffect} from 'react';
import {Card, Col, Divider, Row, Image, Tag, Tabs, Typography, List, Avatar, Empty, message} from "antd";
import {Link} from "react-router-dom";
import KnowledgeGraph from "../KnowledgeGraph";
import Tags from "../Tags";
import InfoTimeline from "../InfoTimeline";
import removeLastCharacter from "../../utils/removeLastCharacter";
import Meta from "antd/es/card/Meta";
import axios from "axios";

const {TabPane} = Tabs

function BookInfo(props) {
    const {mobile, data} = props
    useEffect(() => {
        setTimeout(() => {
            const divider = document.getElementById('book-card-divider');
            if (!mobile) {
                divider.style.height = window.getComputedStyle(document.getElementById('book-card')).height;
            }
            else {
                divider.style.height = '0px'
                divider.style.width = window.getComputedStyle(document.getElementById('book-card')).width
            }
        }, 200)
    }, [mobile])
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
        <Card style={{margin:'2rem 2rem 2rem 2rem', minHeight:'30rem'}} hoverable id={'book-card'}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{display:'flex'}}>
                <Col span={mobile ? 24 : 6}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{margin:'0 auto'}}><Image width={'10rem'} src={removeLastCharacter(data.visuals)}/></div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Divider orientation={'left'}>名称</Divider>
                            <div>
                                <Tag style={{marginBottom:'.5rem'}}>原名</Tag>{data.primary_name}<br/>
                                <Tag>中文名</Tag>{data.zh_name}
                            </div>
                            <Divider orientation={'left'}>作者</Divider>
                            <div>
                                {data.writer === null ? '暂无':data.writer.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}>{item}</span>
                                    }else{
                                        return <span key={index}>、{item}</span>
                                    }
                                })}
                            </div>
                            <Divider orientation={'left'}>出版社</Divider>
                            <div>
                                {data.press.map((item,index) => {
                                    if(index===0){
                                        return <span key={index}>{item}</span>
                                    }else{
                                        return <span key={index}>、{item}</span>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </Col>
                <Divider type={mobile ? "horizontal": "vertical"} id={'book-card-divider'}/>
                <Col span={mobile ? 24:17}>
                    <Tabs defaultActiveKey="1" onChange={(key) => {
                        setTimeout(() => {
                            const relevantContainer = document.getElementById('relevant-container');
                            let resultContainer = document.getElementById('result-container');
                            relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                            const container = document.getElementById('detail-container');
                            container.style.height = document.body.scrollHeight.toString() + 'px';
                        }, 200)
                    }}>
                        <TabPane key={'1'} tab={"书籍简介"}>
                            <div style={{display:'flex',flexDirection:'column',padding:'1rem'}}>
                                <Typography.Title level={5} color={'blue'}>内容简介</Typography.Title>
                                <Typography.Paragraph><InfoTimeline descriptionArray={data.description.split('<br>')}/></Typography.Paragraph>
                                <Typography.Title level={5}>大家倾向于把{data.primary_name}标记为：</Typography.Title>
                                <div style={{width:`${mobile ? '100%':'60%'}`, margin:'2rem auto 2rem auto'}}>
                                    <Tags tags={data.tags} history={props.history}/>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane key="2" tab={"人物介绍"}>
                            <div style={{marginTop:'2rem', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                            {
                                data.chara_list.map(item =>
                                    (
                                        <Card hoverable style={{marginBottom:'1rem', marginRight:'1rem'}}
                                              onClick={async () => {
                                                  let data = (await axios.post ('/api/detailByGuid', {
                                                      guid:item.guid
                                                  })).data;
                                                  if(data.code === 1) {
                                                      message.warning('暂无此页面')
                                                      return;
                                                  }
                                                  props.history.push({pathname:`/detailInfo/${item.guid}`});
                                                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                                              }}
                                        >
                                            <Meta
                                                avatar={
                                                    <Avatar src={item.visuals} draggable/>
                                                }
                                                style={{minWidth:'15rem', marginRight:'2rem'}}
                                                title={<Link>{item.primary_name}</Link>}
                                                description={<div>
                                                    中文名：{item.zh_name}
                                                </div>}
                                            />
                                        </Card>
                                    )
                                )
                            }
                                {
                                    data.chara_list.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无人物介绍'}/>:''
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Card>
            {
                mobile ? '':<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24} style={{padding:'0 3rem 2rem 3rem'}}>
                        <KnowledgeGraph guid={data.guid} name={data.zh_name}/>
                    </Col>
                </Row>
            }
    </div>
    );
}

export default BookInfo;