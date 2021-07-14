import React, {Component, useState} from 'react';
import {List, Tag, Typography, Menu, Space, Button, message, Skeleton} from 'antd';
import TypeTag from "../TypeTag";
import './index.css';
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Tags from '../Tags';
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import {Link} from "react-router-dom";
import {useMount, useUnmount} from "ahooks";
import PubSub from 'pubsub-js'

const {Paragraph} = Typography

const {SubMenu} = Menu

class InsideFilter extends Component{
    render() {
        return (
            <div>

            </div>
        )
    }
}

function SearchResultList  (props) {
    const [searchString, setSearchString] = useState(props.searchString);
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = null;
    console.log(searchString)
    //根据传入的字符串获取相关信息，和后端的交互主要在这个函数里。
    const getDataBySearchString = async str => {
        setLoading(true);
        let ListData = [];
        ListData.push({
            title: '工作细胞',
            tags:['搞笑','战斗','日常','声控'],
            overview:'这是一个关于你自身的故事。你体内的故事——。人的细胞数量，约为37兆2千亿个。细胞们在名为身体的世界中，今天也精神满满、无休无眠地在工作着。运送着氧气的红细胞，与细菌战斗的白细胞……！这里，有着细胞们不为人知的故事。',
            start_date:'2019年7月',
            episode_count:12,
            score_general:9.6
        })
        for(let i=0,length=ListData.length;i<length;i++){
            let item = ListData[i]
            console.log(item.title)
            const data  = await getBiliBiliDataByMediaName(item.title);
            const result = data.result;
            console.log(data)
            if(result === undefined){
                item.bilibili_score='暂无'
                item.bilibili_user_count='暂无'
            }else{
                item.bilibili_score = result[0].media_score.score
                item.bilibili_user_count = result[0].media_score.user_count
            }
        }
        setListData(ListData);
        setLoading(false);
    }
    useMount(async () => {
        //订阅上方导航栏输入的消息，获取对应字符串
        token = PubSub.subscribe('ChangeInput', async (msg, data) => {
            setSearchString(data);
            await getDataBySearchString (data);
        });
        await getDataBySearchString(searchString);
    })

    useUnmount(() => {
        if(token !== null) PubSub.unsubscribe(token);
    })

    return (
        <div>
            {/*<InsideFilter></InsideFilter>*/}
            {
                loading ? <Skeleton active />:
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <div style={{width:'10rem',height:'15rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Link to={{pathname:'/detailinfo',state:{name:item.title}}}>
                                            <img
                                                style={{height:'15rem'}}
                                                alt="logo"
                                                src="http://lain.bgm.tv/pic/cover/l/84/fc/235612_EHO4Q.jpg"
                                            />
                                        </Link>
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                        <Link to={{pathname:'/detailinfo',state:{name:item.title}}} style={{fontSize:'1.1rem',color:'black'}}>
                                            <mark>{item.title}</mark>
                                        </Link>&nbsp;&nbsp;
                                        <TypeTag/>
                                    </div>}
                                    description={item.tags.map(item=>{return <Tag>{item}</Tag>})}
                                />
                                <div className={'item-info-tag'}>
                                    <Tag color={'geekblue'}>评分:</Tag>
                                    <BiliBiliScoreTag
                                        score={item.bilibili_score}
                                        user_count={item.bilibili_user_count}
                                        style={{fontSize:'0.3rem',padding:'0.1rem',width:'2.7rem',height:'1.2rem'}}
                                        logoStyle={{width:'.8rem'}}
                                    />
                                </div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>总话数:</Tag>{item.episode_count}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>放送日期:</Tag>{item.start_date}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>简介:</Tag>{item.overview}</div>
                            </List.Item>
                        )}
                    />
            }
        </div>
    )
}

export default SearchResultList;