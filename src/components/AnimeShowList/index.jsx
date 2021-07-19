import React, {useState} from 'react';
import {useUpdate} from 'ahooks';
import {Collapse, List, Pagination, Tag, Typography} from "antd";
import {Link} from "react-router-dom";
import TypeTag from "../TypeTag";
import moment from 'moment';
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import BangumiScoreTag from "../BangumiScoreTag";
import './index.css';
import removeLastCharacter from "../../utils/removeLastCharacter";

const { CheckableTag } = Tag;
const { Panel } = Collapse
const { Paragraph } = Typography
const tagsData = ['相关度','评论数', '浏览量', '评分'];

class InsideFilter extends React.Component{
    state = {
        selectedTag: '相关度',
    };



}

function AnimeShowList(props) {
    let filter = 'relate'
    const { total,currentPage,selectedTag } = props
    console.log(props.listData)
    const onChange = async (page,pageNum) => {
        await props.getData(page,filter,'anime',pageNum)
    }

    const handleChange = async (tag,checked)=>{
        if(checked){
            switch(tag){
                case '相关度': filter = 'relate';break;
                case '评论数': filter = 'comment';break;
                case '浏览量': filter = 'recent';break;
                case '评分': filter = 'score';break;
            }
            await onChange(1,10)
        }
    }

    return (
        <div>
            {
                <div style={{marginLeft:'1%'}}>
                    <Collapse ghost >
                        <Panel header={'高级筛选'} key={1} >
                            {tagsData.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTag===tag}
                                    onChange={checked => handleChange(tag, checked)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                    </Collapse>
                </div>
            }
            {
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={props.listData}
                        renderItem={item => (
                            <List.Item
                                key={item.guid}
                                extra={
                                    <div style={{width:'10rem',height:'15rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Link to={{pathname:'/detailinfo',state:{guid:item.guid,type:'anime',name:item.primary_name}}}>
                                            <img
                                                style={{width:'10rem'}}
                                                alt="logo"
                                                src={removeLastCharacter(item.image_urls)}
                                            />
                                        </Link>
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                        <Link to={{pathname:'/detailinfo',state:{guid:item.guid,type:'anime',name:item.primary_name}}}
                                              style={{fontSize:'1.1rem',color:'black'}}
                                              dangerouslySetInnerHTML={item.zh_name}
                                        >
                                        </Link>&nbsp;&nbsp;
                                        <TypeTag type={item.type}/>
                                    </div>}
                                    description={
                                        item.tags===null?'':item.tags.map((item,index)=>{
                                        if(index<14){
                                            return <Tag><div dangerouslySetInnerHTML={item}/></Tag>
                                        }
                                    })}
                                />
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>原名</Tag>{item.primary_name || '暂无'}</div>
                                <div className={'item-info-tag'}>
                                    <Tag color={'geekblue'}>评分</Tag>
                                    <BiliBiliScoreTag
                                        score={item.bilibili_score}
                                        user_count={item.bilibili_user_count}
                                        style={{fontSize:'0.7rem',padding:'0.1rem',width:'2.7rem',height:'1.2rem'}}
                                        logoStyle={{width:'.8rem'}}
                                    />
                                    <BangumiScoreTag
                                        score={item.score}
                                        user_count={item.vote_count}
                                        style={{fontSize:'0.7rem',padding:'0.1rem',width:'2.7rem',height:'1.2rem'}}
                                        logoStyle={{width:'.8rem'}}
                                    />
                                </div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>放送日期</Tag>{item.start_date || '暂无'}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>导演</Tag>{item.director || '暂无'}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>简介</Tag>
                                    <div id={'description-wrapper'} dangerouslySetInnerHTML={item.description}>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
            }
            {
                <div style={{float:'right'}}>
                    <Pagination showQuickJumper total={total} onChange={onChange} current={currentPage} pagesize={10}/>
                </div>
            }
        </div>
    );
}

export default AnimeShowList;