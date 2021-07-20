import React, {useState} from 'react';
import {useUpdate} from 'ahooks';
import {Collapse, List, Pagination, Tag, Typography} from "antd";
import {Link} from "react-router-dom";
import TypeTag from "../TypeTag";
import BangumiScoreTag from "../BangumiScoreTag";
import './index.css';
import removeLastCharacter from "../../utils/removeLastCharacter";

const { CheckableTag } = Tag;
const { Panel } = Collapse
const { Paragraph } = Typography
const tagsData = ['相关度','评论数', '最近', '评分'];

function MusicShowList(props) {
    let filter = 'relate'
    const { total,currentPage,selectedTag } = props
    const onChange = async (page,pageNum) => {
        sessionStorage.setItem('currentPage',page)
        await props.getData(page,filter,'music',pageNum)
    }

    const handleChange = async (tag,checked)=>{
        if(checked){
            switch(tag){
                case '相关度': filter = 'relate';break;
                case '评论数': filter = 'comment';break;
                case '最近': filter = 'recent';break;
                case '评分': filter = 'score';break;
            }
            sessionStorage.setItem('selectedTag',filter)
            await onChange(1,10)
        }
    }

    return (
        <div>
            {
                <div style={{marginLeft:'1%'}}>
                    <Collapse ghost >
                        <Panel header={'结果排序'} key={1} >
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
                                    <Link to={{pathname:'/detailinfo',state:{guid:item.guid,type:'music',name:item.primary_name}}}>
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
                                    <Link to={{pathname:'/detailinfo',state:{guid:item.guid,type:'music',name:item.primary_name}}}
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
                            <div className={'item-info-tag'}><Tag color={'geekblue'}>原名</Tag>{<div dangerouslySetInnerHTML={item.primary_name}/> || '暂无'}</div>
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
                    <Pagination showQuickJumper showSizeChanger={false} total={total} onChange={onChange} current={currentPage} defaultPageSize={10}/>
                </div>
            }
        </div>
    );
}

export default MusicShowList;