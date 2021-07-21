import React,{useState} from 'react';
import HelpLogo from '../../images/help.png'
import {Modal} from 'antd'



function info() {
    Modal.info({
        title: '帮助',
        content: (
            <div>
                <p>直接键入关键词搜索</p>
                <p>示例：<strong>名侦探柯南</strong></p>
                <p>关键词求交搜索</p>
                <p>示例：<strong>柯南 AND 基德</strong></p>
                <p>作用：优先返回既有“柯南”又有“基德”的搜索结果</p>
                <p>关键词求并搜索</p>
                <p>示例：<strong>柯南 OR 基德</strong></p>
                <p>作用：返回有“柯南”或有“基德”的搜索结果</p>
                <p>关键词排除搜索</p>
                <p>示例：<strong>柯南 NOT 少年侦探团</strong></p>
                <p>作用：优先返回只有“柯南”但<strong>没有</strong>“少年侦探团”的搜索结果</p>
                <p>关键词模糊搜索</p>
                <p>示例：<strong>cland~</strong></p>
                <p>作用：忘记《CLANNAD》怎么拼？使用“cland~”进行模糊搜索吧！</p>
                <p>提示：还找不到？在“~”后面添加更大的数字进行更广的匹配。<strong>cland~5</strong></p>
                <p>提示：请使用小写字母</p>
            </div>
        ),
        onOk() {},
        width:600,
        centered:true,
    });
}

function Help(props) {

    return (
        <div style={{position:'absolute',left:'99%',transform:'translateX(-100%)',top:'0.3rem'}}>
            <img style={{width:'1.5rem'}} src={HelpLogo} alt="帮助" onClick={info}/>
        </div>
    );
}

export default Help;