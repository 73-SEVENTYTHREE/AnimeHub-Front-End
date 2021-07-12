import React, {Component} from 'react';
import {List, Tag, Typography, Menu} from 'antd';
import TypeTag from "../TypeTag";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Tags from '../Tags';

const {Paragraph} = Typography

const {SubMenu} = Menu
const listData = [];
listData.push({
    href:'https://ant.design',
    title:'工作细胞',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    tags:['搞笑','战斗','日常','声控'],
    overview:'这是一个关于你自身的故事。你体内的故事——。人的细胞数量，约为37兆2千亿个。细胞们在名为身体的世界中，今天也精神满满、无休无眠地在工作着。运送着氧气的红细胞，与细菌战斗的白细胞……！这里，有着细胞们不为人知的故事。',
    start_date:'2019年7月',
    episode_count:12,
    score_general:9.6
})

class InsideFilter extends Component{
    render() {
        const current = 'mail'
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    {/*<Menu.Item key="mail" icon={<MailOutlined />}>*/}
                    {/*    Navigation One*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="app" disabled icon={<AppstoreOutlined />}>*/}
                    {/*    Navigation Two*/}
                    {/*</Menu.Item>*/}
                    {/*<SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">*/}
                    {/*    <Menu.ItemGroup title="Item 1">*/}
                    {/*        <Menu.Item key="setting:1">Option 1</Menu.Item>*/}
                    {/*        <Menu.Item key="setting:2">Option 2</Menu.Item>*/}
                    {/*    </Menu.ItemGroup>*/}
                    {/*    <Menu.ItemGroup title="Item 2">*/}
                    {/*        <Menu.Item key="setting:3">Option 3</Menu.Item>*/}
                    {/*        <Menu.Item key="setting:4">Option 4</Menu.Item>*/}
                    {/*    </Menu.ItemGroup>*/}
                    {/*</SubMenu>*/}
                    {/*<Menu.Item key="alipay">*/}
                    {/*    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">*/}
                    {/*        Navigation Four - Link*/}
                    {/*    </a>*/}
                    {/*</Menu.Item>*/}
                    <Menu.ItemGroup title={'排序方式：'}>
                        <Menu.Item key={'开播时间'}>开播时间</Menu.Item>
                        <Menu.Item key={'最高评分'}>最高评分</Menu.Item>
                        <Menu.Item key={'最多浏览'}>最多浏览</Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </div>
        )
    }
}

class SearchResultList extends Component {
    render() {
        return (
            <div>
                {/*<InsideFilter></InsideFilter>*/}
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
                            <Paragraph>评分：{item.score_general}</Paragraph>
                            <Paragraph>总话数：{item.episode_count}</Paragraph>
                            <Paragraph>放送日期：{item.start_date}</Paragraph>
                            <Paragraph>简介：{item.overview}</Paragraph>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default SearchResultList;