import React, {useState} from 'react';
import {useUpdate} from 'ahooks';
import {Collapse, List, Tag} from "antd";
import {Link} from "react-router-dom";
import TypeTag from "../TypeTag";
import moment from 'moment';
import BiliBiliScoreTag from "../BiliBiliScoreTag";


const { CheckableTag } = Tag;
const { Panel } = Collapse
const tagsData = ['综合排序','最高评分', '最多浏览', '最近更新'];

class InsideFilter extends React.Component{
    state = {
        selectedTag: '综合排序',
    };

    handleChange(tag, checked) {
        const { selectedTag } = this.state;
        if(checked){
            this.setState({selectedTag: tag})
            console.log(moment('2019年7月'))
        }
    }

    render() {
        const { selectedTag } = this.state;
        return (
            <div style={{marginLeft:'1%'}}>
                <Collapse ghost>
                    <Panel header={'高级筛选'}>
                        {tagsData.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTag===tag}
                                onChange={checked => this.handleChange(tag, checked)}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

function AnimeShowList(props) {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div>
            <InsideFilter/>
            {
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: async page => {
                                // await props.getData();
                                console.log(page);
                                setCurrentPage(page)
                            },
                            pageSize: 3,
                            current:currentPage,
                            total:5,
                        }}
                        dataSource={props.listData}
                        renderItem={item => (
                            <List.Item
                                key={item.unique_id}
                                extra={
                                    <div style={{width:'10rem',height:'15rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Link to={{pathname:'/detailinfo',state:{name:item.id,type:'anime'}}}>
                                            <img
                                                style={{height:'15rem'}}
                                                alt="logo"
                                                src={item.image_url}
                                            />
                                        </Link>
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                        <Link to={{pathname:'/detailinfo',state:{name:item.id,type:'anime'}}}
                                              style={{fontSize:'1.1rem',color:'black'}}
                                              dangerouslySetInnerHTML={item.title}
                                        >
                                        </Link>&nbsp;&nbsp;
                                        <TypeTag type={item.type}/>
                                    </div>}
                                    description={item.tags.map(item=>{return <Tag><div dangerouslySetInnerHTML={item}/></Tag>})}
                                />
                                <div className={'item-info-tag'}>
                                    <Tag color={'geekblue'}>评分:</Tag>
                                    <BiliBiliScoreTag
                                        score={item.bilibili_score}
                                        user_count={item.bilibili_user_count}
                                        style={{fontSize:'0.7rem',padding:'0.1rem',width:'2.7rem',height:'1.2rem'}}
                                        logoStyle={{width:'.8rem'}}
                                    />
                                </div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>总话数:</Tag>{item.episode_count}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>放送日期:</Tag>{item.start_date}</div>
                                <div className={'item-info-tag'}><Tag color={'geekblue'}>简介:</Tag><div dangerouslySetInnerHTML={item.description}/></div>
                            </List.Item>
                        )}
                    />
            }
        </div>
    );
}

export default AnimeShowList;