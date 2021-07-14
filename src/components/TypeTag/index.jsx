import React from 'react';
import TV from "../../images/icons/tv.png";
import Game from "../../images/icons/game.png";
import Book from "../../images/icons/book.png";
import Character from "../../images/icons/character.png";
import Company from "../../images/icons/company.png";
import Person from "../../images/icons/person.png";
import Music from "../../images/icons/music.png";
import {Tag} from "antd";

function TypeTag (props) {
    const type = props.type;
    let iconSelector = {
        anime:TV,
        game:Game,
        book:Book,
        character:Character,
        company:Company,
        real_person:Person,
        music:Music
    }
    let nameSelector = {
        anime:'番剧',
        game:'游戏',
        book:'漫画 / 小说',
        character:'虚拟人物',
        company:'公司',
        real_person:'',
        music:Music
    }
    return (
        <Tag icon={<img src={iconSelector[type]} alt={type} style={{display:'inline-block', width:'.6rem'}}/>}
             style={{height:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
            &nbsp;番剧
        </Tag>
    );
}
export default TypeTag;