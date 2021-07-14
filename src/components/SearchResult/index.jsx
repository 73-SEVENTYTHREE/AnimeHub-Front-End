import React, {useState} from 'react';
import {Tabs} from 'antd';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';
import SearchResultList from "../SearchResultList";
import './index.css'

const {TabPane} = Tabs;

function FilterHeader(props) {
    return (
        <div>
            <Tabs defaultActiveKey="1" centered size={'large'}>
                <TabPane
                    tab={
                        <span>
                          <AppleOutlined/>
                          综合
                        </span>
                    }
                    key="1"
                >
                    <SearchResultList searchString={props.searchString}/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                          <AndroidOutlined/>
                          动画
                        </span>
                    }
                    key="2"
                >
                    Tab 2
                </TabPane>
                <TabPane
                    tab={
                        <span>
                          <AndroidOutlined/>
                          漫画
                        </span>
                    }
                    key="3"
                >
                    Tab 3
                </TabPane>
                <TabPane
                    tab={
                        <span>
                          <AndroidOutlined/>
                          游戏
                        </span>
                    }
                    key="4"
                >
                    Tab 4
                </TabPane>
                <TabPane
                    tab={
                        <span>
                          <AndroidOutlined/>
                          资讯专栏
                        </span>
                    }
                    key="5"
                >
                    Tab 5
                </TabPane>
            </Tabs>
        </div>
    )
}

function SearchResult(props) {
    return (
        <div style={{backgroundColor: '#f3f3f3', minHeight:'100vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}} id={'searchContainer'}>
                <div style={{backgroundColor: '#fff', padding:'0 1rem 1rem 1rem'}} id={'infoContainer'}>
                    {/*<Divider orientation={'left'}><b>搜索结果</b></Divider>*/}
                    <FilterHeader searchString={props.searchString}/>
                </div>
                <div id={'relatedContainer'} style={{backgroundColor: '#fff', height: '100px', padding:'1rem'}}>
                    相关人物
                </div>
            </div>
        </div>
    );
}

export default SearchResult;