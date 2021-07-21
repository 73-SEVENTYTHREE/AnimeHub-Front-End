import React, {useEffect} from 'react';
import removeLastCharacter from "../../utils/removeLastCharacter";
import {Avatar, Card, Col, Divider, message, Row, Tabs} from "antd";
import InfoTimeline from "../InfoTimeline";
import Meta from "antd/es/card/Meta";
import {Link} from "react-router-dom";
import CommentTimeLine from "../CommentTimeLine";
import KnowledgeGraph from "../KnowledgeGraph";
import {useMount} from "ahooks";
import {UserOutlined} from "@ant-design/icons";
import axios from "axios";

const { TabPane } = Tabs;

function CharacterInfo (props) {
    const { mobile, data} = props;
    const { comment_box, description, extra_data, gender, names, primary_name, recently_participated, visuals, zh_name, guid} = data;
    const descriptionArray = description.split('<br>');
    console.log(descriptionArray)
    const info = {names, gender, extra_data};
    const words = {names:'别名：', gender:'性别：'}
    useEffect(() => {
        setTimeout(() => {
            const divider = document.getElementById('person-card-divider');
            if(!mobile) divider.style.height = window.getComputedStyle(document.getElementById('person-card')).height;
            else {
                divider.style.height = '0px'
                divider.style.width = window.getComputedStyle(document.getElementById('person-card')).width;
            }
        }, 200)
    }, [mobile])
    const generateRandomColor = () => {
        const r = Math.floor(Math.random()*200);
        const g = Math.floor(Math.random()*200);
        const b = Math.floor(Math.random()*200);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    }
    console.log(data)
    return (
        <div>
            <div id={'result-container-bg'} style={{ background:`url("${removeLastCharacter(data.visuals)}")`}}/>
            <Card style={{margin:'2rem'}} hoverable id={'person-card'}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={mobile ? 24 : 6}>
                        <div id={'person-description'}>
                            <div className="relevant-image"
                                 style={{backgroundImage:`url(${visuals === "" ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                         :removeLastCharacter(data.visuals)})`,
                                     borderRadius:'10px',
                                     width:'80%',height:'2rem'}}/>
                            <div id={'personal-info'}>
                                {
                                    Object.keys(words).map(item => (
                                        <div>
                                            {words[item]+info[item]}
                                            <Divider className={'personal-info-divider'}/>
                                        </div>
                                    ))
                                }
                                {
                                    Object.keys(extra_data).map(item => (
                                        <div>
                                            {item+'：'+extra_data[item]}
                                            <Divider className={'personal-info-divider'}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}} id={'person-card-divider'}/>
                    <Col className="gutter-row" span={mobile ? 24:17} style={{height:'100%'}}>
                        <Tabs defaultActiveKey="1" onChange={(key) => {
                            setTimeout(() => {
                                const relevantContainer = document.getElementById('relevant-container');
                                let resultContainer = document.getElementById('result-container');
                                relevantContainer.style.top = resultContainer.offsetHeight + 'px'
                                const container = document.getElementById('detail-container');
                                container.style.height = document.body.scrollHeight.toString() + 'px';
                            }, 200)
                        }}>
                            <TabPane tab="详细信息" key="1" style={{padding:'2rem 0 0 1rem', maxHeight:'60rem', overflow:'auto'}}>
                                <InfoTimeline descriptionArray={descriptionArray}/>
                            </TabPane>
                            <TabPane tab="最近作品" key="2" style={{height:'100%'}}>
                                <div style={{marginTop:'2rem', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                                    {
                                        recently_participated.map(item =>
                                            (
                                                <div style={{width:'80%'}}>
                                                    <Meta
                                                        avatar={
                                                            <Avatar icon={item.visuals === "https:" ? <UserOutlined />:''} src={item.visuals} draggable/>
                                                        }
                                                        style={{minWidth:'15rem', marginRight:'2rem'}}
                                                        title={<Link
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
                                                        >{item.pri_name}</Link>}
                                                        description={<div>
                                                            {item.badge_job}
                                                            <Divider style={{padding:'0', margin:'1rem'}}/>
                                                        </div>}
                                                    />
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="吐槽评论" key="3" style={{paddingLeft:'1rem', maxHeight:'60rem', overflow:'auto'}}>
                                <CommentTimeLine comments={comment_box}/>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Card>
            {
                mobile ? '':<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24} style={{padding:'0 3rem 2rem 3rem'}}>
                        <KnowledgeGraph guid={guid} name={zh_name}/>
                    </Col>
                </Row>
            }
        </div>
    );
}

export default CharacterInfo;