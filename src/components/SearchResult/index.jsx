
import React, {useState} from 'react';
import {Divider, Tabs} from 'antd';
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
import {Link} from "react-router-dom";
import WordCloud from "../WordCloud";
import {useMount} from "ahooks";
import axios from "axios";

const {TabPane} = Tabs;

function FilterHeader(props) {

    const dak = sessionStorage.getItem('searchTabDefaultKey') || '1'

    return (
        <div style={{minHeight:'100vh'}}>
            <Tabs defaultActiveKey={dak} centered size={'large'}
                  onChange={(ak)=>{
                      sessionStorage.setItem('searchTabDefaultKey', ak)
                      sessionStorage.setItem('currentPage', "1")
                }}>
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
                    <SearchResultList searchString={props.searchString} searchType={'book'}/>
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
                    <SearchResultList searchString={props.searchString} searchType={'music'}/>
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
                    <SearchResultList searchString={props.searchString} searchType={'game'}/>
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
                    <SearchResultList searchString={props.searchString} searchType={'real_person'}/>
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
                    <SearchResultList searchString={props.searchString} searchType={'character'}/>
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
                    <SearchResultList searchString={props.searchString} searchType={'company'}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

function SearchResult(props) {
    const [words,setWords] = useState([])

    const callbacks = {
        onWordClick:(word)=>{
          props.history.push({pathname:`/detailInfo/${word.guid}`})
        },
    }

    useMount(async ()=>{
        let data = (await axios.post ('/api/hotWords')).data.data
        data = data.map((item)=>{
            return {
                text:item.name,
                value:item.heat,
                type:item.type,
                guid:item.guid
            }
        })
        setWords(data)
    })


    return (
        <div style={{backgroundColor: '#f3f3f3', minHeight:'100vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}} id={'searchContainer'}>
                <div style={{backgroundColor: '#fff', padding:'0 1rem 1rem 1rem'}} id={'infoContainer'}>
                    <FilterHeader searchString={props.searchString}/>
                </div>
                <div id={'relatedContainer'}>
                    <div  style={{backgroundColor: '#fff', padding:'1rem',borderRadius:'1rem'}}>
                        <Divider>搜索热榜</Divider>
                        <WordCloud words={words} callbacks={callbacks}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;