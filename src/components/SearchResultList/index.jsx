import React, {Component} from 'react';
import {List, Tag} from 'antd';
import TypeTag from "../TypeTag";
import Tags from '../Tags';

const listData = [];
listData.push({
    href:'https://ant.design',
    title:'工作细胞',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    tags:['搞笑','战斗','日常','声控'],
    overview:'这是一个关于你自身的故事。你体内的故事——。人的细胞数量，约为37兆2千亿个。细胞们在名为身体的世界中，今天也精神满满、无休无眠地在工作着。运送着氧气的红细胞，与细菌战斗的白细胞……！这里，有着细胞们不为人知的故事。',

})

class SearchResultList extends Component {
    render() {
        return (
            <div>
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
                    // footer={
                    //     // <div>
                    //     //     <b>ant design</b> footer part
                    //     // </div>
                    // }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            extra={
                                <div style={{width:'10rem',height:'15rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <img
                                        style={{height:'15rem'}}
                                        alt="logo"
                                        src="http://lain.bgm.tv/pic/cover/l/84/fc/235612_EHO4Q.jpg"
                                    />
                                </div>
                            }
                        >
                            <List.Item.Meta
                                title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                            <a href={item.href} style={{fontSize:'1.1rem'}}>
                                                <b>{item.title}</b>
                                            </a>&nbsp;&nbsp;
                                            <TypeTag/>
                                        </div>}
                                description={item.tags.map(item=>{return <Tag>{item}</Tag>})}
                            />
                            简介：{item.overview}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default SearchResultList;