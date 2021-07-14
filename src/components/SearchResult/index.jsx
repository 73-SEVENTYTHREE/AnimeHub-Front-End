import React from 'react';
import {Tabs} from 'antd';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';
import SearchResultList from "../SearchResultList";

const {TabPane} = Tabs;

function FilterHeader(props) {
    console.log(props.searchString)
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
    console.log(props.searchString)
    return (
        <div style={{backgroundColor: '#f3f3f3'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', padding: '1.5rem',}}>
                <div style={{width: '70%', backgroundColor: '#fff', borderRadius: '1rem'}}>
                    {/*<Divider orientation={'left'}><b>搜索结果</b></Divider>*/}
                    <FilterHeader searchString={props.searchString}/>
                </div>
                <div style={{width: '20%'}}>
                    <div style={{backgroundColor: '#fff', height: '100px', borderRadius:'1rem'}}>相关人物</div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;