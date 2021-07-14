import React, {useState} from 'react';
import {List, Skeleton, Tag} from "antd";
import {Link} from "react-router-dom";
import TypeTag from "../TypeTag";
import BiliBiliScoreTag from "../BiliBiliScoreTag";

function AnimeShowList(props) {
    const {listData, searchString} = props
    return (
        <div>
            {/*<InsideFilter></InsideFilter>*/}
            {
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
                                        <Link to={{pathname:'/detailinfo',state:{name:item.id,type:'anime'}}}>
                                            <img
                                                style={{height:'15rem'}}
                                                alt="logo"
                                                src={item.image_url}
                                            />
                                        </Link>
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                        <Link to={{pathname:'/detailinfo',state:{name:item.id,type:'anime'}}}
                                              style={{fontSize:'1.1rem',color:'black'}}
                                              dangerouslySetInnerHTML={item.title}
                                        >

                                        </Link>&nbsp;&nbsp;
                                        <TypeTag type={item.type}/>
                                    </div>}
                                    description={item.tags.map(item=>{return <Tag><div dangerouslySetInnerHTML={item}/></Tag>})}
                                />
                                <div className={'item-info-tag'}>
                                    <Tag color={'geekblue'}>评分:</Tag>
                                    <BiliBiliScoreTag
                                        score={item.bilibili_score}
                                        user_count={item.bilibili_user_count}
                                        style={{fontSize:'0.7rem',padding:'0.1rem',width:'2.7rem',height:'1.2rem'}}
                                        logoStyle={{width:'.8rem'}}
                                    />
                                </div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>总话数:</Tag>{item.episode_count}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>放送日期:</Tag>{item.start_date}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>简介:</Tag><div dangerouslySetInnerHTML={item.description}/></div>
                            </List.Item>
                        )}
                    />
            }
        </div>
    );
}

export default AnimeShowList;