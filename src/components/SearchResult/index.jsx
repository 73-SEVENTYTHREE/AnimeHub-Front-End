
import React, {useState} from 'react';
import {Tabs} from 'antd';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';
import SearchResultList from "../SearchResultList";
import TypeTag from "../TypeTag";
import TV from "../../images/icons/tv.png";
import Game from "../../images/icons/game.png";
import Book from "../../images/icons/book.png";
import Character from "../../images/icons/character.png";
import Company from "../../images/icons/company.png";
import Person from "../../images/icons/person.png";
import Music from "../../images/icons/music.png";
import './index.css'

const {TabPane} = Tabs;

function FilterHeader(props) {
    return (
        <div>
            <Tabs defaultActiveKey="1" centered size={'large'}>
                <TabPane
                    tab={
                        <div>
                            <img src={TV} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;动画
                        </div>
                    }
                    key="1"
                >
                    <SearchResultList searchString={props.searchString} searchType={'anime'}/>
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Book} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;书籍
                        </div>
                    }
                    key="2"
                >
                    Tab 2
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Music} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;音乐
                        </div>
                    }
                    key="3"
                >
                    Tab 3
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Game} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;游戏
                        </div>
                    }
                    key="4"
                >
                    Tab 4
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Person} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;人物
                        </div>
                    }
                    key="5"
                >
                    Tab 5
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Character} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;虚拟人物
                        </div>
                    }
                    key="6"
                >
                    Tab 6
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Company} style={{display:'inline-block', width:'.8rem'}} alt={'动画'}/>
                            &nbsp;公司
                        </div>
                    }
                    key="7"
                >
                    Tab 7
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