import React from 'react';
import {Card, Col, Divider, Row, Tag, Timeline} from "antd";
import './index..css'
import {useMount} from "ahooks";
import { Tabs } from 'antd';
import {TwitterOutlined, UserOutlined, WeiboOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;

function RealPersonInfo (props) {
    const {data, mobile} = props;
    useMount(() => {
        const divider = document.getElementById('person-card-divider');
        divider.style.height = window.getComputedStyle(document.getElementById('person-card')).height;
    })
    return (
        <Card style={{margin:'1rem 2rem 2rem 2rem'}} hoverable id={'person-card'}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={mobile ? 24 : 6}>
                    <div id={'person-description'}>
                        <div className="relevant-image"
                             style={{backgroundImage:`url("http://lain.bgm.tv/pic/crt/l/ae/ff/4765_prsn_67Kc7.jpg?r=1490851915")`,
                                 borderRadius:'10px',
                                width:'80%',height:'2rem'}}/>
                        <div id={'personal-info'}>
                            简体中文名: 花泽香菜<br/>
                            <Divider className={'personal-info-divider'}/>
                            别名: 花澤香菜 、はなざわ かな 、Hanazawa Kana 、香菜、KANA、香菜ちゃん、香菜たん、もふもふ、花澤潤ちゃん、Hanakana、ハナザー、ざーさん<br/>
                            <Divider className={'personal-info-divider'}/>
                            性别: 女<br/>
                            <Divider className={'personal-info-divider'}/>
                            生日: 1989年2月25日<br/>
                            <Divider className={'personal-info-divider'}/>
                            血型: AB型<br/>
                            <Divider className={'personal-info-divider'}/>
                            身高: 156.7cm<br/>
                            <Divider className={'personal-info-divider'}/>
                            体重: 45kg<br/>
                            <Divider className={'personal-info-divider'}/>
                            引用来源: anidb.net<br/>
                            <Divider className={'personal-info-divider'}/>
                            性格: 有点怕生<br/>
                            <Divider className={'personal-info-divider'}/>
                            趣味: 泡澡<br/>
                            <Divider className={'personal-info-divider'}/>
                            特技: 物体模仿。其他还有魔术、管理。<br/>
                            <Divider className={'personal-info-divider'}/>
                            喜欢的男生: 西装革履，戴眼镜，装束得体，黑头发<br/>
                            <Divider className={'personal-info-divider'}/>
                            喜欢的女生: 像川澄绫子、户松遥、竹达彩奈、小仓唯、石原夏织<br/>
                            <Divider className={'personal-info-divider'}/>
                            学历: 文学部日本文学专业大学生<br/>
                            <Divider className={'personal-info-divider'}/>
                            星座: 双鱼<br/>
                            <Divider className={'personal-info-divider'}/>
                            出道时间: 2006<br/>
                            <Divider className={'personal-info-divider'}/>
                            <UserOutlined />&nbsp;<a href={'https://www.hanazawakana-music.net'}>https://www.hanazawakana-music.net</a><br/>
                            <Divider className={'personal-info-divider'}/>
                            <TwitterOutlined />&nbsp;<a href={'https://twitter.com/hanazawa_staff'}>https://twitter.com/hanazawa_staff</a><br/>
                            <Divider className={'personal-info-divider'}/>
                            <WeiboOutlined />&nbsp;<a href={'https://www.weibo.com/u/7036200791'}>https://www.weibo.com/u/7036200791</a><br/>
                            <Divider className={'personal-info-divider'}/>
                        </div>
                    </div>
                </Col>
                <Divider type={mobile ? "horizontal": "vertical"} style={mobile? {}:{height:'100%'}} id={'person-card-divider'}/>
                <Col className="gutter-row" span={mobile ? 24:17}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="详细信息" key="1" style={{paddingLeft:'1rem', maxHeight:'60rem', overflow:'auto'}}>
                            <Tag color="cyan" style={{marginBottom:'1rem', height:'2rem', width:'11rem', fontSize:'1.2rem', display:'flex', alignItems:'center'}}>职业: 声优 音乐人</Tag>
                            <Timeline>
                            <Timeline.Item>花泽香菜（1989年2月25日－），是一名日本女性艺人、声优、演员。大泽事务所所属，前Smile-Monkey所属。2007年开始是大学生，到2011年为止都是半工半读。<br/></Timeline.Item>
                            <Timeline.Item>从幼女到青少年的少女，被多次选拔为主角役。近来则出演过随和系，小大人系，娇蛮系，腹黑少女，纯情派等多种多样的角色。歌曲演唱好象还在修行中。很多配音的角色都是平刘海短发学生头，而且大都不是正常人类（主角正常人类的也少），且不知为何以眼镜娘居多。<br/></Timeline.Item>
                            <Timeline.Item>曾以童星的身份演出《やっぱりさんま大先生》和《ガッコの先生》。亦是由于是儿童演员出身，所以和一般传统声优不同是采用自然声而非假声配音，而且能配一些很平实不做作的角色，但亦能配出很动画化、很夸张的萌音。<br/></Timeline.Item>
                            <Timeline.Item>演员身份方面则在东京深夜播放的剧集怨屋本铺饰演青山美香。<br/></Timeline.Item>
                            <Timeline.Item>有一个弟弟，而且是弟控，曾经和田村由加利、樱井浩美谈话时谈到弟弟的时候就变得很兴奋<br/></Timeline.Item>
                            <Timeline.Item>曾有过偷饮母亲的酒而变成吻魔到处吻人的事件，因此现在不喝酒。<br/></Timeline.Item>
                            <Timeline.Item>头发是天然的卷发，在弄发型的时候要花很多时间<br/></Timeline.Item>
                            <Timeline.Item>经常在作品中和比她年长得多的一线声优大演对手戏，当中合作最多则是神谷浩史。<br/></Timeline.Item>
                            <Timeline.Item>由于多部作品都演姊妹，所以和户松遥感情很好，但有趣是不论是入行还是实际年纪花泽都比户松大，但动画中却是户松演姊姊。另外也和辻步美感情很好。<br/></Timeline.Item>
                            <Timeline.Item>自从在《我的妹妹哪有这么可爱！》中和竹达彩奈合作后二人感情突飞猛进，在网络电台中经常大放闪光弹，甚至在花泽香菜生日的当天被竹达逼问‘给我说清楚哪个才是正妻啊！！’<br/></Timeline.Item>
                            <Timeline.Item>2006年，被选为东京电视系的动画《ZEGAPAIN》中的主角角色之一 守凪了子。Fans称之为“和初期的能登麻美子说话没有感情起伏（良い棒読み）很像”，简称“良い棒”、“棒子”。<br/></Timeline.Item>
                            <Timeline.Item>在《ZEGAPAIN》演出当时仍不是声优，在共演的川澄绫子建议她成为全职声优后，移籍到川澄隶属的大泽事务所，正式踏上声优之路。到现在川澄绫子仍经常给她技术指导。<br/></Timeline.Item>
                            <Timeline.Item>2007年，更演出动画月面兔兵器米娜的角色羽蝉ナコル。<br/></Timeline.Item>
                            <Timeline.Item>2010年12月19日，获得《ノン子とのび太のアニメスクランブル》听众投票选出的“动画大赏2010”最优秀女声优奖。<br/></Timeline.Item>
                            <Timeline.Item>2011年与日笠阳子、井口裕香、日高里菜、小仓唯一起组成了声优团体“ro-kyu-bu"，共同出演了动画《萝球社》并演唱了动画的OP以及ED。2011年8月28日，ro-kyu-bu参加了在埼玉举办的ASL2011的演出。<br/></Timeline.Item>
                            <Timeline.Item>2012年2月宣布以个人歌手名义出道，唱片公司为Aniplex，4月25日推出首张单曲《星空☆ディスティネーション》。<br/></Timeline.Item>
                            <Timeline.Item>2012年3月11日，到香港参加“C3日本动玩博览2012 DAY3”。<br/></Timeline.Item>
                            <Timeline.Item>2013年2月20日推出首张专辑《claire》。<br/></Timeline.Item>
                            <Timeline.Item>2013年4月17日，获得“Fami通大赏 2012”角色声优奖。<br/></Timeline.Item>
                            <Timeline.Item>2013年9月27日，十月新番《来自风平浪静的明天》举办了声优们到场的先行上映会。在会场举办的声优谈话节目中，饰演主人公先岛光的花江夏树提到“自己最近瘦了下来，体重减到45kg”的时候，香菜不由地回应道“和我一样啊”，随后又反应过来，自己把女孩子不该透漏的秘密说了出去，因而后悔不已。这个消息迅速在日本的各类动漫论坛传播开来。由此，花泽香菜的目前体重资料得到了公开——45kg。<br/></Timeline.Item>
                            <Timeline.Item>2015年，在第9回声优奖中获得助演女优奖。<br/></Timeline.Item>
                            <Timeline.Item>2015年5月3日，在日本武道馆举办个人演唱会，成为第八位在武道馆举办个人演唱会的声优。<br/></Timeline.Item>
                            <Timeline.Item>2017年，据《周刊文春》称与小野贤章热恋并已经同居，事务所承认恋情属实。<br/></Timeline.Item>
                            <Timeline.Item>2020年7月8日，宣布已与小野贤章结婚。<br/></Timeline.Item>
                            </Timeline>
                        </TabPane>
                        <TabPane tab="出演作品" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="吐槽评论" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </Card>
    );
}

export default RealPersonInfo;