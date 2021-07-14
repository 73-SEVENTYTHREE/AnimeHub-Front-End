import React, {Component} from 'react';
import {List, Tag, Typography, Menu, Space} from 'antd';
import TypeTag from "../TypeTag";
import './index.css';
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import {Link} from "react-router-dom";

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

class SearchResultList extends Component {
    state = {
        searchString:'',
        listData:[]
    }

    async componentDidMount() {
        let {listData,searchString} = this.state
        // if(sessionStorage.getItem('searchString')!==undefined){
        //     searchString = sessionStorage.getItem('searchString')
        // }
        searchString = this.props.searchString
        console.log(searchString)
        listData.push({
            href:'https://ant.design',
            title:searchString,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            tags:['搞笑','战斗','日常','声控'],
            overview:'这是一个关于你自身的故事。你体内的故事——。人的细胞数量，约为37兆2千亿个。细胞们在名为身体的世界中，今天也精神满满、无休无眠地在工作着。运送着氧气的红细胞，与细菌战斗的白细胞……！这里，有着细胞们不为人知的故事。',
            start_date:'2019年7月',
            episode_count:12,
            score_general:9.6
        })
        for(let i=0,length=listData.length;i<length;i++){
            let item = listData[i]
            const result = await getBiliBiliDataByMediaName(item.title).result
            console.log(result)
            if(result===undefined){
                item.bilibili_score='暂无'
                item.bilibili_user_count='暂无'
            }else{
                item.bilibili_score = result[0].media_score.score
                item.bilibili_user_count = result[0].media_score.user_count
            }
        }
        this.setState({listData: [...listData],searchString: searchString})
    }

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
                    dataSource={this.state.listData}
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
                                    style={{fontSize:'0.4rem',padding:'0.1rem',width:'2.7rem',height:'1.2rem'}}
                                    logoStyle={{width:'.8rem'}}
                                />
                            </div>
                            <div className={'item-info-tag'}><Tag color={'geekblue'}>总话数:</Tag>{item.episode_count}</div>
                            <div className={'item-info-tag'}><Tag color={'geekblue'}>放送日期:</Tag>{item.start_date}</div>
                            <div className={'item-info-tag'}><Tag color={'geekblue'}>简介:</Tag>{item.overview}</div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default SearchResultList;