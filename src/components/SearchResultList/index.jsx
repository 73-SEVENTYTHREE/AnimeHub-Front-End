import React, {Component, useState} from 'react';
import {List, Tag, Typography, Menu, Space, Button, message, Skeleton} from 'antd';
import TypeTag from "../TypeTag";
import './index.css';
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import {Link} from "react-router-dom";
import {useMount, useUnmount, useUpdate} from "ahooks";
import PubSub from 'pubsub-js';
import outLineKeyWords from "../../utils/outLineKeyWords";
import AnimeShowList from "../AnimeShowList";
import BookShowList from "../BookShowList";
import axios from "axios";

function SearchResultList  (props) {
    const [searchString, setSearchString] = useState(props.searchString);
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const observer = new IntersectionObserver((entries,observer)=>{
    //     entries.forEach(entry=>{
    //         if(entry.isIntersecting){
    //             entry.target.classList.add('animate')
    //             observer.unobserve(entry.target)
    //         }
    //     })
    // })
    let token = null;
    //根据传入的字符串获取相关信息，和后端的交互主要在这个函数里。
    const getDataBySearchString = async (str,page,orderby,type) => {
        setLoading(true);
        const pageNum = 10
        let searchData = {
            searchString:str,
            range:[pageNum*(page-1),pageNum*page],
            orderby:orderby,
            type:type
        }
        const data = await axios.post('/api/search',searchData).data
        console.log(data)
        // let ListData = [];
        // for(let i=1;i<=4;i++){
        //     ListData.push({
        //         id:'工作细胞',
        //         unique_id:i,
        //         title: '工作细胞',
        //         tags:['搞笑','战斗','日常','声控'],
        //         description:'这是一个关于你自身的故事。你体内的故事——。人的细胞数量，约为37兆2千亿个。细胞们在名为身体的世界中，今天也精神满满、无休无眠地在工作着。运送着氧气的红细胞，与细菌战斗的白细胞……！这里，有着细胞们不为人知的故事。',
        //         start_date:'2019年7月',
        //         episode_count:12,
        //         score_general:9.6,
        //         image_url:"http://lain.bgm.tv/pic/cover/l/84/fc/235612_EHO4Q.jpg",
        //         type:'anime'
        //     })
        // }
        // for(let i=0,length=listData.length;i<length;i++){
        //     let item = ListData[i]
        //     const data  = await getBiliBiliDataByMediaName(item.title);
        //     const result = data.result;
        //     if(result === undefined){
        //         item.bilibili_score='暂无'
        //         item.bilibili_user_count='暂无'
        //     }else{
        //         item.bilibili_score = result[0].media_score.score
        //         item.bilibili_user_count = result[0].media_score.user_count
        //     }
        //     item.title = outLineKeyWords([str], item.title);
        //     item.description = outLineKeyWords([str], item.description);
        //     item.tags = item.tags.map(tag=>{
        //         return outLineKeyWords([str],tag)
        //     })
        // }
        // setListData(ListData);
        setLoading(false);
    }

    // const handleMark = ()=>{
    //     document.querySelectorAll('mark').forEach(mark=>{
    //         observer.observe(mark)
    //         console.log('mark')
    //     })
    // }

    useMount(async () => {
        //订阅上方导航栏输入的消息，获取对应字符串
        token = PubSub.subscribe('ChangeInput', async (msg, data) => {
            setSearchString(data);
            await getDataBySearchString (data);
            // handleMark()
        });
        await getDataBySearchString(searchString);
        // handleMark()
    })

    useUnmount(() => {
        if(token !== null) PubSub.unsubscribe(token);
    })

    switch(props.searchType){
        case 'anime': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
        case 'book': return (loading ? <Skeleton active/> : <BookShowList searchString={searchString} listData={listData}/>);
        case 'music': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
        case 'game': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
        case 'character': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
        case 'real_person': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
        case 'company': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
        default : return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData}/>);
    }
}

export default SearchResultList;