/**
 * 词条类型标签。
 * 需要传入type参数，有一下五种取值：
 * 1. anime
 * 2. game
 * 3. book
 * 4. character
 * 5. company
 * 6. person
 * 7. music
 * Author: Wei Liu
 * Data: 2021/07/14
 */
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
        real_person:'人物',
        music:'音乐'
    }
    return (
        <Tag icon={<img src={iconSelector[type]} alt={type} style={{display:'inline-block', width:'.8rem'}}/>}
             style={{height:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
            &nbsp;{nameSelector[type]}
        </Tag>
    );
}
export default TypeTag;