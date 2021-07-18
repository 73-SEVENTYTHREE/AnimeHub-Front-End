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
    const [dataLength, setDataLength] =useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let token = null;
    //根据传入的字符串获取相关信息，和后端的交互主要在这个函数里。
    const getDataBySearchString = async (str,page,orderby,type,pageNum) => {
        setLoading(true);
        const start_index = pageNum*(page-1)
        let end_index = pageNum*page-1
        let searchData = {
            searchString:str,
            range:[start_index, end_index],
            orderby:orderby,
            type:type
        }
        let {data} = await axios.post('/api/search',searchData)
        if(data.code === 1){
            message.error('获取数据失败：'+data.msg)
            return;
        }
        data = data.data
        let data_length = data.data_length
        let ListData = data.items
        for(let i=0,length=ListData.length;i<length;i++){
            let item = ListData[i]
            item.zh_name = outLineKeyWords([str], item.zh_name);
            item.description = outLineKeyWords([str], item.description);
            item.primary_name = outLineKeyWords([str], item.primary_name);
            if(item.tags!==null){
                item.tags = item.tags.map(tag=>{
                    return outLineKeyWords([str],tag)
                })
            }
            // const bilibili_data  = await getBiliBiliDataByMediaName(item.zh_name);
            // const result = bilibili_data.result;
            // if(result === undefined){
            //     item.bilibili_score='暂无'
            //     item.bilibili_user_count='暂无'
            // }else{
            //     item.bilibili_score = result[0].media_score.score
            //     item.bilibili_user_count = result[0].media_score.user_count
            // }
        }
        setDataLength(data_length);
        setListData(ListData);
        setLoading(false);
        setCurrentPage(page);
    }

    const getData = async(page,orderby,type,pageNum)=>{
        await getDataBySearchString(searchString,page,orderby,type,pageNum)
    }

    // const getBilibiliData = async (start_index,end_index,ListData)=>{
    //     console.log(start_index,end_index, ListData)
    //     for(let i=start_index;i<=end_index;i++){
    //         let item = ListData[i]
    //         if(item!==undefined){
    //             const bilibili_data  = await getBiliBiliDataByMediaName(item.zh_name);
    //             const result = bilibili_data.result;
    //             if(result === undefined){
    //                 item.bilibili_score='暂无'
    //                 item.bilibili_user_count='暂无'
    //             }else{
    //                 item.bilibili_score = result[0].media_score.score
    //                 item.bilibili_user_count = result[0].media_score.user_count
    //             }
    //             listData[i]=item
    //         }
    //     }
    //     setListData(listData)
    // }

    useMount(async () => {
        //订阅上方导航栏输入的消息，获取对应字符串
        token = PubSub.subscribe('ChangeInput', async (msg, data) => {
            setSearchString(data);
            await getDataBySearchString (data,1,'score',props.searchType,10);
            // handleMark()
        });
        await getDataBySearchString(searchString,1,'score',props.searchType,10);
        // handleMark()
    })

    useUnmount(() => {
        if(token !== null) PubSub.unsubscribe(token);
    })

    switch(props.searchType){
    case 'anime': return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData} total={dataLength} getData={getData} currentPage={currentPage}/>);
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